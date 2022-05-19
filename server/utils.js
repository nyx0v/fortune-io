const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWTSECRET;

async function asyncFuncErrorHandler(func, msg, res, send=true) {
    let result
    try {
        result = await func()
    }catch(e) {
        console.log("asynfunccatch");

        if(process.env.DEBUGGING) {
            console.log(e)

        }
        if(send) res.status(500).send({msg: msg})

        return {result: undefined, error: true}
    }

    return {result: result, error: false}
}

function hashPass(data) {
    const saltRounds = 10;
    return bcrypt.hashSync(data, saltRounds);
}

function passCompare(hashed, pass) {
    console.log(hashed);
    console.log(pass);
    return bcrypt.compareSync(pass, hashed);
}

function jwtGen(userdata) {
    
    const tomorrow = Date.now()/1000 + (24*60*60);
    const token = jwt.sign({data:userdata, exp: tomorrow}, secret);

    return token;
}

function jwtVerify(token) {
    let data;
    try {
        data = jwt.verify(token, secret).data;
    }catch(err) {
        return null;
    }

    return data;
}

function authorizationMiddleware(req, res, next) {
    const data = jwtVerify(req.query.token);
    if(!data) {
        res.status(400).send({msg: "Invalid token"});
    }else{
        req.username = data.username;
        req.user_id = data.user_id;
        next();
    }
}

function auth_guard(lhs, rhs, res) {
    if(lhs != rhs){
        res.status(400).send({msg: "Oops token/user missmatch"}) //guard
        return true;
    }
    return false;

}


module.exports.asyncFuncErrorHandler = asyncFuncErrorHandler
module.exports.hashPass = hashPass
module.exports.passCompare = passCompare
module.exports.jwtGen = jwtGen;
module.exports.jwtVerify = jwtVerify;
module.exports.authorizationMiddleware = authorizationMiddleware;
module.exports.auth_guard = auth_guard;
