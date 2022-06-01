const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const User = require("../models/user");


const create_user = async(req, res = response) =>{
    
    try {
        const {name, email, password} = req.body;

        const emailexist = await User.findOne({email});
        if(emailexist){
            return res.status(400).json({
                ok: false,
                msg: "email already exists"
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        await user.save();

        res.json({
            ok:true,
            user
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "something went wrong"
        })
    }


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