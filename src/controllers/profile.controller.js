import { handleSuccess, handleErrorServer } from "../Handlers/responseHandlers.js";
import { updateUser, deleteUser } from "../services/user.service.js";
import { userBodyValidation } from "../validations/usuario.validation.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

export async function updateProfile(req, res) {
  const user = req.user;
  const data = req.body;

  try {

    const { error } = userBodyValidation.validate(req.body);
    if (error) {
      return handleErrorServer(res, 400, "Valores ingresados no válidos", error.message);
    }

    const updatedUser = await updateUser(user.sub, data); // sub == id

    handleSuccess(res, 200, "Perfil actualizado exitosamente", {
      message: "Tu perfil ha sido actualizado.",
      userData: updatedUser,
    });
  } catch (error) {
    handleErrorServer(res, 500, "Error interno del servidor", error.message);
  }
}

export async function deleteProfile(req, res) {
  const user = req.user;
  try {
    const success = await deleteUser(user.sub); // sub == id
    if (success) {
      handleSuccess(res, 200, "Perfil eliminado exitosamente", {
        message: "Tu perfil ha sido eliminado.",
      });
    } else {
      handleErrorClient(res, 404, "Usuario no encontrado");
    }
  } catch (error) {
    handleErrorServer(res, 500, "Error interno del servidor", error.message);
  }
}