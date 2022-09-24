import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 200,
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 200,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 100,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    bio: {
        type: String,
        default: 'Hi, I am using Docin'
    },
    address: {
        type: String,
        default: 'Yogyakarta, Indonesia'
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const User = mongoose.model('User', userSchema);

export default User;