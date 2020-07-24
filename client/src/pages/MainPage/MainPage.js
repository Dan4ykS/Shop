import React, { useEffect } from 'react';
import LoadingData from '../../components/LoadingData';
import GoodsList from '../GoodsPage/GoodsList';
import { fetchGoods } from '../../actions/goodsList';
import { connectToStore } from '../../utils/workWithRedux';
import { getDateFromLocalStorage } from '../../utils/workWithBrowser';
import ListView from '../../components/ListView';
import CommodityPreviewCard from '../../components/CommodityPreviewCard';
import SmallCommodityPreviewCard from '../../components/CommodityPreviewCard/Small';
import MainSlider from './MainSlider';



const MainPage = ({ goodsList: { goods, loading, error }, actions: { fetchGoods } }) => {
  useEffect(() => {
    console.log('Я перерендерился');
  });
  return (
    <>
      <MainSlider
        content={[
          {
            title: 'Vulputate Mollis Ultricies Fermentum Parturient',
            description:
              'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
            button: 'Read More',
            image: 'https://i.imgur.com/ZXBtVw7.jpg',
            user: 'Luan Gjokaj',
            userProfile: 'https://i.imgur.com/JSW6mEk.png',
          },
          {
            title: 'Tortor Dapibus Commodo Aenean Quam',
            description:
              'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
            button: 'Discover',
            image: 'https://i.imgur.com/DCdBXcq.jpg',
            user: 'Erich Behrens',
            userProfile: 'https://i.imgur.com/0Clfnu7.png',
          },
        ]}
      />
      {/* <LoadingData
        configData={{
          loading,
          error,
          funcForRender: !getDateFromLocalStorage('userData') && !goods.lenght ? () => fetchGoods(0, 3) : null,
          routeForRedirect: '/Goods',
        }}
      >
        <h2 style={{ marginBottom: '30px' }}>Товары</h2>
        <div className='row'>
          <ListView
            listForRender={goods}
            ComponentForRender={SmallCommodityPreviewCard}
            AdditionalСomponentForRender={CommodityPreviewCard}
            numberToAlternate={5}
          />
        </div>
      </LoadingData>
      <h2>Главная страница! </h2>
      <LoadingData
        configData={{
          loading,
          error,
          funcForRender: !getDateFromLocalStorage('userData') && !goods.lenght ? () => fetchGoods(0, 3) : null,
          routeForRedirect: '/Goods',
        }}
      >
        <h2 style={{ marginBottom: '30px' }}>Товары</h2>
        <div className='row'>
          <ListView
            listForRender={goods}
            ComponentForRender={SmallCommodityPreviewCard}
            AdditionalСomponentForRender={CommodityPreviewCard}
            numberToAlternate={5}
          />
        </div>
      </LoadingData> */}
    </>
  );
};

export default connectToStore(['goodsList'], { fetchGoods })(MainPage);
