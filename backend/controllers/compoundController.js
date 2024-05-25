const service = require("../services/compoundService");
const fs = require("fs");
const csv = require("fast-csv");

//add a compound 
async function addCompound(req,res){
    try {
        const compound = {...req.body};
        console.log(compound)

        if(!compound.id){
            throw new Error('Compound Id is required!');
        }
        if(!compound.compoundName){
            throw new Error('Compound Name is required!');
        }
        if(!compound.dateModified){
            compound.dateModified = new Date();
        }

        const result = await service.addCompound(compound);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message:error.message || "Error occured while adding compound!"});
    }
}

//retrive all compounds with pagination
async function getAllCompounds(req,res){
    try {
        const page = req.query.page ? +req.query.page : 1;
        const size = req.query.size ? +req.query.size : 10;

        const condition = {
            limit: size,
            offset: (page-1)*size
        }
        const result = await service.getAllCompounds(condition);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message:error.message || "Error occured while fetching all compounds!."});
    }
}

// get compound details for specific id
async function getCompoundById(req,res){
    try {
        const id = req.params.id;
        if(!id){
            throw new Error("Id is required!");
        }

        const result = await service.getCompoundById(id);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({message: `Compound not found with id=${id}.`});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: error.message || "Error occured while fetching a compound!"});
    }
}

// update compound details for specific id
async function updateCompound(req,res){
    try {
        const id = req.params.id;
        if(!id){
            throw new Error("Id is required!");
        }

        const updatedCompound = {...req.body};
        updatedCompound.dateModified = new Date();
        const condition = {
            where: {id}
        }
        const result = await service.updateCompound(updatedCompound, condition);
        if (result[0]>0) {
            res.send({message: "Compound was updated successfully!"});
        } else {
            res.status(404).send({message: `No compound found!`});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: error.message || "Error while updating compound!"});
    }
}

// delete compound with specific id 
async function deleteCompound(req,res) {
    try {
        const id = req.params.id;
        if(!id){
            throw new Error("Id is required!");
        }

        const condition = {
            where: {id}
        }
        const result = await service.deleteCompound(condition);
        if (result>0) {
            res.send({message: "Compound deleted successfully!"});
        } else {
            res.status(404).send({message: "No compound found!"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: error.message || "Error while deleting compound"});
    }
}

async function addBulkCompounds(req,res){
    try {
        console.log(req.file);
        if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }
        
        let compounds = [];
        let path = `data/${req.file.filename}`;
        fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {throw error})
        .on("data", (row) => {compounds.push(row);})
        .on("end", async () => {
            await service.bulkInsertCompounds(compounds);
            res.status(200).send({message:`Data inserted from file=${req.file.originalname} succesfully!`});
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({message: error.message || `Error while inserting data from ${req.file.originalName}` });
    }
}

async function bulkCreate(req, res){
    try{
        let compounds = [...req.body];
        if(compounds.length>0){
            await service.bulkInsertCompounds(compounds);
            res.send({message:'Data created successfully'});

        } else{
            res.send({message:'No data to be inserted'});
        }
    } catch(err){
        console.error(err);
        res.status(500).send({message: error.message || `Error while inserting bulk records`})
    }
}

module.exports={addCompound, getAllCompounds, getCompoundById, updateCompound, deleteCompound, addBulkCompounds, bulkCreate};