import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { isLogout } from '../../actions/userData';

const AdminPage = ({ userData: { loading, error }, actions: { isLogout }, history }) => {
  return (
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
  );
};

export default connectToStore(['userData'], { isLogout })(AdminPage);
