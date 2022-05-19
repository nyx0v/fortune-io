const express = require('express');
const router = express.Router();


const utils = require('../utils');

const fs = require("fs");



router.get('/:filename', utils.authorizationMiddleware, async (req, res) => {
    
    const path = `./uploads/${req.params.filename}`;
    console.log(path);
    if(fs.existsSync(path)) {
        res.download(path);
        res.status(200);
    }else {
        res.status(404).send({msg: "file does not exist"});
    }
    

});


module.exports = router;