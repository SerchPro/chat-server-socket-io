const { response } = require("express");


const create_user = async(req, res = response) =>{
    const {email, password} = req.body;

    res.json({
        ok:true,
        msg:'new',
        email, 
        password,
    });
}


const login = async(req, res = response) => {
    
    const {email, password} = req.body;

    res.json({
        ok:true,
        msg:'logged',
        email, 
        password,
    });
}


const renew_token = async(req, res) => {
    res.json({
        ok:true,
        msg:'renew'
    });
}

module.exports = {
    create_user,
    login,
    renew_token,
}