import User from "../src/users/user.model.js"; 
import argon2 from "argon2";

export async function createAdminUser() { 
    try {
        const existingAdmin = await User.findOne({ role: "ADMIN" }); 
        if (!existingAdmin) {
            const hashedPassword = await argon2.hash("39679413"); 
            const admin = new User({
                name: "Carlos Orozco",
                email: "corozco2019392@gmail.com",
                password: hashedPassword,
                role: "ADMIN",
            });

            await admin.save();
            console.log("Administrador creado exitosamente.");
        }
    } catch (error) {
        console.error("Error al crear el administrador:", error);
    }
}
