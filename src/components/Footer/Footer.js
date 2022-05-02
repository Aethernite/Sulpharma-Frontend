import React from "react";
import logo from "../../assets/logo.png";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";

const Footer = () => (
  <footer className="text-center text-lg-start bg-light text-muted mt-3">
    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
    <section className="">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fas fa-gem me-3"></i>
              <Image src={logo} width="160px" height="41px" />
            </h6>
            <p>
              Сулфарма е българска онлайн аптека съдържаща не само лекарства, но
              и козметика. Поръчайте днес и ще получите обаждане възможно
              най-скоро за вашата доставка!
            </p>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Категории</h6>
            <p>
              <a href="/products/health" className="text-reset">
                Здраве
              </a>
            </p>
            <p>
              <a href="/products/beauty" className="text-reset">
                Козметика
              </a>
            </p>
            <p>
              <a href="/products/mother-and-child" className="text-reset">
                Майка и дете
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Контакти</h6>
            <p>
              <FontAwesomeIcon icon={faHome} /> България, град София, ж.к
              Младост 2
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> sulpharma@domain.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +359 888 88 8888
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +359 888 88 8889
            </p>
          </div>
        </div>
      </div>
    </section>
    <div
      className="text-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      © 2021 Copyright:
      <a className="text-reset fw-bold" href="/">
        sulpharma.com
      </a>
    </div>
  </footer>
);

export default Footer;
