import User from "../src/users/user.model.js"; 
import argon2 from "argon2";

export async function createAdminUser() { 
    try {
        const existingAdmin = await User.findOne({ role: "ADMIN" }); 
        if (existingAdmin) {
            console.log("El usuario administrador ya existe. No se creará uno nuevo.");
            return;
        }
        let hashedPassword;
        try {
            hashedPassword = await argon2.hash("39679413");
        } catch (error) {
            console.error("Error al generar el hash de la contraseña:", error);
            return;
        }

        const admin = new User({
            name: "Carlos Orozco",
            email: "corozco2019392@gmail.com",
            password: hashedPassword,
            role: "ADMIN",
        });

        await admin.save();
        console.log(" Administrador creado exitosamente.");
    } catch (error) {
        console.error(" Error al crear el administrador:", error);
    }
}
