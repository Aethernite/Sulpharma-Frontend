import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import carousel1 from '../../assets/carousel-1.jpg';
import carousel2 from '../../assets/carousel-2.jpg';

const CarouselComponent = () => {
    return (
        <div className="d-flex justify-content-center">
        <Carousel>
        <Carousel.Item>
          <Image fluid rounded
            src={carousel1}
            alt="First slide"
            className="d-block mx-auto"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image fluid
            src={carousel2}
            alt="First slide"
            className="d-block mx-auto"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
      );
      
    }
    
export default CarouselComponent