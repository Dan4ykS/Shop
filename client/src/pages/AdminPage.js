import React from 'react';
import { connectToStore } from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminPage = ({ userData: { userName, loading, error } }) => {
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
    </LoadingDataLogic>
  );
};

export default connectToStore(['userData'], null)(AdminPage);
