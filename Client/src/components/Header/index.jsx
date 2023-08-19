import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { SpinnerLoading } from '../SpinnerLoading/index';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const {t,i18n} = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.clear();
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  function handleLanguageChange(event){
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  }
  
  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!localStorage.getItem('token')) {
    return (
      <header>
      
        <nav
          className='navbar fixed-top navbar-expand-lg navbar-dark p-md-3'
          style={{ backgroundColor: '#000' }}
        >
        
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            {t('nav')}
          </Link>
          <button
            type='button'
            className='navbar-toggler'
            data-bs-target="#navbarNav"
            data-bs-toggle="collapse"
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle Navbar'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <div className='mx-auto'></div>
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                  <Link className='nav-link text-white' to='/'>
                    {t("home")} <span className='sr-only'>(current)</span>
                  </Link>
                </li>
                <li className='nav-item text-white'>
                  <Link className='nav-link' to='login'>
                    {t("login")}
                  </Link>
                </li>
                <li className='nav-item text-white'>
                  <Link className='nav-link' to='signup'>
                    {t("signup")}
                  </Link>
                </li>
              </ul>
          </div>
        </div>
        <div className='d-flex justify-content-end'>
        <select value={i18n.language} onChange={handleLanguageChange} class="form-select form-select-sm" aria-label=".form-select-sm example" style={{width: '110px', height:'35px'}}>
          <option selected value="vi">Tiếng Việt</option>
          <option value="en" >English</option>
        </select>
        </div>
        </nav>
        <div style={{height:'50px',backgroundColor:'hsl(19, 100%, 96%)'}}></div>
      </header>
      
    );
  }

  return (
    <header>
        <nav
          className='navbar fixed-top navbar-expand-lg navbar-dark p-md-3'
          style={{ backgroundColor: '#000' }}
        >
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            {t("nav")}
          </Link>
          <button
            type='button'
            className='navbar-toggler'
            data-bs-target="#navbarNav"
            data-bs-toggle="collapse"
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle Navbar'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
          <div className='mx-auto'></div>
          <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <Link className='nav-link text-white' to='/'>
                  {t("home")}<span className='sr-only'>(current)</span>
                </Link>
              </li>
              <li className='nav-item active'>
                {localStorage.getItem('role')==='ROLE_ADMIN'? (
                  <Link className='nav-link text-white' to='manageBook'>
                    {t("product_management")}
                  </Link>
                ):(
                  <Link className='nav-link text-white' to='historyOrder'>
                    {t("order_history")}
                  </Link>
                )}
                
              </li>
              {localStorage.getItem('role') === 'ROLE_ADMIN' && (
              <li className='nav-item active'>
                <Link className='nav-link text-white' to='manageOrder'>
                  {t("order_management")}
                </Link>
              </li>
              )}
              <li className='nav-item text-white'>
                <Link className='nav-link' to='/' onClick={handleLogout}>
                  {t("logout")}
                </Link>
              </li>
            </ul>
            <div className='mx-3'></div>
            {localStorage.getItem('role') === 'ROLE_ADMIN'?(
              ""
              ):(
              <Link
                className='btn btn-md ml-3'
                style={{ backgroundColor: '#CFFDE1', color: '#434242' }}
                to='/cart'
              >
              <AiOutlineShoppingCart />{' '}
                <span className='font-weight-bold'>{t("cart")}</span>
              </Link>
              )}

          </div>
        </div>
        <div className='d-flex justify-content-end'>
        <select value={i18n.language} onChange={handleLanguageChange} class="form-select form-select-sm" aria-label=".form-select-sm example" style={{width: '110px', height:'35px'}}>
          <option selected value="vi">Tiếng Việt</option>
          <option value="en" >English</option>
        </select>
        </div>
        </nav>
        <div style={{height:'50px',backgroundColor:'hsl(19, 100%, 96%)'}}></div>
      </header>
  );
};

export default Header;
