import { Link } from 'react-router-dom';
import {
  AiOutlineMail,
  AiFillPhone,
  AiFillFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const {t} = useTranslation();
  return (
    <footer
      className='page-footer font-small blue pt-4'
      style={{ backgroundColor: '#393E46', color: '#F3EFE0' }}
    >
      <div className='container-fluid text-center text-md-left'>
        <div className='row'>
          <div className='col-md-3 mt-md-0 mt-3'>
            <h5 className='text-uppercase'>{t("office")}</h5>
            <p>131 Nguyen Van Troi, Mo Lao, Ha Dong, Ha Noi</p>
            <p>Nguyen Trai, Ha Dong, Ha Noi</p>
          </div>

          <div className='col-md-3 mb-md-0 mb-3'>
            <h5 className='text-uppercase'>{t("product")}</h5>

            <ul className='list-unstyled'>
              <li>
                <p>DATA</p>
                <p>DepOps</p>
                <p>Programming Language</p>
                <p>Machine Learning</p>
              </li>
            </ul>
          </div>

          <div className='col-md-3 mb-md-0 mb-3'>
            <h5 className='text-uppercase'>{t("contact")}</h5>

            <ul className='list-unstyled'>
              <li>
                <AiOutlineMail className='pt-1' />
                <p className='d-inline ml-3'>info@gmail.com</p>
              </li>
              <li>
                <AiFillPhone className='pt-1' />
                <p className='d-inline ml-3'>+01 2345 6789</p>
              </li>
              <li>
                <AiFillFacebook className='pt-1' />
                <Link
                  to='https://www.facebook.com/'
                  className='d-inline ml-3'
                  style={{ color: '#F3EFE0' }}
                >
                  Facebook
                </Link>
              </li>
              <li>
                <AiOutlineTwitter className='pt-1' />
                <Link
                  to='https://twitter.com/'
                  className='d-inline ml-3'
                  style={{ color: '#F3EFE0' }}
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>

          <div className='col-md-3 mt-md-0 mt-3'>
            <h5 className='text-uppercase'>{t("footer1")}</h5>
            <p>{t("footer2")}</p>
            <p>{t("footer3")}</p>
            <p>{t("footer4")}</p>
          </div>
        </div>
      </div>

      <div className='footer-copyright text-center py-3'>
        © 2023 Copyright: TrucThanh
      </div>
    </footer>
  );
};

export default Footer;
