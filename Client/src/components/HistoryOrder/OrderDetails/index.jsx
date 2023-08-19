import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const OrderDetails = ({ orderItem }) => {
  const {t} = useTranslation();
  const unitCurrency = Intl.NumberFormat('en-US');

  let [orderStatus, setOrderStatus] = useState(
    orderItem.listOderItem[0].status
  );

  const handleCancelOrder = () => {
    axios
      .get(`http://localhost:8082/api/v1/order/cancel/${orderItem.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert(t("cancel_order_success"));
        setOrderStatus('Cancel');
      })
      .catch(() => {
        alert(t("cancel_not_order"));
      });
  };

  return (
    <div className='row p-4 mb-5' style={{ borderRadius: '10px',boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)' ,backgroundColor:'hsl(30, 100%, 96%)' }}>
      <p className='mb-3 font-weight-bold'>{t("date_order")}: {orderItem.dateOrder}</p>
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
            </div>
            <div className='col-3'>
              
              <p
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                  color: '#344D67',
                }}
              >
                <span className='font-weight-bold'>{t("total_money")}:</span>{' '}
                {unitCurrency.format(order.book.price * order.quantity)} VND
              </p>
            </div>
            <div>
              <Link
                to={`/viewBook/${order.book.id}`}
                className='mt-2 btn btn-outline-info'
                style={{
                  marginBottom: '2px',
                  textTransform: 'capitalize',
                }}
              >
                {t("comment")}
              </Link>
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
                    .map((order) => order.quantity * order.book.price)
                    .reduce((acc, current) => acc + current)
                )}{' '}
                VND
              </span>
            </h5>
            <h5 style={{ textTransform: 'capitalize' }}>
              {t("status_order")}:{' '}
              {orderStatus === 'pending' ? (
                <span className='font-italic' style={{ color: '#FFBF00' }}>
                  {t("pending")}
                </span>
              ) : orderStatus === 'Cancel' ? (
                <span className='font-italic' style={{ color: '#E14D2A' }}>
                  {t("cancel")}
                </span>
              ) : (
                <span className='font-italic' style={{ color: '#68B984' }}>
                  {t("confirm")}
                </span>
              )}
            </h5>
            {orderStatus === 'pending' ? (
              <button
                type='button'
                className='btn btn-outline-danger mt-2'
                onClick={handleCancelOrder}
              >
                {t("cancel_order")}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
