const mongose = require('mongoose');

const Schema = mongose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true
    }
},
{
    timestamps: true
});

const User = mongose.model('user', userSchema);

module.exports = User;