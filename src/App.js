import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavbarComponent } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import { checkSession } from './state/reducers/authReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';


const App = () => {
 
  const isSessionChecked = useSelector(state => state.auth.isSessionChecked);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(checkSession());
    }, [dispatch]);

    if (!isSessionChecked) {
        return null;
    }

  return (
    <Router>
      <NavbarComponent />
      <AppRoutes />
      <Footer/>
    </Router>

  )
}

export default App