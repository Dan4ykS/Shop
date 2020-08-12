import React from 'react';
import Slider from '../../components/Slider';

const SimilarGoods = ({ goods }) => {
  if (!goods?.length || goods.length < 3) {
    return null;
  }
  const arrForSlider = goods.map(({ previewImg, rating, id }) => ({
    slideImgSrc: previewImg.previewImgSrc,
    slideDetail: { rating: rating.general },
    slideLink: `/Goods/commodity-${id}`,
  }));
  return (
    <>
      <div className='blockTitle'>Похожие книги</div>
      <Slider
        content={arrForSlider}
        slidesToShow={3}
        slidesToScroll={1}
        hasDots={false}
      />
    </>
  );
};

export default SimilarGoods;
