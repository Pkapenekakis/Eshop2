export const createUserValidationSchema = {
    username:{
        isLength:{
            options: {
                min: 5,
                max: 12,
            },
            errorMessage:
            "Username must be at least 5 characters long with a max of 12 characters",
        },
        notEmpty: {
            errorMessage: "Username cannot be empty",
        },
        isString: {
            errorMessage: "Username is not Valid"
        },
    },
    displayName: {
        notEmpty: {
            errorMessage: "Display name cannot be empty"
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Non valid password"
        },
    },
};
