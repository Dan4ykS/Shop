import React from 'react';
import Slider from '../../components/Slider';

const MainPage = () => {
  return (
    <>
      <h2>Главная страница</h2>
      <Slider
        slidesToShow={2}
        slidesToScroll={1}
        content={[
          {
            slideImgSrc:
              'https://c.wallhere.com/photos/82/ea/train_railway_train_station_sunlight_digital_art_futuristic_robot_arch-157020.jpg!d',
          },
          {
            slideImgSrc:
              'https://c.wallhere.com/photos/35/89/1920x1080_px_Anime_Girls_night_shadow_Train_Station-1240949.jpg!d',
            slideLink: '/Goods',
          },
          {
            slideImgSrc:
              'https://c.wallhere.com/photos/cc/a2/train_railway_train_station_sunlight_St_Petersburg_arch_shadow_Russia-157028.jpg!d',
            slideLink: '/Goods/popular',
          },
          {
            slideImgSrc:
              'https://c.wallhere.com/photos/82/ea/train_railway_train_station_sunlight_digital_art_futuristic_robot_arch-157020.jpg!d',
          },
        ]}
        hasDots={false}
      />
    </>
  );
};

export default MainPage;
