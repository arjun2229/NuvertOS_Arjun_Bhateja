const db = require("../models");
const Compound = db.compound;

async function addCompound(compound){
    try{
        return await Compound.create(compound);
    } catch(err){
        throw err;
    }
}

async function getAllCompounds(condition){
    try{
        return await Compound.findAndCountAll(condition);
    } catch(err){
        throw err;
    }
}

async function getCompoundById(id){
    try{
        return await Compound.findByPk(id);
    } catch(err){
        throw err;
    }
}

async function updateCompound(updatedCompound, condition){
    try{
        return await Compound.update(updatedCompound, condition);
    } catch(err){
        throw err;
    }
}

async function deleteCompound(condition){
    try{
        return await Compound.destroy(condition);
    } catch(err){
        throw err;
    }
}

async function bulkInsertCompounds(compounds){
    try{
        return await Compound.bulkCreate(compounds, { updateOnDuplicate: ["id", "CompoundName", "CompounrDescription"] });
    } catch(err){
        throw err;
    }
}

module.exports = {addCompound, getAllCompounds, getCompoundById, updateCompound, deleteCompound, bulkInsertCompounds};