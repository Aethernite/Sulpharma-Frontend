import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  Spinner,
  FormGroup,
  Alert
} from "react-bootstrap";
import { useFormik } from 'formik';
import classNames from 'classnames';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { RegisterValidationSchema } from "../../validations/schemas/RegisterValidationSchema";
import { clearErrors, register } from "../../state/reducers/authReducer";
import '../../styles.scss';

const Title = styled.h1`
  font-family: 'Lobster', cursive;
  letter-spacing: 0.2rem;
  font-size: 4rem;
  transition: transform 0.2s;
&:hover{
    transform: scale(1.2);
    cursor: pointer;
}
`

const Label = styled.label`
font-family: 'Roboto', sans-serif;
font-weight: 400;
`;

const Form = styled.form`
 position: relative;
    display: -ms-flexbox;
    display: flex;
    padding: 1rem;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 1.1rem;
    outline: 0;
    max-width: 500px;
    font-family: 'Roboto', sans-serif;
 
    input::placeholder{
       font-style:italic;
       font-family: 'Roboto', sans-serif;
       opacity: 0.4;
     }
`;

const Header = styled.h2`
font-family: 'Roboto', sans-serif;
font-weight: 300;
font-size: 2rem;
letter-spacing: 0rem;
`;

const RegisterModal = ({ show, handleClose, showLogin }) => {

    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch();
    const submit = React.useRef();
    const success = useSelector(state => state.auth.success);

    const handleSubmit = () => {
        submit.current.click();
    }

    const formikInitialValues = { initialValues: {
        email: '',
        password: '',
        confirmPassword: ''
    }}

    const formikInitialTouchedValues = {
        email: false,
        password: false,
        confirmPassword: false
    }

    const formik = useFormik({
        initialValues: formikInitialValues,

        onSubmit: (values) => {
            dispatch(register(values));
        },
        validationSchema: RegisterValidationSchema,
    });
 
    React.useEffect(() => {
        dispatch(clearErrors());
    },[dispatch])

  return (
    <Modal id="registerModal" show={show} onShow={() => formik.setTouched(formikInitialTouchedValues)} onHide={handleClose}>
          <ModalBody className="w-100 bg-transparent">
          <Form id="myform" className="myform shadow" onSubmit={formik.handleSubmit}>
                    <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                            <Title>Сулфарма</Title>
                            <Header>Регистрация на потребители</Header>
                        </div>
                    </div>
                    {error &&
                        <Alert variant="danger">{error === 409 ? "Потребител с този имейл вече съществува.": "Възникна грешка, опитайте по-късно."}</Alert>
                    }
                    {success && <Alert variant="info">{"Вие се регистрирахте успешно!"}</Alert>}
                    <FormGroup className="form-group">
                        {formik.touched.email && formik.errors.email &&
                            <Alert variant="danger">{formik.errors.email}</Alert>}
                        <Label className="form-label">Имейл:</Label>
                        <input type="text"
                            name="email"
                            className={"form-control " + classNames(formik.touched.email
                                && !formik.errors.email
                                && "is-valid",
                                formik.touched.email
                                && formik.errors.email
                                && "is-invalid")}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            id="email"
                            placeholder="Въведете имейл.."
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        {formik.touched.password && formik.errors.password &&
                            <Alert variant="danger">{formik.errors.password}</Alert>}
                        <Label className="form-label">Парола:</Label>
                        <input type="password"
                            name="password"
                            id="password"
                            className={"form-control " + classNames(formik.touched.password
                                && !formik.errors.password
                                && "is-valid",
                                formik.touched.password
                                && formik.errors.password
                                && "is-invalid")}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Въведете парола.." />
                    </FormGroup>
                    <FormGroup className="form-group">
                        {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                            <Alert variant="danger">{formik.errors.confirmPassword}</Alert>}
                        <Label className="form-label">Подтвърждаване на парола:</Label>
                        <input type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className={"form-control " + classNames(formik.touched.confirmPassword
                                && !formik.errors.confirmPassword
                                && "is-valid",
                                formik.touched.confirmPassword
                                && formik.errors.confirmPassword
                                && "is-invalid")}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Подтвърдете парола.." />
                    </FormGroup>
                    {/*<FormGroup className="form-group">*/}
                        {/*<p className="text-center">By signing up you accept our <a href="#TermsOfUse">Terms Of Use</a></p>*/}
                    {/*</FormGroup>*/}
                    <FormGroup className="form-group">
                        <div className="col-md-12 text-center ">
                            <a href="# " onClick={handleSubmit} className="btn-flip mb-3" data-back="Регистрация" data-front="Регистрация" style={{ textDecoration: 'none', display: isLoading ? "none" : "", marginTop: "1rem" }}> </a>
                            <button ref={submit} form="myform" type="submit" style={{ display: 'none' }}></button>
                            {isLoading && <Spinner animation="border" />}
                        </div>
                    </FormGroup>
                    <FormGroup className="form-group">
                    <p className="text-center">Имате акаунт? Влезте от <span onClick={() => showLogin()} className="hoverable" style={{color: "#0000FF", textDecoration:"underline"}}>тук</span></p>
                    </FormGroup>
                </Form>
          </ModalBody>
    </Modal>
  );
};

export default RegisterModal;
