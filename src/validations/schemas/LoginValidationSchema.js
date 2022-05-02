import * as Yup from "yup";

const LoginValidationSchema = Yup.object({
    email: Yup.string().email("Моля въведете валиден имейл").required('Полето за имейл трябва да се попълни'),
    password: Yup.string().required('Полето за парола трябва да се попълни')
});

export { LoginValidationSchema };