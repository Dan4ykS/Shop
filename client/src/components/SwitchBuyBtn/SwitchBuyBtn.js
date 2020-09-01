import React from 'react';
import { Link } from 'react-router-dom';
import { onAddedToCart } from '../../actions/shopingCart';
import { connectToStore } from '../../utils/workWithRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { redirectToPage } from '../../utils/workWithBrowser';

const SwitchBuyBtn = ({ userData: { token, userName }, actions: { onAddedToCart }, id, history }) => {
  if (userName === 'admin') {
    return (
      <Link className='btn' to={`/admin/updateCommodity/${id}`}>
        <FontAwesomeIcon icon={faWrench}/>
      </Link>
    );
  }
  if (!userName) {
    return <button className='btn' onClick={() => { 
      const redirectToAuthPage = window.confirm('Для того чтобы купить товар нужно авторизироваться')
      if (redirectToAuthPage) {
        redirectToPage(history, '/Login')
      }
    }}>Купить</button>;
  }
  if (userName) {
    return <button className='btn' onClick={() => onAddedToCart(id, token)}>Купить</button>;
  }
};

export default connectToStore(['userData'], { onAddedToCart })(SwitchBuyBtn, true);
