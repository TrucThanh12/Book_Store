import { Outlet } from 'react-router-dom';
import Header from './Header/index';
import Footer from './Footer/index';

const SharedLayOut = () => {
  return (
    <>
      <Header />
      
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayOut;
