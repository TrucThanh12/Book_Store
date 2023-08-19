import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { SpinnerLoading } from '../SpinnerLoading/index';
import { useTranslation } from 'react-i18next';
import Forbidden from '../Forbidden';

let allOrderOrigin;
const ManageOrder = () => {
  const {t} = useTranslation();
  const [allOrder, setAllOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const unitCurrency = Intl.NumberFormat('en-US');

  const getDataOrder = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/v1/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAllOrder(response.data);
      allOrderOrigin = response.data;
    } catch (error) {}
  };

  const handleCancelOrder = (e) => {
    axios
      .get(`http://localhost:8082/api/v1/order/cancel/${e.target.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert(t("cancel_order_success"));
        window.location.reload();
      })
      .catch(() => {
        alert(t("cancel_not_order"));
      });
  };

  const handleConfirmOrder = (e) => {
    axios
      .get(`http://localhost:8082/api/v1/order/confirm/${e.target.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert(t("confirm_order_success"));
        window.location.reload();
      })
      .catch(() => {
        alert(t("confirm_order_not"));
      });
  };

  useEffect(() => {
    getDataOrder();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if(localStorage.getItem('role')==='ROLE_USER'){
    return(
      <div>
        <Forbidden/>
      </div>
    )
  }
  return (
    <article className='mb-3' style={{backgroundColor:'hsl(19, 100%, 96%)', paddingTop: '50px'}}>
      <h1 className='text-center' style={{ color: '#344D67' }}>
        {t("order_management")}
      </h1>
      <div className='p-5 mb-5'>
        <form className='form-row'>
          <div className='form-group'>
            
          <select
              id='statusOrder'
              className='form-control'
              onChange={(e) => {
                const statusFilter = e.target.value;

                if (statusFilter !== 'All Order') {
                  const tmpArrOrder = allOrderOrigin.filter(
                    (order) =>
                      order.listOderItem[0].status.toLowerCase() ===
                      statusFilter.toLowerCase()
                  );
                  setAllOrder(tmpArrOrder);
                } else {
                  setAllOrder(allOrderOrigin);
                }
              }}
            >
              <option defaultValue>All Order</option>
              <option>pending</option>
              <option>Confirm</option>
              <option>Cancel</option>
            </select>
          </div>
        </form>
      </div>
      <div className='container' style={{borderRadius: '10px' }}>
        {allOrder.map((orderItem) => (
          <div
            className='row p-4 mb-5'
            style={{ boxShadow: '0.5px 0.5px 2px 1px',backgroundColor:'hsl(30, 100%, 96%)' }}
          >
            <div className='col-6 mb-3'>
              <p className='font-weight-bold'>
                {t("date_order")}: {orderItem.dateOrder}
              </p>
            </div>
            <div className='col-6'>
              <p className='font-weight-bold text-right'>
                Email: {orderItem.user.email}
              </p>
            </div>

            {orderItem.listOderItem.map((order, index) => (
              <div className='container'>
                <div className='row mb-2'>
                  <div className='col-3'>
                    <p
                      style={{
                        marginBottom: '2px',
                        textTransform: 'capitalize',
                        color: '#2B3A55',
                      }}
                    >
                      <span className='font-weight-bold'>{t("name_book")}:</span>{' '}
                      {order.book.title}
                    </p>
                    <p
                      style={{
                        marginBottom: '2px',
                        textTransform: 'capitalize',
                        color: '#344D67',
                      }}
                    >
                      <span className='font-weight-bold'>{t("author")}:</span>{' '}
                      {order.book.author}
                    </p>
                    <p
                      style={{
                        marginBottom: '2px',
                        textTransform: 'capitalize',
                        color: '#344D67',
                      }}
                    >
                      <span className='font-weight-bold'>{t("typeBook")}:</span>{' '}
                      {order.book.typeBook}
                    </p>
                  </div>
                  <div className='col-3'>
                    <p
                      style={{
                        marginBottom: '2px',
                        textTransform: 'capitalize',
                        color: '#344D67',
                      }}
                    >
                      <span className='font-weight-bold'>{t("number")}:</span>{' '}
                      {order.quantity}
                    </p>
                    <p
                      style={{
                        marginBottom: '2px',
                        textTransform: 'capitalize',
                        color: '#344D67',
                      }}
                    >
                      <span className='font-weight-bold'>{t("total_money")}:</span>{' '}
                      {unitCurrency.format(order.book.price * order.quantity)}{' '}
                      VND
                    </p>
                  </div>
                </div>
                {index === orderItem.listOderItem.length - 1 || <hr />}
              </div>
            ))}

            <div className='container'>
              <hr style={{ borderTop: '3px dashed #393E46' }} />
              <div className='row mt-2'>
                <div className='col-6'>
                  <p
                    style={{
                      marginBottom: '2px',
                      textTransform: 'capitalize',
                      color: '#344D67',
                    }}
                  >
                    <span className='font-weight-bold font-italic'>
                     {t("address")}:
                    </span>{' '}
                    {orderItem.address}
                  </p>
                  <p
                    style={{
                      marginBottom: '2px',
                      textTransform: 'capitalize',
                      color: '#344D67',
                    }}
                  >
                    <span className='font-weight-bold font-italic'>
                      {t("number_phone")}:
                    </span>{' '}
                    {orderItem.phoneNumber}
                  </p>
                  <p
                    style={{
                      marginBottom: '2px',
                      textTransform: 'capitalize',
                      color: '#344D67',
                    }}
                  >
                    <span className='font-weight-bold font-italic'>
                      {t("name_user_order")}:
                    </span>{' '}
                    {orderItem.fullNameUserOrder}
                  </p>
                </div>
                <div>
                  <h5 style={{ textTransform: 'capitalize' }}>
                    {t("total_order")}:{' '}
                    <span style={{ color: '#1D1CE5' }}>
                      {unitCurrency.format(
                        orderItem.listOderItem
                          .map(
                            (order, index) => order.quantity * order.book.price
                          )
                          .reduce((acc, current) => acc + current)
                      )}{' '}
                      VND
                    </span>
                  </h5>
                  <h5 style={{ textTransform: 'capitalize' }}>
                    {t("status_order")}:{' '}
                    {orderItem.listOderItem[0].status === 'pending' ? (
                      <span
                        className='font-italic'
                        style={{ color: '#FFBF00' }}
                      >
                        {t("pending")}
                      </span>
                    ) : orderItem.listOderItem[0].status === 'Cancel' ? (
                      <span
                        className='font-italic'
                        style={{ color: '#E14D2A' }}
                      >
                        {t("cancel")}
                      </span>
                    ) : (
                      <span
                        className='font-italic'
                        style={{ color: '#68B984' }}
                      >
                        {t("confirm")}
                      </span>
                    )}
                  </h5>
                  {orderItem.listOderItem[0].status === 'pending' ? (
                    <div>
                      <button
                        id={`${orderItem.id}`}
                        type='button'
                        className='btn btn-success mt-2 mr-2'
                        onClick={handleConfirmOrder}
                        style={{marginRight: '10px'}}
                      >
                        {t("confirm2")}
                      </button>

                      <button
                        id={`${orderItem.id}`}
                        type='button'
                        className='btn btn-danger mt-2'
                        onClick={handleCancelOrder}
                      >
                        {t("cancel_order")}
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default ManageOrder;
