import { useEffect } from 'react';
import { useState } from 'react';
import { SpinnerLoading } from '../SpinnerLoading';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const unitCurrency = Intl.NumberFormat('en-US');
  const [totalValueCart, setTotalValueCart] = useState(0);
  const [ownerCartId, setOwnerCartId] = useState(0);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/cart/${localStorage.getItem('userId')}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUser(response.data.user);
      setOwnerCartId(response.data.user.id);
      setCart(response.data.listCartItem);
      let tmpValue = 0;
      response.data.listCartItem.forEach((item) => {
        tmpValue += item.book.price;
      });
      setTotalValueCart(tmpValue);
    } catch (error) {
      console.log(error);
    }
  };

  const submitOrder = (values) => {
    const listOrder = [];
    cart.forEach((item, index) => {
      const orderItem = {
        book: item.book,
        quantity: document.querySelector(`#quantityItem${index}`).value,
        status: 'pending',
      };
      listOrder.push(orderItem);
    });
    const data = {
      address: values.address,
      phoneNumber: values.phoneNumber,
      fullNameUserOrder: values.fullNameUserOrder,
      dateOrder: new Date()
        .toISOString() // dạng chuoix 2023-05-30T10:30:00.000Z
        .substring(0, 10)
        .split('-')
        .reverse()
        .join('/'),
      user: user,
      listOderItem: listOrder,
    };
    axios
      .post(`http://localhost:8082/api/v1/order/create`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        axios
          .delete(
            `http://localhost:8082/api/v1/cart/${ownerCartId}/deleteAllItem`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then(() => {
            cart.forEach((item) => {
              localStorage.removeItem(`book ${item.book.id}`);
            });
            alert(t("order_success"));
            navigate('/historyOrder');
          })
          .catch(() => {
            alert(t("order_not_success"));
          });
      })
      .catch(() => {
        alert('Địa chỉ sai, vui long nhập lại!!!');
      });
  };

  useEffect(() => {
    getCartData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <article className='p-3' style={{ backgroundColor:'hsl(19, 100%, 96%)'}}>
      <div
        className='container p-4'
        style={{
          boxShadow: '0.5px 0.5px 2px 1px',
          backgroundColor: 'white',
          borderRadius: '0.625rem',
          marginTop: '40px'
        }}
      >
        <div className='row'>
          <div className='col-12'>
            <div className='table-responsive mb-5'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'> </th>
                    <th scope='col'>{t("name_book")}</th>
                    <th scope='col'>{t("typeBook")}</th>
                    <th scope='col' className='text-center'>
                      {t("number")}
                    </th>
                    <th scope='col' className='text-right'>
                      {t("price")}
                    </th>
                    <th scope='col' className='text-right'>
                      <button
                        className='btn btn-outline-danger'
                        onClick={() => {
                          axios
                            .delete(
                              `http://localhost:8082/api/v1/cart/${ownerCartId}/deleteAllItem`,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    'token'
                                  )}`,
                                },
                              }
                            )
                            .then(() => {
                              cart.forEach((item) => {
                                localStorage.removeItem(`book ${item.book.id}`);
                              });
                              setCart([]);
                              setTotalValueCart(0);
                            })
                            .catch(() => {
                              alert('Đã xảy ra sự cố');
                            });

                          cart.forEach((item) => {
                            console.log(item.book.id);
                          });
                        }}
                      >
                        {t("clear_all")}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={`http://localhost:8082/images/${cartItem.book.bookImages[0].name}`}
                          alt=''
                          width='120px'
                          height='150px'
                        />{' '}
                      </td>
                      <td>{cartItem.book.title}</td>
                      <td>{cartItem.book.typeBook}</td>
                      <td>
                        <input
                          className='form-control'
                          id={`quantityItem${index}`}
                          type='number'
                          min={1}
                          defaultValue={1}
                          onChange={() => {
                            const quantity = document.querySelector(
                              `#quantityItem${index}`
                            ).value;
                            document.querySelector(
                              `#cart${index}`
                            ).innerText = `${unitCurrency.format(
                              cartItem.book.price * quantity
                            )} VND`;
                            let totalValue = 0;
                            cart.forEach((item, index) => {
                              totalValue +=
                                item.book.price *
                                +document.querySelector(`#quantityItem${index}`)
                                  .value;
                            });
                            setTotalValueCart(totalValue);
                          }}
                        />
                      </td>
                      <td className='text-right' id={`cart${index}`}>
                        {unitCurrency.format(cartItem.book.price)} VND
                      </td>
                      <td
                        className='text-center'
                        style={{ }}
                      >
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:8082/api/v1/cart/${ownerCartId}/deleteItem/${cartItem.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      'token'
                                    )}`,
                                  },
                                }
                              )
                              .then((res) => {
                                localStorage.removeItem(
                                  `book ${cartItem.book.id}`
                                );
                                const tmpCart = cart.filter(
                                  (item) => item.id !== cartItem.id
                                );
                                let tmpVal = 0;
                                tmpCart.forEach((item, index) => {
                                  tmpVal +=
                                    item.book.price *
                                    +document.querySelector(
                                      `#quantityItem${index}`
                                    ).value;
                                });
                                setTotalValueCart(tmpVal);
                                setCart(tmpCart);
                              })
                              .catch(() => {
                                alert('something went wrong');
                              });
                          }}
                        >
                          <box-icon name='trash'></box-icon>{' '}
                        </button>{' '}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <strong>{t("total_order")}:</strong>
                    </td>
                    <td className='text-right'>
                      <strong id='totalValue'>
                        {unitCurrency.format(totalValueCart)} VND
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='container d-flex align-items-center justify-content-center'>
            <form
              className='w-75 p-2 mb-5'
              style={{
                boxShadow: '0.5px 0.5px 2px 1px',
                backgroundColor: '#F5F5F5',
                borderRadius: '0.625rem',
              }}
              onSubmit={handleSubmit(submitOrder)}
            >
              <h3 className='text-center'>{t("information_user")}</h3>
              <div className='form-group'>
                <label htmlFor='fullName'>{t("name_user_order")}</label>
                <input
                  type='text'
                  className='form-control'
                  id='fullName'
                  {...register('fullNameUserOrder', {
                    required: t("error_name_user"),
                  })}
                />
                <small style={{ color: 'red' }}>
                  {errors.fullNameUserOrder?.message}
                </small>
              </div>

              <div className='form-group'>
                <label htmlFor='address'>{t("address")}</label>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  {...register('address', {
                    required: t("error_address"),
                  })}
                />
                <small style={{ color: 'red' }}>
                  {errors.address?.message}
                </small>
              </div>

              <div className='form-group'>
                <label htmlFor='phoneNumber'>{t("number_phone")}</label>
                <input
                  type='text'
                  className='form-control'
                  id='phoneNumber'
                  {...register('phoneNumber', {
                    required: t("error_number_phone1"),
                    pattern: {
                      value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                      message: t("error_number_phone2"),
                    },
                  })}
                />
                <small style={{ color: 'red' }}>
                  {errors.phoneNumber?.message}
                </small>
              </div>

              <div className='col mb-2' style={{padding: '30px'}}>
                <div className='row'>
                  <div className='col-sm-12 col-md-6'>
                    <Link to='/' className='btn btn-block btn-outline-info'>
                      {t("continue")}
                    </Link>
                  </div>
                  <div className='col-sm-12 col-md-6 text-right'>
                    <button
                      className='btn btn-block btn-outline-success text-uppercase'
                      disabled={cart.length === 0 ? true : false}
                      type='submit'
                    >
                      {t("order")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
