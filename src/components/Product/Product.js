import React from "react";
import { useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@material-ui/lab";
import styled from "styled-components";
import { addToCart } from "../../state/reducers/cartReducer";
import "../../responsive-text.scss";

const PriceTag = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  font-family: Roboto, sans-serif;
`;

const Description = styled.span`
  font-family: Roboto, sans-serif;
`;

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Card className="styled-card w-100">
       
       
        <Card.Img variant="top" src={product.imageUrl}/>
     

        <Card.Body style={{ width: "100%", height: "6rem" }}>
          <Card.Title>
            <PriceTag className={product.promoted ? "text-decoration-line-through" : ""}>{product.price} лв.</PriceTag>
            {product.promoted && 
            <PriceTag style={{color: "red", marginLeft: "1rem"}}>{product.promotionPrice} лв.</PriceTag>
            }
          </Card.Title>
          <Card.Text className="m-0">
            <Description className="styled-description h-100">{product.description}</Description>
          </Card.Text>
        </Card.Body>
        <Card.Body className="w-100">
          <div>
          <div className="d-flex justify-content-center">
            <Rating
              name="hover-feedback"
              value={product.rating}
              precision={1}
              style={{ paddingTop: "1.2rem", paddingBottom: "1rem", marginTop: "2rem" }}
            />
          </div>

          <Button
            variant="primary"
            className="d-block w-100"
            onClick={() => dispatch(addToCart({ product }))}
          >
            <FontAwesomeIcon icon={faCartArrowDown} />
            <span
              style={{ fontFamily: "Roboto, sans-serif", marginLeft: "1rem" }}
            >
              Добави в кошницата
            </span>
          </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
