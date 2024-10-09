const { default: mongoose } = require('mongoose');
const schema = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    displayName: {
        type: mongoose.Schema.Types.String
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;