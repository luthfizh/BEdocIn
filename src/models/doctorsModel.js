import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    speciality: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
        max: 255
    },
    bio: {
        type: String,
        default: 'Hi, I am doctor at Docin'
    },
    address: {
        type: String,
        default: 'Yogyakarta, Indonesia'
    },
    appointment_fee: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;