const express = require('express');
const projectsController = require('../controllers/projects');

const router = express.Router();

//selecteaza toti membrii proiect
router.get('/getMembers/:projectId', projectsController.getMembers, (req, res) => {
    res.status(200).json(res.locals.data);
})

//adaugare membru
router.post('/addMember', projectsController.addMember, (req, res) => {
    res.status(200).json(res.locals.data);
});

//update membri
router.post('/updateMembers', projectsController.updateMembers, (req, res) => {
    res.status(200).json(res.locals.data);
});

//stergere membru
router.delete('/removeMember', projectsController.removeMember, (req, res) => {
    res.status(200).json(res.locals.data);
});

//Aflare nr total buguri proiect
router.get('/getBugsCount/:projectId', projectsController.getBugsCount, (req, res) => {
    res.status(200).json(res.locals.data);
})

//Selectare toate bugurile dintr-un proiect
router.get('/getBugs/:projectId', projectsController.getBugs, (req, res) => {
    res.status(200).json(res.locals.data);
})

//nr total proiecte
router.get('/getAllProjectsCount', projectsController.getAllProjectsCount, (req, res) => {
    res.status(200).json(res.locals.data);
})

//selectare proiecte
router.get('/getAllProjects', projectsController.getAllProjects, (req, res) => {
    res.status(200).json(res.locals.data);
})

//selectare nr total proiecte pe calea /count
router.get('/count', projectsController.getAllProjectsCount, (req, res) => {
    res.status(200).json(res.locals.data);
});

//nr buguri proiect
router.get('/:projectId/bugs/count', projectsController.getBugsCount, (req, res) => {
    res.status(200).json(res.locals.data);
});

//selectare buguri proiect
router.get('/:projectId/bugs', projectsController.getBugs, (req, res) => {
    res.status(200).json(res.locals.data);
});

//selectare membrii proiect
router.get('/:projectId/members', projectsController.getMembers, (req, res) => {
    res.status(200).json(res.locals.data);
});

//selectare detalii proiect
router.get('/:projectId', projectsController.get, (req, res) => {
    res.status(200).json(res.locals.data);
});

//selectare toate proiectele
router.get('/', projectsController.getAllProjects, (req, res) => {
    res.status(200).json(res.locals.data);
});

//creare proiect nou
router.post('/create', projectsController.create, (req, res) => {
    res.status(200).json(res.locals.data);
});

//update detalii proiect
router.post('/update', projectsController.update, (req, res) => {
    res.status(200).json(res.locals.data);
});

//stergere proiect
router.delete('/delete', projectsController.delete, (req, res) => {
    res.status(200).json(res.locals.data);
});

router.delete('/:projectId', projectsController.deleteProject, (req, res) => {
    res.status(200).json(res.locals.data);
});

module.exports = router;