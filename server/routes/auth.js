const express = require('express');
const router = express.Router();

const User = require('../models/user');
const utils = require('../utils');

const errmsg = "Database error while fetching user";


router.post('/login', async (req, res) => {
    const cred = req.body;
    let user;
    try {
        user = await utils.asyncFuncErrorHandler(
            () => User.findOne({username: cred.username}),
            errmsg,
            res
        );
    }
    catch(e) {
        console.log(e);
    }

    if(!user.error && !user.result) res.status(404).send({msg : "Wrong username or password"});
    else if(!user.error) {
        if(utils.passCompare(user.result.password, cred.password)){
            res.send({token: utils.jwtGen({username: user.result.username, user_id: user.result._id})});
        }else{
            res.status(400).send({msg: "Wrong username or password"});
        }
    }

});


module.exports = router;