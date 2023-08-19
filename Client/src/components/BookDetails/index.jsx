import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerLoading } from '../SpinnerLoading';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Rating from './Rating/index';
import PaginationRating from './PaginationRating/index';
import axios from 'axios';
import './bookDetailsStyle.css';
import { useTranslation } from 'react-i18next';

let bookOrigin;

const BookDetails = () => {
  const {t} = useTranslation();
  const { bookId } = useParams(); // trích xuất giá trị động
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [averageStar, setAverageStar] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingStar, setRatingStar] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingsPerPage] = useState(3);
  const navigate = useNavigate();
  const unitCurrency = Intl.NumberFormat('en-US');

  const getBookData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/book/${bookId}`
      );
      setBook(response.data);
      bookOrigin = response.data;
      const ratingArray = [];
      for (const property in response.data.ratings) {
        ratingArray.push(+response.data.ratings[property].star);
      }
      setAverageStar(
        Math.ceil(
          ratingArray.reduce((acc, item) => acc + item) / ratingArray.length
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // lọc số sao trong đánh giá
  const filterRating = (starFilter) => {
    const newRatings = bookOrigin.ratings.filter(
      (rating) => rating.star === starFilter
    );
    const newBook = { ...book, ratings: newRatings };
    setBook(newBook);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const messageSuccessReview = document.querySelector('#alertSuccess');
    const message = document.querySelector('#review').value;
    const data = {
      star: ratingStar,
      message: message,
      userNameRating: localStorage.getItem('userName'),
    };
    axios
      .post(`http://localhost:8082/api/v1/book/${bookId}/rating`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // gửi token nhận dạng người dùng đã đăng nhập lên máy chủ để xác thực vfa phân quyền
        },
      })
      .then((res) => {
        messageSuccessReview.style.display = '';
      })
      .catch(() => {
        alert('Không thể nhận xét, vui lòng thử lại!!');
      });
  };

  const handleAddToCart = () => {
    const data = { bookId };
    axios
      .post(
        `http://localhost:8082/api/v1/cart/${localStorage.getItem(
          'userId'
        )}/addItem`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        alert(t("alert_add_product_cart"));
        localStorage.setItem(`book ${bookId}`, 'added');
        navigate('/cart');
      })
      .catch(() => {
        alert(t("alert_not_add_product_cart"));
      });
  };

  useEffect(() => {
    getBookData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const indexOfLastRating = currentPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = book.ratings.slice(
    indexOfFirstRating,
    indexOfLastRating
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <article className='p-3' style={{ backgroundColor:'hsl(19, 100%, 96%)' }}>
      <div className='container' style={{padding:'40px'}}>
        <div className='card' style={{ backgroundColor:'hsl(10, 100%, 96%)',boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)' }}>
          <div className='container-fliud' style={{ backgroundColor:'hsl(10, 100%, 96%)' }}>
            <div className='wrapper row'>
              <div className='preview col-md-6'>
                <div className='preview-pic tab-content'>
                  {book.bookImages.map((image, index) =>
                    index === 0 ? (
                      <div className='tab-pane active' id={`pic-${index}`}> 
                        <img
                          src={`http://localhost:8082/images/${image.name}`}
                          alt='book pic'
                          style={{height:'640px', width:'540px'}}
                        />
                      </div>
                    ) : (
                      <div className='tab-pane' id={`pic-${index}`}>
                        <img
                          src={`http://localhost:8082/images/${image.name}`}
                          alt='book pic'
                          style={{height:'640px', width:'540px'}}
                        />
                      </div>
                    )
                  )}
                </div>
                <ul className='preview-thumbnail nav nav-tabs d-flex justify-content-center'>
                  {book.bookImages.map((image, index) =>
                    index === 1 ? (
                      <li className='active'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a data-target={`#pic-${index}`} data-toggle='tab'>
                          <img
                            src={`http://localhost:8082/images/${image.name}`}
                            alt='book pic'
                          />
                        </a>
                      </li>
                    ) : (
                      <li>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a data-target={`#pic-${index}`} data-toggle='tab'>
                          <img
                            src={`http://localhost:8082/images/${image.name}`}
                            alt='book pic'
                          />
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className='details col-md-6'>
                <h3 className='product-title' style={{ marginBottom: '3px' }}>
                  {book.title}
                </h3>
                <h4 className=''>{t("author")}: {book.author}</h4>
                <div className='rating'>
                  <div className='stars'>
                    {[...Array(5).keys()].map((current) =>
                      current <= averageStar - 1 ? (
                        <box-icon type='solid' name='star'></box-icon>
                      ) : (
                        <box-icon name='star'></box-icon>
                      )
                    )}
                  </div>
                  <span className='review-no'>
                    {book.ratings.length} {t("rating")}
                  </span>
                </div>
                <p className='product-description'>{t("description")}: {book.description}</p>
                <h5 className='price'>
                  {t("price")}: <span>{unitCurrency.format(book.price)} VND</span>
                </h5>
                <div className='font-weight-bold'>
                  <p>
                    {t("total_page")}:{' '}
                    <span className='font-weight-normal'>{book.totalPage}</span>
                  </p>
                  <p>
                    {t("dateRelease")}:{' '}
                    <span className='font-weight-normal'>
                      {book.dateRelease}
                    </span>{' '}
                  </p>
                  <p>
                    {t("typeBook")}:{' '}
                    <span className='font-weight-normal'>{book.typeBook}</span>
                  </p>
                </div>
                <div className='text-center'>
                  {localStorage.getItem('token') ? (
                    localStorage.getItem(`book ${bookId}`) ? (
                      <button
                        className='btn btn-secondary'
                        onClick={handleAddToCart}
                        disabled={true}
                      >
                      {t("check_book_cart")} 
                      </button>
                    ) : (
                      <button
                        className='btn btn-outline-dark'
                        onClick={handleAddToCart}
                        style={{backgroundColor:'hsl(19, 64%, 54%)'}}
                      >
                        <AiOutlineShoppingCart /> {t("add_book_cart")}
                      </button>
                    )
                  ) : (
                    <Link className='btn btn-outline-dark' to='/login'
                    style={{ width: '250px' , backgroundColor:'hsl(19, 64%, 54%)'}}>
                      {t("login")}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container' style={{width: '1270px'}}>
        <div className='card' style={{ backgroundColor:'hsl(10, 100%, 96%)',boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)' }}>
          <h3>{t("review_custom")}</h3>
          <div className='row'>
            <div className='col-4'>
              <p>
                <span className='font-weight-bold' style={{ color: '#ee4d2d' }}>
                  {averageStar}
                </span>{' '}
                /{' '}
                <span className='font-weight-bold' style={{ color: '#ee4d2d' }}>
                  5
                </span>
              </p>
              <div>
              {[...Array(5).keys()].map((current) =>
                      current <= averageStar - 1 ? (
                        <box-icon type='solid' name='star'></box-icon>
                      ) : (
                        <box-icon name='star'></box-icon>
                      )
                )}
              </div>
            </div>
            <div className='col-8'>
              <button
                className='btn btn-outline-dark d-inline mr-2'
                style={{ width: '100px' , backgroundColor:'hsl(19, 64%, 54%)', margin:'5px'}}
                onClick={() => setBook(bookOrigin)}
              >
                {t("all")}
              </button>
              <button
                className='btn btn-outline-dark d-inline mr-2'
                style={{ width: '100px', backgroundColor:'hsl(19, 64%, 54%)',margin:'10px' }}
                onClick={() => {
                  filterRating(5);
                }}
              >
                5 {t("star")}
              </button>
              <button
                className='btn btn-outline-dark d-inline mr-2'
                style={{ width: '100px', backgroundColor:'hsl(19, 64%, 54%)', margin:'10px' }}
                onClick={() => {
                  filterRating(4);
                }}
              >
                4 {t("star")}
              </button>
              <button
                className='btn btn-outline-dark d-inline mr-2'
                style={{ width: '100px',backgroundColor:'hsl(19, 64%, 54%)',margin:'10px' }}
                onClick={() => {
                  filterRating(3);
                }}
              >
                3 {t("star")}
              </button>
              <button
                className='btn btn-outline-dark d-inline mr-2'
                style={{ width: '100px' , backgroundColor:'hsl(19, 64%, 54%)',margin:'10px'}}
                onClick={() => {
                  filterRating(2);
                }}
              >
                2 {t("star")}
              </button>
              <button
                className='btn btn-outline-dark d-inline'
                style={{ width: '100px', backgroundColor:'hsl(19, 64%, 54%)' ,margin:'10px'}}
                onClick={() => {
                  filterRating(1);
                }}
              >
                1 {t("star")}
              </button>
            </div>
          </div>
          <hr style={{ borderTop: '1px solid' }} />
          {currentRatings.map((rating, index) => (
            <Rating rating={rating} key={index} />
          ))}
          <PaginationRating
            ratingsPerPage={ratingsPerPage}
            totalRatings={book.ratings.length}
            paginate={paginate}
          />
        </div>
      </div>
      {localStorage.getItem('token') && (
        <div className='container' style={{marginLeft:'210px'}}>
          <p
            id='alertSuccess'
            className='text-center bg-success'
            style={{ color: 'white', display: 'none' }}
          >
            {t("done_comment")}
          </p>
          <h3>{t("comment")}</h3>
          <form>
            <small className='form-text text-muted mb-2 font-italic font-weight-bold'>
            {t("text_comment")}
            </small>
            <br/>
            <textarea
              id='review'
              className='p-1'
              style={{
                width: '31.25rem',
                height: '6.25rem',
                resize: 'none',
                borderRadius: '0.625rem',
              }}
              maxLength='100'
            />
            <div className='mb-2'>
              {[...Array(5).keys()].map((_, index) => {
                index += 1;
                return (
                  <div style={{display:'inline'}}>
                    <box-icon type={
                      index <=(hover||ratingStar)
                      ? 'solid': ''
                    } 
                    key={index}
                    style={{cursor: 'pointer'}}
                    onClick={()=> setRatingStar(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={()=> setHover(ratingStar)}
                    name='star'></box-icon>
                  </div>
                );
              })}
            </div>
            <button
              type='submit'
              className='btn btn-outline-info d-block'
              onClick={handleSubmitReview}
            >
              {t("send")}
            </button>
          </form>
        </div>
      )}
    </article>
  );
};

export default BookDetails;