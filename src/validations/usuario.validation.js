"use strict";
import Joi from "joi";

export const userBodyValidation = Joi.object({
    email: Joi.string().email().messages({
        "string.email": "El email debe ser una dirección de correo electrónico válida",
        "string.empty": "El email no puede estar vacío"
    }),
    password: Joi.string().min(8).max(25).messages({
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "string.max": "La contraseña no puede tener más de 25 caracteres"
    })
}).min(1).unknown(false).messages({
    "object.min": "Se debe proporcionar al menos un campo para actualizar",
    "object.unknown": "Se han proporcionado campos no permitidos"
});