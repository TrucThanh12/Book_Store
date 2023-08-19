import { Link } from 'react-router-dom';
import "./style.css";
import { useTranslation } from 'react-i18next';
const Book = ({ book }) => {
  const {t}  = useTranslation();
  return (
  
    <div class="popular__container container grid">
      <article class="popular__card">
        <img src={`http://localhost:8082/images/${book.bookImages[0].name}`} alt="book" class="popular__img"/>
        <h3 class="popular__name">{book.title}</h3>
        <span class="popular__description">{book.author}</span>
        <div className='justify-content-center align-items-center d-flex' style={{width: '100%'}}>
         <Link to={`/viewBook/${book.id}`} className='btn1' style={{width: '150px'}}>
           {t("buy")}
         </Link>
      </div>
      </article>
    </div>
  );
};

export default Book;
