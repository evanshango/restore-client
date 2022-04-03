import React from 'react';
import {Box, Typography} from "@mui/material";
import Slider from "react-slick";

const HomePage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return (
        <div style={{marginTop: '4.1rem'}}>
            <div>
                <Slider {...settings}>
                    <div style={{textAlign: 'center'}}>
                        <img src={"/images/hero1.jpg"} alt="hero1" style={{borderRadius: '.5rem', maxHeight: 600, width: '100%'}}/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <img src={"/images/hero2.jpg"} alt="hero2" style={{borderRadius: '.5rem', maxHeight: 600, width: '100%'}}/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <img src={"/images/hero3.jpg"} alt="hero3" style={{borderRadius: '.5rem', maxHeight: 600, width: '100%'}}/>
                    </div>
                </Slider>
            </div>
            <Box display={'flex'} justifyContent={'center'} sx={{p: 4}}>
                <Typography variant={'h3'}>Welcome To The Shop!</Typography>
            </Box>
        </div>
    );
};

export default HomePage;
