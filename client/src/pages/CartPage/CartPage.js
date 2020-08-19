import React, { useEffect } from 'react';
import ListView from '../../components/ListView';
import CartCommudityDetail from './CartCommodityDetail';
import LoadingData from '../../components/LoadingData';
import './CartPage.scss';
import { fetchGoods } from '../../actions/goodsList';
import { connectToStore } from '../../utils/workWithRedux';
import { redirectToPage } from '../../utils/workWithBrowser';
import FullPrice from './FullPrice';

const CartPage = ({
  shopingCart: { totalPrice, cart, loading, updatedPrice },
  userData: { userName },
  goodsList: { goods },
  actions: { fetchGoods },
  history,
}) => {
  useEffect(() => {
    if (userName === 'admin') {
      redirectToPage(history, '/admin');
    }
  }, [userName, history]);

  useEffect(() => {
    if (updatedPrice) {
      alert('Внимание, цены на товары в вашей корзине поменялись');
    }
  }, [updatedPrice]);

  return (
    <div className='cartPage'>
      <LoadingData
        configData={{
          loading: userName ? false : loading,
          error: null,
          funcForRender: goods.length ? null : fetchGoods,
        }}
      >
        <div className='blockTitle'>Ваш список товаров</div>
        <ListView
          listForRender={cart}
          ComponentForRender={CartCommudityDetail}
          ComponentWithoutData={() => <h3>Вы еще ничего не выбрали</h3>}
          history={history}
        />
        <FullPrice totalPrice={totalPrice} />
      </LoadingData>
    </div>
  );
};

export default connectToStore(['shopingCart', 'userData.userName', 'goodsList.goods'], { fetchGoods })(CartPage);
