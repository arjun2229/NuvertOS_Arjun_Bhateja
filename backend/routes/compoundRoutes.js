const controller = require("../controllers/compoundController");
const express = require("express");
const fileHandler = require("../middleware/csvUpload");
const router = express.Router();

router
// Add a new Compound
.post("/", controller.addCompound)

// Get all compounds with pagination
.get("/", controller.getAllCompounds)

// Retrieve a single Compound with id
.get("/:id", controller.getCompoundById)

// Update a Compound with id
.patch("/:id", controller.updateCompound)

// Delete a Compound with id
.delete("/:id", controller.deleteCompound)

// Bulk creation of Compounds
.post("/upload",fileHandler.single('file'), controller.addBulkCompounds)

.post("/bulk-create",controller.bulkCreate)

module.exports = router;