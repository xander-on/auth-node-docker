import { ValidationError } from "sequelize"

export const getErrorMessage = (error:unknown) =>{

    if (error instanceof Error) {

        if(error instanceof ValidationError){
            return error.errors[0].message
        }

        return error.message
    }

    return String(error)
}
