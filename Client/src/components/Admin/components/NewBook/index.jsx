import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SpinnerLoading } from '../../../SpinnerLoading';
import axios from 'axios';
import './style.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewBook = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    }); //do trình duyệt có thể thêm 2 phần tử cuối cùng vào mảng là underfined hoặc null

    setIsLoading(true);

    axios
      .post('http://localhost:8082/api/v1/admin/book/save', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data', 
        },
      })
      .then((res) => {
        alert(t("add_book_success"));
        reset();
        navigate('/manageBook');
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
      fileReader.readAsDataURL(file); // đọc nội dung tập dưới dạng URL sự kiện
      // Xóa nội dung hiện có của phần tử 
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
    <article className='p-3' style={{ backgroundColor: 'hsl(19, 100%, 96%)' }}>
      <div className='container-fluid'>
        <div className='row mt-3'>

          <div className='col' id='columnSecond' >
            <h3 className='text-center mb-3'>{t("information")}</h3>
            <div
              className='container p-3'
              style={{
                backgroundColor: 'hsl(25, 100%, 96%)', boxShadow:'0 8px 20px hsla(19, 64%, 4%, .2)', borderRadius: '10px'
              }}
            >
              <form id='bookSaveForm' >
                <div className='form-row d-flex'>
                  <div className='form-group col-md-5' style={{marginRight:'10px'}}>
                    <label htmlFor='title' className='font-weight-bold'>
                      {t("name_book")}:
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      {...register('title', {
                        required: t("error_name_book"),
                      })}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.title?.message}
                    </small>
                  </div>
                  <div className='form-group col-md-5' style={{marginRight:'10px'}}>
                    <label htmlFor='author' className='font-weight-bold'>
                      {t("author")}:
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='author'
                      {...register('author', {
                        required: t("error_author"),
                      })}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.author?.message}
                    </small>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='description' className='font-weight-bold'>
                    {t("description")}:
                  </label>

                  <textarea
                    id='description'
                    className='form-control'
                    rows='4'
                    style={{ resize: 'none' }}
                    {...register('description', {
                      required: t("error_description"),
                    })}
                  ></textarea>
                  <small style={{ color: 'red' }}>
                    {errors.description?.message}
                  </small>
                </div>

                <div className='form-row d-flex'>
                  <div className='form-group col-md-5' style={{marginRight:'10px'}}>
                    <label htmlFor='dateRelease' className='font-weight-bold'>
                      {t("dateRelease")}:
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='dateRelease'
                      {...register('dateRelease', {
                        required: t("error_date"),
                      })}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.dateRelease?.message}
                    </small>
                  </div>
                  <div className='form-group col-md-5' style={{marginRight:'10px'}}>
                    <label htmlFor='totalPage' className='font-weight-bold'>
                      {t("total_page")}:
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='totalPage'
                      min='20'
                      {...register('totalPage', {
                        required: t("error_total"),
                      })}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.totalPage?.message}
                    </small>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-10'>
                    <label htmlFor='typeBook' className='font-weight-bold'>
                      {t("typeBook")}
                    </label>
                    <select
                      id='typeBook'
                      className='form-control'
                      {...register('typeBook', {
                        required: t("error_type"),
                      })}
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
                  <div className='form-group col-md-10'>
                    <label htmlFor='totalPage' className='font-weight-bold'>
                      {t("price")}
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='totalPage'
                      min='10000'
                      {...register('price', {
                        required: t("error_price"),
                      })}
                    />
                    <small style={{ color: 'red' }}>
                      {errors.price?.message}
                    </small>
                  </div>
                </div>

                <div className='text-center text-lg-start mt-4 pt-2'>
                  <button
                    type='submit'
                    className='btn btn-outline-success'
                    style={{
                      paddingLeft: '2.5rem',
                      paddingRight: '2.5rem',
                    }}
                    onClick={handleSubmit(submitForm)}
                  >
                    {t("save")}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='col' id='columnFirst'>
            <div className='container'>
              <h3 className='mb-5 text-center'>{t("choose_photo")}</h3>
              <input
                id='uploadFile'
                type='file'
                className='form-control mb-4'
                style={{ width: '500px' }}
                multiple
                accept='image/*' // xác nhận các loại tệp được cháp nhận cho việc chọn
                {...register('images', {
                  required: t("choose_photo"),
                })}
                onChange={handlePreviewImage}
              />
              <small id='imageFile' style={{ color: 'red' }}>
                {errors.images?.message}
              </small>
              <div className='preview'></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewBook;
