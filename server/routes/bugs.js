const express = require('express');
const bugsController = require('../controllers/bugs');

const router = express.Router();

//GET METHODS
//getting the status for all bugs existent
router.get('/getAllStatus', 
bugsController.getAllStatus,
(req, response) => response.status(200).json(res.locals.data));



//getting all the bugs
router.get('/getAllBugs',
bugsController.getAllBugs,
(req, res) => res.status(200).json(res.locals.data));

//getting the total number of bugs
router.get('/getAllBugsCount', bugsController.getAllBugsCount,
(req,res) => res.status(200).json(res.locals.data));

//getting details for a certain bug
router.get('/:bugId', bugsController.get,
(req,res)=> res.status(200).json(res.locals.data));

//getting all the bugs
router.get('/', bugsController.getAllBugs,
(req, res) => res.status(200).json(res.locals.data));

//POST METHODS
//creating a new bug
router.post('/create', bugsController.create,
(req,res) => res.status(200).json(res.locals.data))

//Update details for a bug 1
router.post('/update', bugsController.update,
(req,res) => res.status(200).json(res.locals.data))

//Update details for a bug 2
router.post('/:bugId/update', bugsController.update,
(req,res) => res.status(200).json(res.locals.data))

//DELETE METHODS
//Delete a bug 1
router.delete('/delete', bugsController.delete,
(req,res) => res.status(200).json(res.locals.data))

//Delete a bug 2
router.delete('/:bugId/delete', bugsController.deleteBug,
(req,res) => res.status(200).json(res.locals.data))

// STATUS = RESOLVED
router.post('/resolve', bugsController.resolve,
(req, res) => (req,res) => res.status(200).json(res.locals.data))

router.post('/:bugId/resolve', bugsController.resolveBug,
(req,res) => res.status(200).json(res.locals.data));

module.exports = router;