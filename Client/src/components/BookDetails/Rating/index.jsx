const Rating = ({ rating }) => {
  const star = +rating.star;

  return (
    <div className='p-3 border mb-3'>
      <div className="d-flex">
      <box-icon name='user-circle'></box-icon>
      <p className='font-weight-bold'>{rating.userNameRating}</p>
      <div style={{paddingLeft: '30px'}}>
        {[...Array(5).keys()].map((current) =>
          current <= star - 1 ? (
            <box-icon name='star' type='solid'></box-icon>
          ) : (
            <box-icon name='star' ></box-icon>
          )
        )}
      </div>
      </div>
      
      <hr />
      <p>{rating.message}</p>
      
    </div>
  );
};

export default Rating;
