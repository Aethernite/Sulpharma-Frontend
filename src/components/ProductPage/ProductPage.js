import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Dropdown, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "../../state/reducers/productReducer";
import Product from "../Product/Product";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const HEADER_CATEGORY_MAP = new Map();
HEADER_CATEGORY_MAP.set("health", "Здраве");
HEADER_CATEGORY_MAP.set("beauty", "Красота");
HEADER_CATEGORY_MAP.set("mother-and-child", "Майка и дете");

const HEADER_SUBCATEGORY_MAP = new Map();
HEADER_SUBCATEGORY_MAP.set("alergy", "Алергия");
HEADER_SUBCATEGORY_MAP.set("veins", "Вени, съдове, хемороиди");
HEADER_SUBCATEGORY_MAP.set("fungus", "Гъбички");
HEADER_SUBCATEGORY_MAP.set("diabetes", "Диабет");
HEADER_SUBCATEGORY_MAP.set("diet", "Диета");
HEADER_SUBCATEGORY_MAP.set("detox", "Зависимости и детокс");
HEADER_SUBCATEGORY_MAP.set("immunity", "Имунитет");
HEADER_SUBCATEGORY_MAP.set("intimacy", "Интимно здраве ");
HEADER_SUBCATEGORY_MAP.set("cough", "Кашлица");
HEADER_SUBCATEGORY_MAP.set("pain", "Лекарства срещу болка");
HEADER_SUBCATEGORY_MAP.set("flu", "Настинка");
HEADER_SUBCATEGORY_MAP.set("nerve-system", "Нервна система");
HEADER_SUBCATEGORY_MAP.set("bones", "Стави и кости");
HEADER_SUBCATEGORY_MAP.set("fever", "Температура");
HEADER_SUBCATEGORY_MAP.set("ears-nose-throat", "Уши, нос, гърло");
HEADER_SUBCATEGORY_MAP.set("digest", "Храносмилателна система");

HEADER_SUBCATEGORY_MAP.set("deodorants", "Дезодоранти");
HEADER_SUBCATEGORY_MAP.set("baby", "Биберони");
HEADER_SUBCATEGORY_MAP.set("cosmetics", "Козметични комплекти");
HEADER_SUBCATEGORY_MAP.set("face", "Продукти за лице");
HEADER_SUBCATEGORY_MAP.set("men", "Продукти за мъже");
HEADER_SUBCATEGORY_MAP.set("body", "Продукти за тяло");
HEADER_SUBCATEGORY_MAP.set("lips", "Продукти за устни");
HEADER_SUBCATEGORY_MAP.set("hair", "Продукти за коса");
HEADER_SUBCATEGORY_MAP.set("soap", "Сапуни");
HEADER_SUBCATEGORY_MAP.set("sunbathing", "Слънцезащитни продукти");

HEADER_SUBCATEGORY_MAP.set("aspirators", "Аспиратори");
HEADER_SUBCATEGORY_MAP.set("pumps", "Помпи за кърма");
HEADER_SUBCATEGORY_MAP.set("food", "Храна");
HEADER_SUBCATEGORY_MAP.set("tampons", "Тампони");
HEADER_SUBCATEGORY_MAP.set("pads", "Дамски превръзки");
HEADER_SUBCATEGORY_MAP.set("diapers", "Пелени и памперси");

const HoverableIcon = styled(FontAwesomeIcon)`
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;

const ProductPage = () => {
  const products = useSelector((state) => state.products.products);
  const page = useSelector((state) => state.products.pageable);
  const isLoading = useSelector((state) => state.products.isLoading);

  const [sortOption, setSortOption] = useState("Наименование");
  //True = ASC, False = DESC
  const { category, subcategory, query } = useParams();
  const [sortOrder, setSortOrder] = useState(true);
  const dispatch = useDispatch();

  const handleSortOption = (sortOption) => {
    dispatch(
      fetchProducts({
        cursor: 0,
        category: category?.toUpperCase(),
        subcategory: subcategory?.toUpperCase(),
        query,
        sort: sortOption === "Наименование" ? "description" : "price",
        order: sortOrder ? "ASC" : "DESC",
      })
    );
    setSortOption(sortOption);
  };

  const handleSortOrder = () => {
    dispatch(
      fetchProducts({
        cursor: 0,
        category: category?.toUpperCase(),
        subcategory: subcategory?.toUpperCase(),
        query,
        sort: sortOption === "Наименование" ? "description" : "price",
        order: !sortOrder ? "ASC" : "DESC",
      })
    );
    setSortOrder(!sortOrder);
  };

  const handlePageChange = (e) => {
    dispatch(
      fetchProducts({
        cursor: e.selected,
        category: category?.toUpperCase(),
        subcategory: subcategory?.toUpperCase(),
        query,
        sort: sortOption === "Наименование" ? "description" : "price",
        order: sortOrder ? "ASC" : "DESC",
      })
    );
  };

  React.useEffect(() => {
    dispatch(
      fetchProducts({
        cursor: 0,
        category: category?.toUpperCase(),
        subcategory: subcategory?.toUpperCase(),
        query,
        sort: sortOption === "Наименование" ? "description" : "price",
        order: sortOrder ? "ASC" : "DESC",
      })
    );
  }, [dispatch, category, subcategory, query, sortOrder, sortOption]);

  return (
    <>
      <Container className="d-block justify-content-center">
        <h1 className="d-flex justify-content-left w-100 pt-1 pb-1">
          {subcategory == null
            ? HEADER_CATEGORY_MAP.get(category)
            : HEADER_SUBCATEGORY_MAP.get(subcategory)}
        </h1>
        <Container className="d-flex justify-content-left bg-dark align-items-center">
          <span className="d-flex justify-content-center sort-option align-center text-light">
            Сортирай по:
          </span>
          <Dropdown style={{ marginLeft: "1rem" }}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {sortOption}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortOption("Цена")}>
                Цена
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortOption("Наименование")}>
                Наименование
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <HoverableIcon
            icon={sortOrder ? faLongArrowAltUp : faLongArrowAltDown}
            onClick={() => handleSortOrder()}
            className="text-light"
          />
        </Container>
        <Container className="w-100">
          {products?.length > 0 && (
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "1rem" }}
            >
              <ReactPaginate
                pageCount={page.totalPages}
                pageRangeDisplayed={page.totalPages}
                marginPagesDisplayed={0}
                forcePage={page.pageable.pageNumber}
                onPageChange={(e) => handlePageChange(e)}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              ></ReactPaginate>
            </div>
          )}
          {products?.length > 0 && !isLoading && (
            <>
              <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4 align-items-stretch">
                {products.map((product) => (
                  <Col key={product.id} className="d-flex">
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
          {isLoading && (
            <div className="w-100 d-flex justify-content-center">
              <Spinner
                animation="border"
                variant="primary"
                className="justify-content-center m-5"
                style={{ width: "5rem", height: "5rem" }}
              />
            </div>
          )}
          {products?.length === 0 && !isLoading && (
            <h1
              className="d-flex justify-content-center w-100"
              style={{ padding: "5rem" }}
            >
              {category ? "Няма намерени продукти в тази категория." : "Няма намерени продукти."}
            </h1>
          )}
        </Container>
      </Container>
    </>
  );
};

export default ProductPage;
