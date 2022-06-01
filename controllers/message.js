const Message = require("../models/message");


const getChat = async(req, res) =>{

    try {
        const myuid = req.uid;
        const MessageFrom = req.params.from;
    
        const last30 = await Message.find({
            $or:[
                { from: myuid, from:MessageFrom },
                { from: MessageFrom, from:myuid }
            ]
        })
        .sort({ createdAt: 'desc'})
        .limit(30);
    
        
        res.json({
            ok: true,
            myuid,
            last30
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
    getChat
}