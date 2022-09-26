import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    creator_name: {
        type: String,
        required: true,
    },
    receiver_name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    },
    appointment_fee: {
        type: Number,
        default: 0
    },
    fee_status: {
        type: String,
        default: "unsettled"
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;