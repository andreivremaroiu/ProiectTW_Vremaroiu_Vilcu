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
projectsController.removeMember = (req, res, next) => {
    const {projectId, userId} = req.body;

    const sqlQuery = `
        delete from memberlist
        where user_id = ${userId} and project_id = ${projectId}
        returning userId
    `;

    db.query(sqlQuery).then(results => {
        res.locals.data = results.rows;
        next();
    }).catch(err => next(err, req, res))
}

//numar buguri proiect
projectsController.getBugsCount = async (req, res, next) => {
    const {projectId} = req.params;

    const sqlQuery = `
        select count (*) from bugs where project_id = ${projectId}
    `

    db.query(sqlQuery).then(results => {
        res.locals.data = results.rows;
        next();
    }).catch(err => next(err, req, res));
}

//selecteaza toate bugurile proiect
projectsController.getBugs = async (req, res, next) => {
    const {projectId} = req.params;
    const {limit, offset} = req.query;

    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

    const sqlQuery = `
        select * from bugs where project_id = ${projectId} order by bugs.id
        ${limitClause}
        ${offsetClause}
    `;

    db.query(sqlQuery)
    .then(results => {
        res.locals.data = results.rows;
        next();
    }).catch(err => next(err, req, res));
}

//nr total proiecte
projectsController.getAllProjectsCount = (req, res, next) => {
    const sqlQuery = `
        select count(*) from projects
    `;

    db.query(sqlQuery).then(results => {
        res.locals.data = results.rows;
        next();
    }).catch(err => next(err, req, res));
};

//selecteaza toate proiectele
projectsController.getAllProjects = (req, res, next) => {
    const {limit, offset} = req.query;

    const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
    const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

    const sqlQuery = `select * from projects order by projects.id ${limitClause} ${offsetClause}`;

    db.query(sqlQuery).then(results => {
        res.locals.dat = results.rows;
        next();
    }).catch(err => next(err, req, res));
};

//creare proiect nou
projectsController.create = async (req, res, next) => {
    const {name, owner, users} = req.body;

    //creare proiect si selectare id proiect
    const sqlQuery = `insert into project (name, owner) values ('${name}', ${owner}) returning id, name, owner`

    let projectId;

    await db.query(sqlQuery).then(results => {
        projectId = results.rows[0].id;
        res.locals.data = results.rows;
    }).catch(err => next(err, req, res));

    //creare lista membri
    if(users.length > 0) {
        const values = users.map(userId => `(${userId}, ${projectId})`).join(',');

        const sqlQuery = `insert into memberlist (user_id, project_id)
        values ${values} returning user_id`;

        await db.query(sqlQuery).then(results => {
            res.locals.members = results.rows;
        }).catch(err => next(err, req, res));
    }
    next();
};

//afisare detalii proiect
projectsController.get = (req, res, next) => {
    const {projectId} = req.params;
  
    const sql = `
      SELECT *
      FROM projects
      WHERE id = ${projectId}`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
};

//update detalii proiect
projectsController.update = (req, res, next) => {
    const {projectId, name, owner} = req.body;
  
    const sql = `
      UPDATE projects
      SET name = '${name}', owner = ${owner}
      WHERE id = ${projectId}
      RETURNING id, name, owner`
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));
};

//stergere proiect 1
projectsController.delete = async (req, res, next) => {
    const {projectId} = req.body;

    //stergere lista membri
    let sql = `
      DELETE FROM memberlist
      WHERE project_id = ${projectId}`;
    
    await db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
      })
      .catch(error => next(error, req, res)); 
  
    // stergere proiect
    sql = `
      DELETE FROM projects
      WHERE id = ${projectId}
      RETURNING id`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));    
  };

//stergere proiect 2
projectsController.deleteProject = async (req, res, next) => {
    const {projectId} = req.params;

    //stergere lista membri
    let sql = `
      DELETE FROM memberlist
      WHERE project_id = ${projectId}`;
    
    await db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
      })
      .catch(error => next(error, req, res)); 
  
    // stergere proiect
    sql = `
      DELETE FROM projects
      WHERE id = ${projectId}
      RETURNING id`;
  
    db.query(sql)
      .then(results => {
        res.locals.data = results.rows;
        next();
      })
      .catch(error => next(error, req, res));    
  };

  module.exports = projectsController;
