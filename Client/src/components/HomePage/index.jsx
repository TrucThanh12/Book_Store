import { useEffect, useState } from 'react';
import { SpinnerLoading } from '../SpinnerLoading/index';
import Book from './components/Book/index';
import Pagination from './components/Pagination/index';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Slide from './components/Slide';
const url = 'http://localhost:8082/api/v1/books';
let books;

const HomePage = () => {
  const {t} = useTranslation();
  const [listBook, setListBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState('');
  const [booksPerPage] = useState(3);

  const getListBook = async () => {
    try {
      const response = await axios.get(url);
      setListBook(response.data);
      books = response.data; // gán vào books để sử dụng cho việc tìm kiếm
      setIsLoading(false);
    } catch (error) {
      alert('please reload again');
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyWord) {
      setListBook(listBook.filter((book) => book.title.includes(keyWord)));
    } else {
      setListBook(books);
    }
    setKeyWord('');
  };

  useEffect(() => {
    getListBook();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  // lấy sách trên 1 trang
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = listBook.slice(indexOfFirstBook, indexOfLastBook);

  // bấm thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <article className='mb-3' style={{backgroundColor: 'hsl(19, 100%, 96%)'}}>
      <div className='container'>
        <div>
          <Slide/>
        </div>
        <div style={{paddingTop:'60px',paddingBottom:'40px', backgroundColor:'hsl(19, 100%, 96%)'}}>
          <h1 className='hello text-center' style={{ color: '#344D67' }}>{t('hello')}</h1>
        </div>

        <div>
          <form className='form-inline d-flex' onSubmit={handleSubmit}
          style={{height: '40px'}}>
            <input
              type='text'
              className='form-control'
              placeholder={t("want")}
              aria-label="Recipient's username" 
              aria-describedby="button-addon2"
              value={keyWord}
              onChange={(e) => {
                setKeyWord(e.target.value);
                setListBook(books);
              }}
            ></input>  
            <button
              className='btn1 btn-outline'
              type='submit'
              id='button-addon2'
              style={{width: '100px'}}
            >
              {t("search")}
            </button>
          </form>
        </div>

        
        <div className='d-flex' style={{padding: '10px', backgroundColor: 'hsl(19, 100%, 96%)'}}>
          {currentBooks.map((book) => (
          <Book book={book} key={book.id} />
          ))}
        </div>
        

        <div className='justify-content-center align-items-center d-flex'>
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={listBook.length}
            paginate={paginate}
          />
        </div>
      </div>
    </article>
  );
};

export default HomePage;
