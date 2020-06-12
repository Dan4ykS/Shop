import React from 'react';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminPage = ({ userData: { userName, loading, error }, actions: { isLogin, userLogin, invalidRoute }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
      }}
    >
      <h2>Страница админа!</h2>
      <Link className='btn btn-success' to='/admin/createCommodity/'>
        Создать новый товар <FontAwesomeIcon icon={faPlus} />
      </Link>
      <Link className='btn btn-primary' to='/admin/updateCommodity/5e84c883e2286534184940dc/'>Обновить товар</Link>
    </LoadingDataLogic>
  );
};

export default withStore(AdminPage);
