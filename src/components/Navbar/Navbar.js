import React, { useState } from "react";
import logo from "../../assets/logo.png";

import {
  Navbar,
  Nav,
  Container,
  Image,
  Row,
  NavDropdown,
  Dropdown,
  Button,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faHeartbeat,
  faSpa,
  faBaby,
  faShoppingCart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { LoginModal } from "../";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../state/reducers/authReducer";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const Avatar = styled.img`
  width: 2.3rem;
  height: 2.3rem;
  margin-right: 1rem;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const history = useHistory();

  const handleCloseLogin = () => setShowLoginModal(false);
  const handleShowLogin = () => setShowLoginModal(true);

  const handleCloseRegister = () => setShowRegisterModal(false);
  const handleShowRegister = () => setShowRegisterModal(true);

  const showRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const showLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const [value, setValue] = useState();
  const onInput = ({ target: { value } }) => setValue(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(!value || value.length === 0)) {
      history.push("/products/search/" + value);
    }
  };

  return (
    <>
      <Row>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          fixed="static-top"
          className="navbar-style"
        >
          <Container fluid>
            <Navbar.Brand href="/">
              <Image src={logo} width="160px" height="41px" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="d-flex w-100">
                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faHeartbeat} />
                      <span style={{ marginLeft: "0.5rem" }}>Здраве</span>
                    </span>
                  }
                  id="collasible-nav-dropdown"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <NavDropdown.Item href="/products/health/alergy">
                    Алергия
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/vitamin-and-minerals">
                    Витамини и минерали
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/veins-and-hemorrhoids">
                    Вени, съдове, хемороиди
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/diet">
                    Диета
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/detox">
                    Детокс
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/cough">
                    Кашлица
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/pain">
                    Лекарства за болка
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/nerve-system">
                    Нервна система
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/flu">
                    Настинка
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/eyes">
                    Очни
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/bones">
                    Стави и кости
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/fever">
                    Температура
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/ears-nose-throat">
                    Уши, нос, гърло
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/liver-and-kidney">
                    Черен дроб и бъбреци
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/digesting-system">
                    Храносмилателна система
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/diabetes">
                    Диабет
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faSpa} />
                      <span style={{ marginLeft: "0.5rem" }}>Красота</span>
                    </span>
                  }
                  id="collasible-nav-dropdown"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <NavDropdown.Item href="/products/beauty/deodorants">
                    Дезодоранти
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/cosmetics">
                    Козметични комплекти
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/hair">
                    Продукти за коса
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/face">
                    Продукти за лице
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/men">
                    Продукти за мъже
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/body">
                    Продукти за тяло
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/lips">
                    Продукти за устни
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/soap">
                    Сапуни
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/sunbathing">
                    Слънцезащитни продукти
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faBaby} />
                      <span style={{ marginLeft: "0.5rem" }}>Майка и дете</span>
                    </span>
                  }
                  id="collasible-nav-dropdown"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <NavDropdown.Item href="/products/mother-and-child/aspirators">
                    Аспиратори
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/baby">
                    Биберони
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/pumps">
                    Помпи за кърма
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/food">
                    Храна
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/tampons">
                    Тампони
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/pands">
                    Превръзки
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/diapers">
                    Пелени и памперси
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/locations">
                  <span>
                    <FontAwesomeIcon icon={faMapMarkedAlt} />
                    <span style={{ marginLeft: "0.5rem" }}>Локации</span>
                  </span>
                </Nav.Link>
              </Nav>

              <div
                className="search-bar"
                style={{ marginRight: "1.5rem", width: "35%" }}
              >
                <Form onSubmit={handleSubmit} className="d-flex search-bar">
                  <Button type="submit" variant="primary">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <Form.Control
                    type="search"
                    onChange={onInput}
                    value={value}
                    placeholder="Търсене"
                  />
                </Form>
              </div>

              <div
                className="float-right d-flex hoverable d-none d-lg-block"
                style={{ marginRight: "1rem" }}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
              {user && (
                <Dropdown className="float-right">
                  <Dropdown.Toggle
                    as={Avatar}
                    style={{ objectFit: "cover" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    className="rounded-circle"
                  />
                  <Dropdown.Menu style={{ transform: "translateX(-70%)" }}>
                    <Dropdown.Item>
                      <Link to="/users/me" style={{ padding: "0px" }}>
                        <span
                          style={{ textDecoration: "none", color: "#696969" }}
                        >
                          Моят профил
                        </span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        to="/login"
                        onClick={() => dispatch(logout())}
                        style={{ padding: "0px" }}
                      >
                        <span
                          style={{ textDecoration: "none", color: "#696969" }}
                        >
                          Изход
                        </span>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Nav>
                {!user && (
                  <>
                    <Nav.Link href="#features" onClick={handleShowLogin}>
                      Вход
                    </Nav.Link>
                    <Nav.Link href="#pricing" onClick={handleShowRegister}>
                      Регистрация
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            {!user && (
              <>
                <LoginModal
                  show={showLoginModal}
                  handleClose={handleCloseLogin}
                  showRegister={showRegister}
                />
                <RegisterModal
                  show={showRegisterModal}
                  handleClose={handleCloseRegister}
                  showLogin={showLogin}
                />
              </>
            )}
          </Container>
        </Navbar>
      </Row>
    </>
  );
};

export default NavbarComponent;
