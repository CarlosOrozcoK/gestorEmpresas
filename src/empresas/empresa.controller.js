import Empresa from "./empresa.model.js";

export const obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las empresas", error });
    }
};

export const obtenerEmpresaPorId = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la empresa", error });
    }
};

export const crearEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = new Empresa(req.body);
        await nuevaEmpresa.save();
        res.status(201).json(nuevaEmpresa);
    } catch (error) {
        res.status(400).json({ message: "Error al crear la empresa", error });
    }
};

export const actualizarEmpresa = async (req, res) => {
    try {
        const empresaActualizada = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!empresaActualizada) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        res.json(empresaActualizada);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la empresa", error });
    }
};