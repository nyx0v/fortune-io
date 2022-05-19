const express = require('express')

const router = express.Router()

const Analysis = require('../models/analysis')

const utils = require('../utils')

const err_msg = "Database error while trying to fetch, create, modify or delete an analysis"


router.get('/:project', utils.authorizationMiddleware, async (req, res) => {
    const project_id = req.params.project
    let analyses

    try {
        analyses = await utils.asyncFuncErrorHandler(
            () => Analysis.find({project: project_id}),
            err_msg,
            res
        )
    }
    catch(e) {
        console.log(e)

    }

    if(!analyses.error && analyses.result.length == 0) res.status(404).send({msg : "Can't find Analyses"})
    else if (!analyses.error) res.send(analyses.result)
})

router.post('/', utils.authorizationMiddleware, async (req, res) => {
    let analysis = req.body
    let rslt

    try {
        analysis = await utils.asyncFuncErrorHandler(
            () => Analysis.create(analysis),
            err_msg,
            res
        )
        if(!analysis.error) 
            rslt = await utils.asyncFuncErrorHandler(
                () => analysis.result.save(),
                err_msg,
                res
            )
    }
    catch(e) {
        console.log(e)

    }

    if(!rslt.error)
        res.send(analysis.result)
})

router.put('/:id', utils.authorizationMiddleware, async (req, res) => {
    const id = req.params.id
    let req_analysis = req.body
    let analysis

    try {
        analysis = await utils.asyncFuncErrorHandler(
            () => Analysis.findById(id),
            err_msg,
            res
        )

        if(!analysis.error && !analysis.result)
            res.status(404).send({msg: "Can't find analysis"})
        else if(!analysis.error) {
            analysis.result.name = req_analysis.name
            analysis.result.fields = req_analysis.fields
            analysis.result.dateLastModified = new Date()

            analysis = await utils.asyncFuncErrorHandler(
                () => analysis.result.save(),
                err_msg,
                res
            )
        }
    }
    catch(e) {
        console.log(e)
    }

    if(!analysis.error) 
        res.send(analysis.result)

})

router.delete('/:id', utils.authorizationMiddleware, async (req, res) => {
    let rslt
    const id = req.params.id

    try {
        rslt = await utils.asyncFuncErrorHandler(
            ()=>Analysis.deleteOne({_id: id}),
            err_msg,
            res
        )
    }
    catch(e) {
        console.log(e)
    }

    if(!rslt.error && rslt.result.deletedCount == 0)
        res.status(404).send({msg : "Can't find analysis"})
    else if(!rslt.error) res.send({msg : "Analysis deleted succesfully"}) 
})


module.exports = router