import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true, 
        trim: true
    }
});

export default mongoose.model('Role', RoleSchema);
