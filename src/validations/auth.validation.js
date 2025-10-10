"use strict";
import Joi from "joi";

export const authValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "El email debe ser una dirección de correo electrónico válida",
        "string.empty": "El email no puede estar vacío",
        "any.required": "El email es obligatorio"
        }),
    password: Joi.string().min(8).max(25).required().messages({
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "string.max": "La contraseña no puede tener más de 25 caracteres",
        "string.empty": "La contraseña no puede estar vacía",
        "any.required": "La contraseña es obligatoria"
    })
}).unknown(false).messages({
    "object.unknown": "Se han proporcionado campos no permitidos"
});

export const registerValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "El email debe ser una dirección de correo electrónico válida",
        "string.empty": "El email no puede estar vacío",
        "any.required": "El email es obligatorio"
    }),
    password: Joi.string().min(8).max(25).required().messages({
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "string.max": "La contraseña no puede tener más de 25 caracteres",
        "string.empty": "La contraseña no puede estar vacía",
        "any.required": "La contraseña es obligatoria"
    })
}).unknown(false).messages({
    "object.unknown": "Se han proporcionado campos no permitidos"
});
