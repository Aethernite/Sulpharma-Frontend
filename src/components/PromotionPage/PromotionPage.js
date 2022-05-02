import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Promotion from '../Promotion/Promotion'

const PromotionPage = ({promotions}) => {
    return (
        <>
         <Container className="d-block justify-content-center">
         <h1 className="d-flex justify-content-center w-100 pt-1 pb-1" id="promotion-section">Специални предложения</h1>
             <Row xs={1} sm={1} md={1} lg={2} className="d-flex justify-content-center g-2">
        {promotions.map((promotion) => (
          <Col key={promotion.id} className="d-flex justify-content-center">
              <Promotion promotion={promotion} style={{marginTop:"1rem"}}/>
          </Col>
        ))
        }
        </Row>
        </Container>
        </>
      );
      
    }
    
export default PromotionPage