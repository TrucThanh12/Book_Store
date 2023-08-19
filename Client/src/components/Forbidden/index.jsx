import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <article>
      <div className='d-flex align-items-center justify-content-center'>
        <div className='text-center mt-5' style={{marginBottom: '1000px'}}>
          <h1 className='display-1 fw-bold'>404</h1>
          <p className='fs-3'>
            {' '}
            <span className='text-danger'>Opps!</span> Page not found.
          </p>
          <p className='lead'>The page you’re looking for doesn’t exist.</p>
          <Link to='/' className='btn btn-primary'>
            Go Home
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Forbidden;
