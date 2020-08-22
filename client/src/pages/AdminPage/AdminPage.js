import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { isLogout } from '../../actions/userData';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';

const AdminPage = ({ userData: { loading, error }, actions: { isLogout }, history }) => {
  return (
    <div className='adminPage'>
      <ReactTitle title={`${STORE_NAME} | Админ панель`} />
      <LoadingData
        configData={{
          loading,
          error,
        }}
      >
        <h2>Страница админа!</h2>
        <Link className='btn' to={{ pathname: '/', state: 'logOut' }} onClick={() => isLogout()}>
          Выход
        </Link>
        <Link className='btn' to='/admin/createCommodity'>
          Создать новый товар <FontAwesomeIcon icon={faPlus} />
        </Link>
      </LoadingData>
    </div>
  );
};

export default connectToStore(['userData'], { isLogout })(AdminPage);
