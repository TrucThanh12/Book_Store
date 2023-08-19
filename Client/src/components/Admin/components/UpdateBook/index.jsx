import { useState, useEffect } from 'react';
import axios from 'axios';
import { SpinnerLoading } from '../../../SpinnerLoading';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
const UpdateBook = () => {
  const {t} = useTranslation();
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const getBookData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/book/${bookId}`
      );
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    getBookData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const submitForm = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('description', values.description);
    formData.append(
      'dateRelease',
      values.dateRelease.split('-').reverse().join('/')
    );
    formData.append('totalPage', values.totalPage);
    formData.append('typeBook', values.typeBook);
    formData.append('price', values.price);

    let imageArray = [];

    for (const property in values.images) {
      imageArray.push(values.images[property]);
    }

    imageArray.slice(0, -2).forEach((image) => {
      formData.append('images', image);
    });

    setIsLoading(true);

    axios
      .put(
        `http://localhost:8082/api/v1/admin/book/update/${bookId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        alert(t("update_book_success"));
        setIsLoading(false);
        reset();
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  };

  const handlePreviewImage = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      document.querySelector('.preview').innerHTML = '';

      fileReader.onload = function () {
        const url = fileReader.result;
        document
          .querySelector('.preview')
          .insertAdjacentHTML(
            'beforeend',
            `<img src="${url}" alt="${file.name}" class="preview-img"/>`
          );
      };
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <article className='p-3' style={{backgroundColor: 'hsl(19, 100%, 96%)'}}>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col' id='columnFirst'>
            {disabled ? (
              <div
                id='carouselExampleControls'
                className='carousel slide container'
                data-ride='carousel'
              >
                <h3 className='text-center mb-3' >{t("choose_photo")}</h3>
                {book.bookImages.length >= 1 ? (
                  <div>
                    <img
                      className='d-block w-100'
                      src={`http://localhost:8082/images/${book.bookImages[0].name}`}
                      height='560px'
                      alt='First slide'
                    />
                  </div>
                ) : (
                  <div className='carousel-inner'>
                    {book.bookImages.map((image, index) =>
                      index === 1 ? (
                        <div className='carousel-item active'>
                          <img
                            className='d-block w-100'
                            src={`http://localhost:8082/images/${image.name}`}
                            height='560px'
                            alt='First slide'
                          />
                        </div>
                      ) : (
                        <div className='carousel-item'>
                          <img
                            className='d-block w-100'
                            src={`http://localhost:8082/images/${image.name}`}
                            alt='First slide'
                            height='560px'
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
                
              </div>
            ) : (
              <div className='container'>
                <h3 className='mb-5 text-center'>{t("choose_photo")}</h3>
                <input
                  id='uploadFile'
                  type='file'
                  className='form-control mb-4'
                  style={{ width: '500px' }}
                  multiple
                  accept='image/*'
                  {...register('images', {
                    required: 'choose images book',
                  })}
                  onChange={handlePreviewImage}
                />
                <small id='imageFile' style={{ color: 'red' }}>
                  {errors.images?.message}
                </small>
                <div className='preview'></div>
              </div>
            )}
          </div>

          <div className='col' id='columnSecond' >
            <h3 className='text-center mb-3'>{t("information")}</h3>
            <div
              className='container p-3'
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)'
              }}
            >
              <form id='bookSaveForm'>
                <div className='row g-3' >
                <div className='d-flex' style={{margin:'10px'}}>
                  <div className='col-md-5' style={{marginRight:'10px'}}>
                    <label htmlFor='title' className='font-weight-bold'>
                      {t("name_book")}
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      {...register('title', {
                        required: t("error_name_book"),
                      })}
                      disabled={disabled}
                      defaultValue={book.title}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.title?.message}
                    </small>
                  </div>
                  <div className='col-md-5'>
                    <label htmlFor='author' className='font-weight-bold'>
                      {t("author")}
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='author'
                      {...register('author', {
                        required: t("error_author"),
                      })}
                      disabled={disabled}
                      defaultValue={book.author}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.author?.message}
                    </small>
                  </div>
                </div>
              </div>
                <div className='form-group' style={{margin:'10px'}}>
                  <label htmlFor='description' className='font-weight-bold'>
                    {t("description")}
                  </label>

                  <textarea
                    id='description'
                    className='form-control'
                    rows='4'
                    style={{ resize: 'none' }}
                    {...register('description', {
                      required: t("error_description"),
                    })}
                    disabled={disabled}
                    defaultValue={book.description}
                  ></textarea>
                  <small style={{ color: 'red' }}>
                    {errors.description?.message}
                  </small>
                </div>

                <div className='form-row'>
                <div className='d-flex' style={{margin:'10px'}}>
                  <div className='form-group col-md-5' style={{marginRight: '10px'}}>
                    <label htmlFor='dateRelease' className='font-weight-bold'>
                      {t("dateRelease")}
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='dateRelease'
                      disabled={disabled}
                      {...register('dateRelease', {
                        required: t("error_date"),
                      })}
                      defaultValue={new Date(
                        book.dateRelease.split('/').reverse().join('-')
                      )
                        .toISOString()
                        .substring(0, 10)}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.dateRelease?.message}
                    </small>
                  </div>
                  <div className='form-group col-md-5'>
                    <label htmlFor='totalPage' className='font-weight-bold'>
                      {t("total_page")}
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='totalPage'
                      min='20'
                      {...register('totalPage', {
                        required: t("error_total"),
                      })}
                      disabled={disabled}
                      defaultValue={book.totalPage}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.totalPage?.message}
                    </small>
                  </div>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6' style={{margin:'10px'}}>
                    <label htmlFor='typeBook' className='font-weight-bold'>
                      {t("typeBook")}
                    </label>
                    <select
                      id='typeBook'
                      className='form-control'
                      {...register('typeBook', {
                        required: t("error_type"),
                      })}
                      disabled={disabled}
                      defaultValue={book.typeBook}
                    >
                      <option selected>Data</option>
                      <option>DevOps</option>
                      <option>Programming Language</option>
                      <option>Machine Learning</option>
                    </select>
                    <small style={{ color: 'red' }}>
                      {errors.typeBook?.message}
                    </small>
                  </div>
                  <div className='form-group col-md-6' style={{margin:'10px'}}>
                    <label htmlFor='totalPage' className='font-weight-bold'>
                      {t("price")}
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='price'
                      min='10000'
                      {...register('price', {
                        required: t("error_price")
                      })}
                      disabled={disabled}
                      defaultValue={book.price}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.price?.message}
                    </small>
                  </div>
                </div>

                <div className='text-center'>
                {disabled?(
                  <div className='d-inline-block text-center text-lg-start mt-4 pt-2 mr-5'>
                    <button
                      id='editButton'
                      type='button'
                      className='btn btn-info'
                      style={{
                        paddingLeft: '2.5rem',
                        paddingRight: '2.5rem',
                      }}
                      onClick={() => {
                        setDisabled(!disabled);
                        setValue(
                          'title',
                          document.querySelector('#title').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'author',
                          document.querySelector('#author').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'description',
                          document.querySelector('#description').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'dateRelease',
                          document.querySelector('#dateRelease').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'totalPage',
                          document.querySelector('#totalPage').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'typeBook',
                          document.querySelector('#typeBook').value,
                          { shouldValidate: true }
                        );
                        setValue(
                          'price',
                          document.querySelector('#price').value,
                          { shouldValidate: true }
                        );
                      }}
                    >
                      {t("edit")}
                    </button>
                  </div>
                  ):
                  (<div className='d-inline-block text-center text-lg-start mt-4 pt-2'>
                    <button
                      type='submit'
                      className='btn btn-success'
                      style={{
                        paddingLeft: '2.5rem',
                        paddingRight: '2.5rem',
                      }}
                      
                      onClick={handleSubmit(submitForm)}
                    >
                      {t("save")}
                    </button>
                    </div>)}
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UpdateBook;
