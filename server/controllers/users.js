const db = require('../models/bugs');

const userController = {};

//selectare buguri asignate unui user
usersController.getAssignedBugs = (req, res, next) => {
    const {userId} = req.params;
    const {limit, offset} = req.query;
  
    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
    const sql = `
      SELECT *
      FROM bugs
      WHERE bugs.assigned_to = ${userId}
      ORDER BY bugs.id
      ${limitClause}
      ${offsetClause}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
};

//numar buguri asignate unui user
usersController.getAssignedBugsCount = (req, res, next) => {
    const {userId} = req.params;
  
    const sql = `
      SELECT COUNT(*)
      FROM bugs
      WHERE bugs.assigned_to = ${userId}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
};

//toate bugurile ale unui user
usersController.getAuthoredBugs = (req, res, next) => {
    const {userId} = req.params;
    const {limit, offset} = req.query;
  
    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
    const sql = `
      SELECT *
      FROM bugs
      WHERE bugs.author = ${userId}
      ORDER BY bugs.id
      ${limitClause}
      ${offsetClause}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
};

// numarul de buguri create de un user
usersController.getAuthoredBugsCount = (req, res, next) => {
    const {userId} = req.params;
  
    const sql = `
      SELECT COUNT(*)
      FROM bugs
      WHERE bugs.author = ${userId}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // selectare proiecte din care un membru face parte
  usersController.getMemberProjects = (req, res, next) => {
    const {userId} = req.params;
    const {limit, offset} = req.query;
  
    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
    const sql = `
      SELECT projects.id, projects.name, projects.owner
      FROM projects
      INNER JOIN memberlist
      ON memberlist.project_id = projects.id
      WHERE memberlist.user_id = ${userId}
      ORDER BY projects.id
      ${limitClause}
      ${offsetClause}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // numarul de proiecte din care un user face parte
  usersController.getMemberProjectsCount = (req, res, next) => {
    const {userId} = req.params;
    
    const sql = `
      SELECT COUNT(*)
      FROM projects
      INNER JOIN memberlist
      ON memberlist.project_id = projects.id
      WHERE memberlist.user_id = ${userId}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // selectare proiectele la care un user este owner
  usersController.getOwnedProjects = (req, res, next) => {
    const {userId} = req.params;
    const {limit, offset} = req.query;
  
    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
    const sql = `
      SELECT projects.id, projects.name, projects.owner
      FROM projects
      WHERE projects.owner = ${userId}
      ORDER BY projects.id
      ${limitClause}
      ${offsetClause}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // selectare nr proiecte la care un user este owner
  usersController.getOwnedProjectsCount = (req, res, next) => {
    const {userId} = req.params;
    
    const sql = `
      SELECT COUNT(*)
      FROM projects
      WHERE projects.owner = ${userId}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // numar total useri
  usersController.getAllUsersCount = (req, res, next) => { 
    const sql = `
      SELECT COUNT(*)
      FROM users`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // numar buguri pe care un user le-a creat sau i-au fost asignate
  usersController.getBugsCount = (req, res, next) => {
    const {userId} = req.params;
  
    const sql = `
      SELECT COUNT(*)
      FROM bugs
      WHERE bugs.assigned_to = ${userId}
        or bugs.author = ${userId}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // selectare buguri pentru care un user a fost asignat sau le-a creat
  usersController.getBugs = (req, res, next) => {
    const {userId} = req.params;
    const {limit, offset} = req.query;
  
    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
    const sql = `
      SELECT *
      FROM bugs
      WHERE bugs.assigned_to = ${userId} or bugs.author = ${userId}
      ORDER BY bugs.id
      ${limitClause}
      ${offsetClause}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // detalii user
  usersController.get = (req, res, next) => {
    const {userId} = req.params;
    
    const sql = `
      SELECT id, username
      FROM users
      WHERE id = ${userId}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  // selectare useri
  usersController.getAllUsers = (req, res, next) => {
    const {limit, offset} = req.query;
  
    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
    
    const sql = `
      SELECT id, username
      FROM users
      ORDER BY id
      ${limitClause}
      ${offsetClause}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
  };
  
  module.exports = usersController;
  