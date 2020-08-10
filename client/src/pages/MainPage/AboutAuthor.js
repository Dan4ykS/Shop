import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchAdminData } from '../../actions/userData';
import { createValidImgSrc } from '../../utils/workWithBrowser';

const AboutAuthor = ({
  userData: {
    adminData: { fullName, avatar, about, loading },
  },
  actions: { fetchAdminData },
}) => {
  return (
    <LoadingData
      configData={{
        loading: loading,
        error: null,
        funcForRender: fullName ? null : fetchAdminData,
      }}
    >
      <div className='row'>
        <div className='mainPage__aboutAuthor-avatar col-3 flexWrapColumn'>
          <div className='userAvatar'>
            <img src={createValidImgSrc(avatar)} alt='adminAvatar' />
          </div>
          <p>
            {fullName}
          </p>
        </div>
        <div className='col-8 flexWrapColumn_FS'>
          <h2>Создатель сайта "WebBook"</h2>
          <p>{about}</p>
        </div>
      </div>
    </LoadingData>
  );
};

export default connectToStore(['userData.adminData'], { fetchAdminData })(AboutAuthor);
