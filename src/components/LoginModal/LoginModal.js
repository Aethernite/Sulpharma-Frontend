import React from "react";
import { useSelector } from "react-redux";
import { Modal, ModalBody, Spinner, FormGroup, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LoginValidationSchema } from "../../validations/schemas/LoginValidationSchema";
import { clearErrors, login } from "../../state/reducers/authReducer";
import "../../styles.scss";

const FormLabel = styled.label`
  font-family: "Roboto", sans-serif;
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
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1.1rem;
  outline: 0;
  max-width: 500px;
  font-family: "Roboto", sans-serif;
  input::placeholder {
    font-style: italic;
    font-family: "Roboto", sans-serif;
    opacity: 0.4;
  }
`;

const Logo = styled.h1`
  font-family: "Lobster", cursive;
  letter-spacing: 0.2rem;
  font-size: 4rem;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Header = styled.h2`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 2rem;
  letter-spacing: 0rem;
`;

const LoginModal = ({ show, handleClose, showRegister }) => {
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const submit = React.useRef();

  const handleSubmit = () => {
    submit.current.click();
  };

  const formikInitialValues = {
    initialValues: {
      email: "",
      password: "",
    },
  };

  const formikInitialTouchedValues = {
    email: false,
    password: false,
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      dispatch(login(values));
    },
    validationSchema: LoginValidationSchema,
  });

  React.useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <Modal
      id="loginModal"
      show={show}
      onShow={() => formik.setTouched(formikInitialTouchedValues)}
      onHide={handleClose}
    >
      <ModalBody className="w-100 bg-transparent">
        <Form onSubmit={formik.handleSubmit} id="myform">
          <div className="logo mb-3">
            <div className="col-md-12 text-center">
              <Logo>Сулфарма</Logo>
              <Header>Вход за потребители</Header>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <FormGroup>
            {formik.touched.email && formik.errors.email && (
              <Alert variant="danger">{formik.errors.email}</Alert>
            )}
            <FormLabel className="form-label">Имейл:</FormLabel>
            <input
              type="text"
              name="email"
              className={
                "form-control " +
                classNames(
                  formik.touched.email && !formik.errors.email && "is-valid",
                  formik.touched.email && formik.errors.email && "is-invalid"
                )
              }
              id="email"
              placeholder="Въведете имейл.."
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel className="form-label">Парола:</FormLabel>
            <input
              type="password"
              name="password"
              id="password"
              className={
                "form-control " +
                classNames(
                  formik.touched.password &&
                    !formik.errors.password &&
                    "is-valid",
                  formik.touched.password &&
                    formik.errors.password &&
                    "is-invalid"
                )
              }
              placeholder="Въведете парола.."
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <div className="col-md-12 text-center ">
            <a
              href="# "
              onClick={handleSubmit}
              class="btn-flip mb-3"
              data-back="Вход"
              data-front="Вход"
              style={{
                textDecoration: "none",
                display: isLoading ? "none" : "",
                marginTop: "1rem",
              }}
            >
              {" "}
            </a>
            <button
              ref={submit}
              form="myform"
              type="submit"
              style={{ display: "none" }}
            />
            {isLoading && <Spinner animation="border" />}
          </div>
          <div className="form-group">
            <p className="text-center">
              Нямате акаунт? Регистрирайте се{" "}
              <span onClick={() => showRegister()} style={{color: "#0000FF", textDecoration:"underline"}} className="hoverable">тук</span>
            </p>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;
