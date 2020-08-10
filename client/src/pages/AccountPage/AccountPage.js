import React from 'react';
import LoadingData from '../../components/LoadingData';
import './AccountPage.scss'
import { connectToStore } from '../../utils/workWithRedux';
import { isLogout } from '../../actions/userData';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { createValidImgSrc } from '../../utils/workWithBrowser';

const AccountPage = ({
  userData: { loading, error, userName, fullName,  email, about, avatar, reviews, boughtGoods },
  actions: { isLogout },
  history,
}) => {
  if (userName === 'admin') {
    return <Redirect to='/admin' />;
  }
  return (
    <div className='accountPage'>
      <LoadingData
        configData={{
          loading,
          error: userName ? null : error,
        }}
      >
        <form className='accountPage__userInfo'>
          <div className='accountPage__userInfo-detail row justify-content-center'>
            <div className='col-lg-9 row'>
              <div className='col-lg-3 userAvatar'>
                <img src={createValidImgSrc(avatar)} alt={`${userName}-avatar`} />
              </div>
              <div className='col-lg-8 offset-lg-1'>
                <div className='formGroup'>
                <input type='text' className='formControl' value={fullName} />
                </div>

                <div className='formGroup row'>
                  <label className='col-sm-3 formControlLable'>Логин:</label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='formControl'
                      value={userName}
                      // onChange={(e) => validateInput(e, updateTitle)}
                    />
                    <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
                  </div>
                </div>
                <div className='formGroup row'>
                  <label className='col-sm-3 formControlLable'>Почта:</label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='formControl'
                      value={email}
                      // onChange={(e) => validateInput(e, updateTitle)}
                    />
                    <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <textarea
            value={about}
            rows={50}
            className='accountPage__userInfo-aboutUser formControl'
            placeholder='Расскажите о себе'
          />
        </form>
        <Link className='btn' to={{ pathname: '/', state: 'logOut' }} onClick={() => isLogout()}>
          Выход
        </Link>
      </LoadingData>
    </div>
  );
};

export default connectToStore(['userData'], { isLogout })(AccountPage, true);
