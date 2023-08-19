import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SpinnerLoading } from '../SpinnerLoading/index';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const Login = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendDataLogin = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/auth/login',
        data
      );

      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('role', response.data.roles[0]);
      localStorage.setItem(
        'userName',
        `${response.data.firstName} ${response.data.lastName}`
      );
      localStorage.setItem('token', response.data.token);
      if (response.data.roles[0] !== 'ROLE_ADMIN') {
        axios
          .get(`http://localhost:8082/api/v1/cart/${response.data.id}`, {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          })
          .then((res) => {
            res.data.listCartItem.forEach((item) =>
              localStorage.setItem(`book ${item.book.id}`, 'added')
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
      reset();
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      alert(t("error_login"));
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const onSubmit = (values) => {
    setIsLoading(true);
    sendDataLogin(values);
  };

  return (
    <article style={{height:'100vh', backgroundImage: 'url("https://cdn.dribbble.com/users/427857/screenshots/13993146/media/381b818838a57f819ea4afe3cc0320a7.png?compress=1&resize=1000x750&vertical=center")'}}>
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-10 col-xl-9 card flex-row mx-auto"
          style={{backgroundColor:'rgba(255, 255, 255,0.5)',marginTop: '100px', borderRadius:'30px',boxShadow:'0 8px 20px hsla(19, 64%, 4%, .5)'}}>
            <div class="img-left d-none d-md-flex">
            <img
                src='https://cdn.dribbble.com/users/427857/screenshots/13993146/media/381b818838a57f819ea4afe3cc0320a7.png?compress=1&resize=1000x750&vertical=center'
                className='img-fluid center'
                alt='sample'
                style={{width:'100%', borderRadius:'20px',boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)'}}
              />
            </div>

            <div className='col-md-8 col-lg-8 col-xl-5 offset-xl-1 justify-content-center align-items-center'>
              <form>
                <h1 className='text-center'>{t("login")}</h1>
                <div className='form-outline mb-4'>
                  <label className='form-label' htmlFor='emailInput'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='emailInput'
                    className='form-control form-control-lg'
                    {...register('email', {
                      required: t("error_email1"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("error_email2"),
                      },
                    })}
                  />
                  <small style={{ color: 'red' }}>
                    {errors.email?.message}
                  </small>
                </div>

                <div className='form-outline mb-3'>
                  <label className='form-label' htmlFor='passwordInput'>
                    {t("password")}
                  </label>
                  <input
                    type='password'
                    id='passwordInput'
                    className='form-control form-control-lg'
                    {...register('password', {
                      required: t("error_password"),
                    })}
                  />
                  <small style={{ color: 'red' }}>
                    {errors.password?.message}
                  </small>
                </div>

                <div className='text-center text-lg-start mt-4 pt-2'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-lg'
                    style={{borderBlockColor:'rgb(239, 127, 86)',backgroundColor:'rgb(239, 127, 86)', color:'black', paddingLeft: '2.5rem', paddingRight: '2.5rem',boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)' }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {t("login")}
                  </button>
                  <p className='fw-bold mt-2 pt-1 mb-4'>
                    {t("check_user")}{' '}
                    <Link to='/signup' className='link-danger'>
                      {t("signup")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
    </article>
  );
};

export default Login;
