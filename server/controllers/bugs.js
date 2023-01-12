const bugs = require('../models/bugs.js');
const db = require('../models/bugs.js');

const bugsController = {};

//Selectam toate statusurile din BD
bugsController.getAllStatus = (req, res, next) => {
    const sqlQuery = 'select * from status';

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err => next(err, req, res))
};

//Selectam toate bugurile
bugsController.getAllBugs = (req, res, next) => {
    const {limit, offset} = req.query;

    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

    const sqlQuery = `select * from bugs ${limitClause} ${offsetClause}`;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err => next(err, req, res))
};

//Selectam nr total de buguri
bugsController.getAllBugsCount = (req, res, next) => {
    const sqlQuery = `select count(*) from bugs`;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err => next(err, req, res));
}

//Selectam detalii bug
bugsController.get = (req, res, next) => {
    const {bugId} = req.params;

    const sqlQuery = `select * from bugs where id = ${bugId}`;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err => next(err, req, res));
}

//Creare bug nou
bugsController.create = (req, res, next) => {
    const {userId, desc, assignedTo, projectId, status} = req.body;

    const sqlQuery = (assignedTo === undefined)
    ? `insert into bugs (author, description, project_id, status)
    values (${userId}, '${desc}', ${projectId}, ${status})
    returning id, project_id, author, assigned_to, description, status`
    : `insert into bugs (author, description, assigned_to, project_id, status)
    values (${userId}, '${desc}', ${assignedTo}, ${projectId}, ${status})`;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err => next(err, req, res));
}

//Update bug 1
bugsController.update = (req, res, next) => {
    const {bugId, desc, assignedTo, projectId, status} = req.body;

    const sqlQuery = (assignedTo === undefined)
    ? `update bugs set description = '${desc}', project_id = ${projectId}, status = ${status}
    where id = ${bugId}
    returning id, project_id, author, assigned_to, description, status`
    : `update bugs set assigned_to = ${assignedTo}, description = '${desc}', project_id = ${projectId}, status = ${status}
    where id = ${bugId}
    returning id, project_id, author, assigned_to, description,status`;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err => next(err, req, res));
//Update bug 2
bugsController.updateBug = (req, res, next) => {
    const {bugId} = req.params;
    const {desc, assignedTo, projectId, status} = req.body;

    const sqlQuery = (assignedTo === undefined)
    ? `update bugs set description = '${desc}', project_id = ${projectId}, status = ${status}
    where id = ${bugId}
    returning id, project_id, author, assigned_to, description, status`
    : `update bugs set assigned_to = ${assignedTo}, description = '${desc}', project_id = ${projectId}, status = ${status}
    where id = ${bugId}
    returning id, project_id, author, assigned_to, description, status`

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err => next(err, req, res));
}

//DELETE BUG 1
bugsController.delete = (req, res, next) => {
    const {bugId} = req.body;

    const sqlQuery = `delete from bugs where id = ${bugId} returning id`;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    })
    .catch(err=>next(err, req, res));
}

//DELETE BUG 2
bugsController.delete = (req, res, next) => {
    const {bugId} = req.params;

    const sqlQuery = `delete from bugs where id=${bugId} returning id`;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    }).catch(err => next(err, req, res));
}

//SET STATUS = RESOLVED 1

//SET STATUS = RESOLVED 2



}

module.exports = bugsController;