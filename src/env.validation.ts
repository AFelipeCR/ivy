import Joi from "joi";

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),

    PORT: Joi.number().port().default(3000),
    SERVER_IP: Joi.string(),

    API_KEY: Joi.string(),
    WHATSAPP_URL: Joi.string().uri(),
    SECRET: Joi.string(),

    ATERNOS_USER: Joi.string(),
    ATERNOS_PASS: Joi.string(),
});