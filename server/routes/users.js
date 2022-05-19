const express = require('express')

const router = express.Router()

const User = require('../models/user')

const utils = require('../utils')

const err_msg = "Database error while trying to fetch, create, modify or delete a user";



router.get('/:username', utils.authorizationMiddleware,async (req, res) => {
    const username = req.params.username
    if(utils.auth_guard(req.username, username, res)) return;
    let result
    try {
        result = await utils.asyncFuncErrorHandler(
            () => User.findOne({username: username}), 
            err_msg,
            res)
    }catch(e) {
        console.log(e);
    }

    if(!result.error && result.result) res.send(
        //result.result without password
        {
            username : result.result.username,
            _id: result.result._id
        }
    )
    else if(!result.error) res.status(404).send({msg: "User not found"})
})

router.post('/', async (req, res) => {
    let user = req.body
    user.password = utils.hashPass(user.password)
    let ok
    try {

        user = await utils.asyncFuncErrorHandler(
            () => User.create(user),
            err_msg,
            res
        )

        if(!user.error){
            ok = await utils.asyncFuncErrorHandler(
                () => user.result.save(),
                err_msg,
                res
            )
        }

    }catch(e) {
        console.log(e);
    }

    
        if(!user.error && !(ok.error)) res.send({
            username: user.result.username,
            _id: user.result._id
        })
    
})





module.exports = router