const { Schema, model, trusted} = require('mongoose');

const MessageSchema = Schema({
    
    from:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    to:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    message:{
        type: String,
        required: true
    },
    password:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

MessageSchema.method('toJSON', function() {
    const {__v,  ...object} = this.toObject();
    return object
});


module.exports = model('Message', MessageSchema)