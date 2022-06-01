const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
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
        //console.log(user)


        const token = await generarJWT(user.id)

        res.json({
            ok:true,
            user,
            token
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

    try {
        const {name, email, password} = req.body;

        const userdb = await User.findOne({email});
        if(!userdb){
            return res.status(404).json({
                ok: false,
                msg: "email or password are incorrect"
            });
        }


        const validPassword = bcrypt.compareSync(password, userdb.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: "email or password are incorrect"
            })
        }


        const token = await generarJWT(userdb.id)

        res.json({
            ok:true,
            userdb,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "something went wrong"
        });
    }
}


const renew_token = async(req, res) => {

    try {
        const uid = req.uid;

        //generate new token
        const token = await generarJWT( uid );
    
        // get user by uid
        const user = await User.findById( uid );
    
        res.json({
            ok:true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "something went wrong"
        });
    }


}

module.exports = {
    create_user,
    login,
    renew_token,
}