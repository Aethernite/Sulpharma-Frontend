import * as yup from "yup";

const RegisterValidationSchema = yup.object({
    email: yup
        .string()
        .email("Трябва да въведете валиден имейл")
        .required("Имейлът трябва да се попълни"),
    password: yup
        .string()
        .min(8, "Паролата трябва да бъде поне 8 символа.")
        .max(20, "Паролата не може да бъде по-дълга от 20 символа.")
        .required("Паролата трябва да се попълни."),
    confirmPassword: yup
        .string()
        .required("Моля подтвърдете паролата.")
        .when("password", {
            is: password => (!!(password && password.length > 0)),
            then: yup.string().oneOf([yup.ref("password")], "Паролите не съвпадат!")
        })
});

export { RegisterValidationSchema };