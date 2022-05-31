const { Schema, model, trusted} = require('mongoose');

const UserSchema = Schema({
    
    name:{
        type: String,
        required: trusted,
    },
    email:{
        type: String,
        required: trusted,
        uniquie: true
    },
    password:{
        type: String,
        required: true
    },
    password:{
        type: Boolean,
        default: false
    }
});

UserSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object
});


module.exports = model('User', UserSchema)