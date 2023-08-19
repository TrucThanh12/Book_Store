import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpinnerLoading } from '../SpinnerLoading/index';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Book from './components/Book/index';
import Pagination from './components/Pagination/index';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Forbidden from '../Forbidden';

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
      books = response.data;
      setIsLoading(false);
    } catch (error) {
      alert('Vui lòng tải lại');
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

  // Get current posts
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = listBook.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if(localStorage.getItem('role')==='ROLE_USER'){
    return(
      <div>
        <Forbidden/>
        
      </div>
    )
  }
  return (
    <article className='mb-3' style={{backgroundColor: 'hsl(19, 100%, 96%)', paddingTop: '50px'}}>
      <h1 className='text-center mb-4' style={{ color: '#344D67' }}>
        {t("product_management")}
      </h1>
      <div className='container' >
        <div className='text-center'>
          <Link
            className='btn btn-outline-success btn-lg '
            to='/newBook'
            style={{ margin:'15px'}}
          >
            {t("add")} <AiOutlinePlusCircle className='pb-1' />
          </Link>
        </div>
        <div>
          <form className='form-inline d-flex' onSubmit={handleSubmit}
          style={{height: '45px', margin:'30px', borderRadius: '20px'}}>
            <input
              type='text'
              className='form-control'
              placeholder={t("text_search")}
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

        {currentBooks.map((book) => (
          <Book book={book} key={book.id} />
        ))}

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
