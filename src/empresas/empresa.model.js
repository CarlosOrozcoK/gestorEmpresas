import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    nivelImpacto: {
        type: String,
        enum: ["Alto", "Medio", "Bajo"],
        required: true
    },
    anosTrayectoria: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    contacto: {
        telefono: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    }
}, {
    timestamps: true
});

const Empresa = mongoose.model("Empresa", empresaSchema);
export default Empresa;
