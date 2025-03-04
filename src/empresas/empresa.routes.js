import { Router } from "express";
import { check } from "express-validator";
import { obtenerEmpresas, obtenerEmpresaPorId, crearEmpresa, actualizarEmpresa} from "./empresa.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.get("/", validarJWT, obtenerEmpresas);

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "¡El ID de la empresa no es válido!").isMongoId(),
        validarCampos
    ],
    obtenerEmpresaPorId
);

router.post(
    "/",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("nombre", "¡El nombre es obligatorio!").not().isEmpty(),
        check("nivelImpacto", "¡El nivel de impacto debe ser Alto, Medio o Bajo!").isIn(["Alto", "Medio", "Bajo"]),
        check("anosTrayectoria", "¡Los años de trayectoria deben ser un número positivo!").isInt({ min: 0 }),
        check("categoria", "¡La categoría es obligatoria!").not().isEmpty(),
        check("contacto.telefono", "¡El teléfono es obligatorio!").not().isEmpty(),
        check("contacto.email", "¡El correo no es válido!").isEmail(),
        validarCampos
    ],
    crearEmpresa
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("id", "¡El ID de la empresa no es válido!").isMongoId(),
        validarCampos
    ],
    actualizarEmpresa
);

export default router;
