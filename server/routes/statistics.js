const express = require('express')

const router = express.Router()

const statistical = require('statistical-js')



router.post('/:type', (req, res) => {
    let data = req.body.data;
    const type = req.params.type;
    if(!data || !type) return res.status(400).send({msg: 'Please send data and type'});

    if(type === "Numeric") data = data.map(r => Number(r));

    const basics = statistical.methods.summary(data);
    // const factorial = statistical.methods.factorial(data);
    const geometricmean = statistical.methods.geometricMean(data);
    const harmonicmean = statistical.methods.harmonicMean(data);
    const samplevariance = statistical.methods.sampleVariance(data);
    const samplestandarddeviation = statistical.methods.sampleStdDeviation(data);




    res.send({
        ...basics,
        geometricmean: geometricmean,
        harmonicmean: harmonicmean,
        samplevariance: samplevariance,
        samplestandarddeviation: samplestandarddeviation,

    });

})



module.exports = router