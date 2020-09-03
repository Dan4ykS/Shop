import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchAdminData } from '../../actions/userData';
import { createValidImgSrc } from '../../utils/workWithBrowser';
import TextWithBr from '../../components/TextWithBr/TextWithBr';

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
        <div className='mainPage__aboutAuthor-avatar col-lg-3 flexWrapColumn_center'>
          <div className='userAvatar'>
            <img src={createValidImgSrc(avatar)} alt='adminAvatar' />
          </div>
          <p>{fullName}</p>
        </div>
        <div className='col-lg-8 flexWrapColumn_FS'>
          <h2>Создатель сайта "WebBook"</h2>
          <div className='aboutAuthor'>
            <TextWithBr text={about} />
          </div>
        </div>
      </div>
    </LoadingData>
  );
};

export default connectToStore(['userData.adminData'], { fetchAdminData })(AboutAuthor);
