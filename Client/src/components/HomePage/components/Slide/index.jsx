import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Slide =() =>{
    const settings ={
        dots: true, // hiển thị các điểm chuyển đổi để chỉ ra trang hiện tại
        infinite: true, // cho phép trượt vô hạn qua các ảnh
        speed: 500, // tốc độ trượt ảnh
        slidesToShow: 1, // số lượng ảnh hiển thị trên mỗi lần trượt
        slidesToScroll: 1 
    };

    return(
        
        <Slider {...settings}>
            <div>
                <img src="https://i.imgur.com/FeFszef.png" alt="slide 1" />
            </div>
            <div>
                <img src="https://i.imgur.com/f63O2OI.png" alt="slide 2" width='2000px'/>
            </div>
            <div>
                <img src="https://i.imgur.com/lxtXAgf.png" alt="slide 3" width='2000px'/>
            </div>
            <div>
                <img src="https://i.imgur.com/ctHDeb5.png" alt="slide 4" width='2000px'/>
            </div>
            <div>
                <img src="https://i.imgur.com/0l8su2P.png" alt="slide 5" width='2000px'/>
            </div>
            <div>
                <img src="https://i.imgur.com/97paS7H.png" alt="slide 6" width='2000px'/>
            </div>
            <div>
                <img src="https://i.imgur.com/lxtXAgf.png" alt="slide 7" width='2000px'/>
            </div>
            <div>
                <img src="https://i.imgur.com/FeFszef.png" alt="slide 8" />
            </div>
            <div>
                <img src="https://i.imgur.com/f63O2OI.png" alt="slide 9" width='2000px'/>
            </div>
            <div>
                <img src="https://i.imgur.com/lxtXAgf.png" alt="slide 10" width='2000px'/>
            </div>
        </Slider>
    );
};

export default Slide;