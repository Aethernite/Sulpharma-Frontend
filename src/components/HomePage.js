import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CarouselComponent } from './';
import 'bootstrap/dist/css/bootstrap.min.css';
import PromotionPage from './PromotionPage/PromotionPage';
import { fetchPromotions } from '../state/reducers/promotionReducer';
import { Spinner } from 'react-bootstrap';

const HomePage = () => {
  const promotions = useSelector(state => state.promotions.promotions);
  const isLoading = useSelector(state => state.products.isLoading);

  const dispatch = useDispatch();

  React.useEffect(() => {
        dispatch(fetchPromotions());
  }, [dispatch])

    return (
        <div style={{marginTop: "5rem"}}>
           <CarouselComponent/>
           {isLoading && <Spinner animation="border" variant="primary" />}
           {!isLoading && <PromotionPage promotions={promotions}/>}
        </div>
    )
}

export default HomePage