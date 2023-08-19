import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Book = ({ book }) => {
  const {t} = useTranslation();
  const handleDeleteBook = (e) => {
    const confirmDelte = window.confirm(
      t("confirm_delete_book")
    );
    if (confirmDelte) {
      axios
        .delete(
          `http://localhost:8082/api/v1/admin/book/delete/${e.target.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          alert(t("alert_delete_success"));
          window.location.reload();
        })
        .catch((err) => {
          alert("Không thể xóa sách");
        });
    }
  };

  return (
    <div className='row p-4 mb-5' style={{backgroundColor: 'hsl(19, 100%, 96%)', boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)', borderRadius: '10px'}}>
      <div className='col justify-content-center align-items-center d-flex'>
        <img
          src={`http://localhost:8082/images/${book.bookImages[0].name}`}
          alt='book'
          width='100px'
          height='150px'
        />
      </div>
      <div className='col-7'>
        <h4
          className='font-weight-bold mb-2'
          style={{
            marginBottom: '2px',
            textTransform: 'capitalize',
            color: '#2B3A55',
          }}
        >
          {book.title}
        </h4>
        <h5
          style={{
            marginBottom: '2px',
            textTransform: 'capitalize',
            color: '#344D67',
          }}
        >
          {t("author")}: {book.author}
        </h5>
        <p>
          {book.description}
        </p>
      </div>
      <div className='col justify-content-center align-items-center d-flex'>
        <Link to={`/updateBook/${book.id}`} className='btn btn-success' style={{margin:'5px'}}>
          {t("view")}
        </Link>
        <button
          className='ml-2 btn btn-danger'
          onClick={handleDeleteBook}
          id={book.id}
        >
          {t("delete")}
        </button>
      </div>
    </div>
  );
};

export default Book;
