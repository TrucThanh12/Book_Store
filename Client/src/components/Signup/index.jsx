import { useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SpinnerLoading } from '../SpinnerLoading/index';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendDataSignup = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/auth/signup',
        data
      );
      alert(response.data.message);
      reset();
      navigate('/login');
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const onSubmit = (values) => {
    setIsLoading(true);
    sendDataSignup(values);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

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
      
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1 justify-content-center align-items-center'>
              <form>
                <h1 className='text-center'>{t("signup")}</h1>
                <div className='form-outline flex-fill mb-0'>
                  <label className='form-label' htmlFor='firstName'
                  style={{paddingTop:'20px'}}>
                    {t("first_name")}
                  </label>
                  <input type='text' id='firstName'
                    className='form-control form-control-lg'
                    {...register('firstName', {
                      required: t("error_name_user"),
                    })}
                  />
                  <small style={{ color: 'red' }}>
                    {errors.firstName?.message}
                  </small>
                </div>

                <div className='form-outline flex-fill mb-0'>
                  <label className='form-label' htmlFor='lastName'
                  style={{paddingTop:'20px'}}>
                    {t("last_name")}
                  </label>
                  <input type='text' id='lastName' className='form-control form-control-lg'
                    {...register('lastName', {
                      required: t("error_name_user"),
                    })}
                  />
                  <small style={{ color: 'red' }}>
                    {errors.lastName?.message}
                  </small>
                </div>
                
                <div className='form-outline flex-fill mb-0'>
                  <label className='form-label' htmlFor='email'
                  style={{paddingTop:'20px'}}>
                    Email
                  </label>
                  <input type='email' id='email' className='form-control form-control-lg'
                    {...register('email', {
                      required: t("error_email1"),
                        pattern: {
                          value:
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        essage: t("error_email2"),
                        },
                    })}
                  />
                    <small style={{ color: 'red' }}>
                      {errors.email?.message}
                    </small>
                </div>

                <div className='form-outline flex-fill mb-0'>
                  <label className='form-label' htmlFor='password'
                  style={{paddingTop:'20px'}}>
                    {t("password")}
                  </label>
                  <input type='password' id='password' className='form-control form-control-lg'
                    {...register('password', {
                      required: t("error_password"),
                      minLength: {
                        value: 6,
                        message: t("error_password2"),
                      },
                    })}
                  />
                  <small style={{ color: 'red' }}>
                    {errors.password?.message}
                  </small>
                </div>


                <div className='text-center text-lg-start mt-4 pt-2 justify-content-center align-items-center d-flex'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-lg '
                    style={{borderBlockColor:'rgb(239, 127, 86)',backgroundColor:'rgb(239, 127, 86)', color:'black', paddingLeft: '2.5rem', paddingRight: '2.5rem',boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)'}}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {t("signup")}
                  </button>
                </div>

              </form>
            </div>
        </div>
      </div>
    </div>
    </article>
    
  );
};

export default Signup;
