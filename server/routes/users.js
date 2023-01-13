const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// buguri asignate user
router.get('/getAssignedBugs/:userId', usersController.getAssignedBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// nr buguri pe care le are asignate un user
router.get('/getAssignedBugsCount/:userId', usersController.getAssignedBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// proiecte din care un user face parte
router.get('/getProjects/:userId', usersController.getMemberProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// nr proiecte din care un user face parte
router.get('/getProjectsCount/:userId', usersController.getMemberProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// useri
router.get('/getAllUsers', usersController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.data);
});

// nr totali useri
router.get('/getAllUsersCount', usersController.getAllUsersCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// nr total useri
router.get('/count', usersController.getAllUsersCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// nr buguri asignate user
router.get('/:userId/bugs/assigned_to/count', usersController.getAssignedBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// buguri asignate unui user
router.get('/:userId/bugs/assigned_to', usersController.getAssignedBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// nr buguri create de user
router.get('/:userId/bugs/author/count', usersController.getAuthoredBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// buguri create de user
router.get('/:userId/bugs/author', usersController.getAuthoredBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// nr total buguri user
router.get('/:userId/bugs/count', usersController.getBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// bugurile unui user
router.get('/:userId/bugs', usersController.getBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// numar proiecte din care face parte un user ca membru
router.get('/:userId/projects/member/count', usersController.getMemberProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// proiecte din care face parte un user ca membru
router.get('/:userId/projects/member', usersController.getMemberProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// numar proiecte la care un user este owner
router.get('/:userId/projects/owner/count', usersController.getOwnedProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// proiecte la care un user este owner
router.get('/:userId/projects/owner', usersController.getOwnedProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// numar proiecte din care face parte un user
router.get('/:userId/projects/count', usersController.getMemberProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// proiecte din care face parte un user
router.get('/:userId/projects', usersController.getMemberProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// detalii user
router.get('/:userId', usersController.get, (req, res) => {
  res.status(200).json(res.locals.data);
});

// selectare toti useri
router.get('/', usersController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;
