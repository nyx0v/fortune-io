const express = require('express');
const router = express.Router();


const utils = require('../utils');
const { v4: uuidv4 } = require('uuid');



router.post('/', utils.authorizationMiddleware, async (req, res) => {
    
    console.log("file")
    
    try {
        if(!req.files) {
            res.status(400).send({
                msg: 'No file uploaded'
            });
            
        } else {
            
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let file = req.files.file;
            let filename = uuidv4();
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv('./uploads/' + filename);

            //send response
            res.send({
                message: 'File is uploaded',
                data: {
                    name: filename,
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }

});


module.exports = router;