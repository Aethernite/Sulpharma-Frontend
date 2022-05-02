import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Promotion = ({promotion}) => {
  const history = useHistory();

  const handlePromotionClick = () => {
        history.push("/products/search/" + promotion.name.toLowerCase())
  }

    return (
       <Image src={promotion.imageUrl} className="hoverable" onClick={handlePromotionClick} fluid/>
      );
    }
    
export default Promotion