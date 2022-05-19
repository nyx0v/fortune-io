const express = require('express')

const router = express.Router()

const Project = require('../models/project')

const utils = require('../utils')

const err_msg = "Database error while trying to fetch, create, modify or delete a project"

router.get('/:user', utils.authorizationMiddleware, async (req, res) => {
    const user_id = req.user_id;

    if(utils.auth_guard(user_id, req.user_id, res)) return; //guard

    let projects

    try {
        projects = await utils.asyncFuncErrorHandler(
            ()=>Project.find({user:user_id}),
            err_msg,
            res
        )
    }
    catch(e) {
        console.log(e)
    }

    if(!projects.error && projects.result.length == 0) res.status(404).send({msg: "Can't find projects"})
    else if(!projects.error) res.send(projects.result)
})

router.post('/', utils.authorizationMiddleware, async (req, res) => {
    let project = req.body;
    if(utils.auth_guard(project.user, req.user_id, res)) return; //guard
    let rslt
    try {
        project = await utils.asyncFuncErrorHandler(
            () => Project.create(project),
            err_msg,
            res
        )
        if(!project.error)
            rslt = await utils.asyncFuncErrorHandler(
                () => project.result.save(),
                err_msg,
                res
            )
    }
    catch(e) {
        console.log(e);
    }
    if(!rslt.error) res.send(project.result);
})

router.put('/:id', utils.authorizationMiddleware, async (req, res) => {
    const project_id = req.params.id
    const req_project = req.body
    let project
    try {
        project = await utils.asyncFuncErrorHandler(
            () => Project.findById(project_id),
            err_msg,
            res
        )
        
        if(!project.error && !project.result)
            res.status(404).send({msg: "Can't find project"});
        else if(!project.error) {
            if(utils.auth_guard(project.result.user, req.user_id, res)) return; //guard
            project.result.name = req_project.name;
            project.result.data = req_project.data;
            project.result.dateLastModified = new Date();

            project = await utils.asyncFuncErrorHandler(
                () => project.result.save(),
                err_msg,
                res
            )
        }
    }
    catch(e) {
        console.log(e);
    }
    if(!project.error) res.send(project.result);
})

router.delete('/:id', utils.authorizationMiddleware, async (req, res) => {
    let rslt
    const id = req.params.id



    try {
        rslt = await utils.asyncFuncErrorHandler(
            ()=>Project.findOne({_id: id}),
            err_msg,
            res
        )
    }
    catch(e) {
        console.log(e)
    }

    if(!rslt.error && !rslt.result)
        res.status(404).send({msg : "Can't find project"})
    else if(!rslt.error) {
        if(utils.auth_guard(rslt.result.user, req.user_id, res)) return; //guard
        else {
            rslt = await utils.asyncFuncErrorHandler(
                ()=>rslt.result.remove(),
                err_msg,
                res
            )

            if(!rslt.error && rslt.result){
                res.send({msg : "Project deleted succesfully"}) 
            }
        }
    } 
})

module.exports = router