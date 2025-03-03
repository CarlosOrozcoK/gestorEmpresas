import User from "../src/users/user.model.js";
const argon2 = require("argon2");

const createAdminUser = async () => {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (!existingAdmin) {
            const hashedPassword = await argon2.hash("39679413"); 
            const admin = new User({
                name: "Carlos Orozco",
                email: "corozco2019392@gmail.com",
                password: hashedPassword,
                role: "admin",
            });

            await admin.save();
            console.log("Administrador creado exitosamente.");
        }
    } catch (error) {
        console.error("Error al crear el administrador:", error);
    }
};

export { createAdminUser };

