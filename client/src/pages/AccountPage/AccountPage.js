import React, { useState, useEffect } from 'react';
import LoadingData from '../../components/LoadingData';
import Reviews from './Reviews/Reviews';
import BoughtGoods from './BoughtGoods';
import UpdateUserDataBtn from './UpdateUserDataBtn';
import FileUploader from '../../components/FileUploader/FileUploader';
import './AccountPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { isLogout } from '../../actions/userData';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { createValidImgSrc, validateInput, STORE_NAME } from '../../utils/workWithBrowser';
import { toggleUploadAvatarMenu } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { ReactTitle } from 'react-meta-tags';

const AccountPage = ({
  userData: { loading, error, userName, fullName, email, about, avatar, avatarSrc },
  actions: { isLogout },
}) => {
  const [localUserName, updateLocalUserName] = useState(userName),
    [localUserFullName, updateLocalFullName] = useState(fullName),
    [localUserEmail, updateLocalUserEmail] = useState(email),
    [localUserAvatar, updateLocalUserAvatar] = useState({ avatarSrc, avatar }),
    [localUserInfo, updateLocalUserInfo] = useState(about);

  useEffect(() => {
    updateLocalUserName(userName);
  }, [userName]);
  useEffect(() => {
    updateLocalUserEmail(email);
  }, [email]);
  useEffect(() => {
    updateLocalFullName(fullName);
  }, [fullName]);
  useEffect(() => {
    updateLocalUserInfo(about);
  }, [about]);
  useEffect(() => {
    updateLocalUserAvatar((avatarData) => ({
      ...avatarData,
      avatarSrc,
    }));
  }, [avatarSrc]);

  if (userName === 'admin') {
    return <Redirect to='/admin' />;
  }
  return (
    <div className='accountPage'>
      <ReactTitle title={`${STORE_NAME} | Аккаунт`} />
      <LoadingData
        configData={{
          loading,
          error: userName ? null : error,
        }}
      >
        <form className='accountPage__userInfo'>
          <div className='accountPage__userInfo-detail row justify-content-center'>
            <div className='col-lg-9 row'>
              <div className='col-lg-4'>
                <div
                  className='userAvatar'
                  onMouseEnter={(e) => toggleUploadAvatarMenu(e, 'show')}
                  onMouseLeave={(e) => toggleUploadAvatarMenu(e, 'hide')}
                >
                  <img src={createValidImgSrc(localUserAvatar.avatarSrc)} alt={`${userName}-avatar`} />
                  <div
                    className={`userAvatar__menu ${
                      localUserAvatar.avatarSrc !== avatarSrc ? 'flexWrapColumn_FS' : 'flexWrapColumn_center'
                    }`}
                  >
                    <FileUploader
                      text='Обновить'
                      withDropDown={false}
                      action={(file, src) => updateLocalUserAvatar({ avatarSrc: src, avatar: file })}
                    />
                    {localUserAvatar.avatarSrc !== avatarSrc ? (
                      <button
                        type='button'
                        className='btn'
                        onClick={() =>
                          updateLocalUserAvatar({
                            avatar,
                            avatarSrc,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faUndo} />
                        Отменить
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className='col-lg-8'>
                <div className='formGroup'>
                  <input
                    type='text'
                    className='formControl fullName'
                    value={localUserFullName?.trimStart()}
                    onChange={(e) => validateInput(e, updateLocalFullName)}
                  />
                  <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
                </div>
                <div className='formGroup row'>
                  <label className='col-3 formControlLable'>Логин:</label>
                  <div className='col-9 userLogin'>
                    <input
                      type='text'
                      className='formControl'
                      value={localUserName?.trimStart()}
                      onChange={(e) => validateInput(e, updateLocalUserName)}
                    />
                    <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
                  </div>
                </div>
                <div className='formGroup row'>
                  <label className='col-3 formControlLable'>Почта:</label>
                  <div className='col-9 userEmail'>
                    <input
                      type='text'
                      className='formControl'
                      value={localUserEmail?.trimStart()}
                      onChange={(e) => validateInput(e, updateLocalUserEmail)}
                    />
                    <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <textarea
            value={localUserInfo}
            rows={50}
            className='accountPage__userInfo-aboutUser formControl'
            placeholder='Расскажите о себе...'
            onChange={(e) => updateLocalUserInfo(e.target.value)}
          />
          <UpdateUserDataBtn
            newUserData={{
              userName: localUserName,
              fullName: localUserFullName,
              email: localUserEmail,
              about: localUserInfo,
              avatar: localUserAvatar,
            }}
          />
        </form>
        <div className='accountPage__boughtGoods'>
          <BoughtGoods />
        </div>
        <div className='accountPage__reviews'>
          <Reviews />
        </div>
        <Link
          className='accountPage__exitBtn btn btn_center'
          to={{ pathname: '/', state: 'logOut' }}
          onClick={() => isLogout()}
        >
          Выход
        </Link>
      </LoadingData>
    </div>
  );
};

export default connectToStore(['userData'], { isLogout })(AccountPage);
