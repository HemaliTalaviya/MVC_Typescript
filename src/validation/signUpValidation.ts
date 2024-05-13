
import Joi from "joi";

export const signUpvalidation = (data:any) =>{
    const schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(3)
    })

    const validateData = schema.validate(data);
    return validateData;
}