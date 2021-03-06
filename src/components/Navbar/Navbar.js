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
                      <span style={{ marginLeft: "0.5rem" }}>????????????</span>
                    </span>
                  }
                  id="collasible-nav-dropdown"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <NavDropdown.Item href="/products/health/alergy">
                    ??????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/vitamin-and-minerals">
                    ???????????????? ?? ????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/veins-and-hemorrhoids">
                    ????????, ????????????, ??????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/diet">
                    ??????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/detox">
                    ????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/cough">
                    ??????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/pain">
                    ?????????????????? ???? ??????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/nerve-system">
                    ???????????? ??????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/flu">
                    ????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/eyes">
                    ????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/bones">
                    ?????????? ?? ??????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/fever">
                    ??????????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/ears-nose-throat">
                    ??????, ??????, ??????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/liver-and-kidney">
                    ?????????? ???????? ?? ??????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/digesting-system">
                    ?????????????????????????????? ??????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/health/diabetes">
                    ????????????
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faSpa} />
                      <span style={{ marginLeft: "0.5rem" }}>??????????????</span>
                    </span>
                  }
                  id="collasible-nav-dropdown"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <NavDropdown.Item href="/products/beauty/deodorants">
                    ??????????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/cosmetics">
                    ???????????????????? ??????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/hair">
                    ???????????????? ???? ????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/face">
                    ???????????????? ???? ????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/men">
                    ???????????????? ???? ????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/body">
                    ???????????????? ???? ????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/lips">
                    ???????????????? ???? ??????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/soap">
                    ????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/beauty/sunbathing">
                    ?????????????????????????? ????????????????
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faBaby} />
                      <span style={{ marginLeft: "0.5rem" }}>?????????? ?? ????????</span>
                    </span>
                  }
                  id="collasible-nav-dropdown"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <NavDropdown.Item href="/products/mother-and-child/aspirators">
                    ????????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/baby">
                    ????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/pumps">
                    ?????????? ???? ??????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/food">
                    ??????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/tampons">
                    ??????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/pands">
                    ??????????????????
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/products/mother-and-child/diapers">
                    ???????????? ?? ????????????????
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/locations">
                  <span>
                    <FontAwesomeIcon icon={faMapMarkedAlt} />
                    <span style={{ marginLeft: "0.5rem" }}>??????????????</span>
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
                    placeholder="??????????????"
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
                          ???????? ????????????
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
                          ??????????
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
                      ????????
                    </Nav.Link>
                    <Nav.Link href="#pricing" onClick={handleShowRegister}>
                      ??????????????????????
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
