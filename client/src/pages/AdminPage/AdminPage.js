import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminPage = ({ userData: { userName, loading, error } }) => {
  return (
    <LoadingData
      configData={{
        loading,
        error,
      }}
    >
      <h2>Страница админа!</h2>
      <Link className='btn btn-success' to='/admin/createCommodity/'>
        Создать новый товар <FontAwesomeIcon icon={faPlus} />
      </Link>
    </LoadingData>
  );
};

export default connectToStore(['userData'], null)(AdminPage);
