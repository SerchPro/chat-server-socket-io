const { response } = require("express");


const create_user = async(req, res = response) =>{
    res.json({
        ok:true,
        msg:'new'
    });
}


const login = async(req, res = response) => {

    res.json({
        ok:true,
        msg:'logged'
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