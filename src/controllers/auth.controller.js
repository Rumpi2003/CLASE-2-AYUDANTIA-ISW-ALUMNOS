import { loginUser } from "../services/auth.service.js";
import { createUser } from "../services/user.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { authValidation, registerValidation } from "../validations/auth.validation.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { error } = authValidation.validate(req.body);
    
    if (error) {
      return handleErrorClient(res, 400,"Valores ingresados no válidos", error.message);
    }
    
    const data = await loginUser(email, password);
    handleSuccess(res, 200, "Login exitoso", data);
  } catch (error) {
    handleErrorClient(res, 500, "Error interno del servidor", error.message);
  }
}

export async function register(req, res) {
  try {
    const data = req.body;
    const { error } = registerValidation.validate(req.body);
    
    if (error) {
      return handleErrorClient(res, 400, "Valores ingresados no válidos", error.message);
    }
    
    const newUser = await createUser(data);
    delete newUser.password; // Nunca devolver la contraseña
    handleSuccess(res, 201, "Usuario registrado exitosamente", newUser);
  } catch (error) {
    if (error.code === '23505') { // Código de error de PostgreSQL para violación de unique constraint
      handleErrorClient(res, 409, "El email ya está registrado");
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}
