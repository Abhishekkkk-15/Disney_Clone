import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';


export default function ImgSlider() {

    let settings = {
        dots: true,
        Infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }


    return (
        <Carousel {...settings}>
            <Wrap>
                <a>
                    <img src="images/slider-badging.jpg" alt="" />
                </a>
            </Wrap>
            <Wrap>
                <a>
                    <img src="images/slider-scale.jpg" alt="" />
                </a>
            </Wrap>
            <Wrap>
                <a>
                    <img src="images/slider-badag.jpg" alt="" />
                </a>
            </Wrap>
            <Wrap>
                <a>
                    <img src="images/slider-scales.jpg" alt="" />
                </a>
            </Wrap>
        </Carousel>
    )
}

const Carousel = styled(Slider)`
margin-top: 20px;

& > button{
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover{
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }
}

ul li button{
    &:before{
        font-size: 10px;
        color: rgb(150,150,171);
    }
}

li.slick-active button:before{
    color:white;
}

.slick-list{
    overflow: initial; // it will show both present and upComing slider img
}

.slick-prev{
    left:-75px;
}

.slick-next{
    right:-75px;
}
`;

const Wrap = styled.div`
border-radius: 4px;
position: relative;

a{
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 /73%) 0px 16px 10px 10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding:4px;

    img{
        width: 100%;
        height: 100%;
    }

    &:hover{
        padding: 0;
        border: solid 4px rgb(249,249,249,0.8);
        transition-duration: 300ms;
    }
}
`;