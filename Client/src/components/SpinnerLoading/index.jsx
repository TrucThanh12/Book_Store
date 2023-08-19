export const SpinnerLoading = () => {
  return (
    <div
      className='container m-5 d-flex justify-content-center'
      style={{ height: '100vh' }}
    >
      <div className='d-flex justify-content-center'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Đợi chút thôi...</span>
        </div>
      </div>
    </div>
  );
};
