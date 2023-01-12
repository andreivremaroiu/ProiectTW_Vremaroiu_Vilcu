const db = require('../models/bugs');

const projectsController = {};

//selectare membri proiect
projectsController.getMembers = (req, res, next) => {
    const {projectId} = req.params;
    const {limit, offset} = req.query;

    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

    const sqlQuery = `
        select projects.id as project_id, projects.name as project_name, users.id as user_id, users.username
        from ((memberlist inner join projects on memberlist.project_id = projects.id)
        inner join users on users.id = memberlist.user_id)
        where projects.id = ${projectId}
        order by users.id
        ${limitClause}
        ${offsetClause}
    `
    db.query(sqlQuery).then(results => {
        res.locals.data = results.rows;
        next();
    }) .catch(err => next(err, req, res));
}

//adaugare membru proiect
projectsController.addMember = (req, res, next) => {
    const {projectId, userId} = req.body;

    const sqlQuery = `
        insert into memberlist (project_id, user_id)
        values (${projectId}, ${userId})
        returning id, project_id, user_id
    `;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    }).catch(err=>next(err, req, res));
}

//Update membru pentru proiect
projectsController.updateMembers = async (req, res, next) => {
    const {projectId, members} = req.body;

    //stergem tot ce inseamna membri existenti
    let sqlQuery = `
        delete from memberlist
        where project_id = ${projectId}
    `;

    await db.query(sqlQuery) .then(results => {
        res.locals.data = results.rows;
    }) .catch(err => next(err, req, res));

    //adaugare membru
    const values = members.map(userId => `${userId}, ${projectId}`).join(',');
    sql = `
        insert into memberlist (user_id, project_id)
        values ${values}
        returning id, project_id, user_id
    `;

    res.locals.data = [];
    db.query(sql).then(results => {
        res.locals.data.push(...results.rows);
        next();
    }).catch(err=>next(err, req, res));
};

//eliminare membru proiect

//numar buguri proiect

//selecteaza toate bugurile proiect

//nr total proiecte

//creare proiect nou

//afisare detalii proiect

//update detalii proiect

//stergere proiect 1

//stergere proiect 2


