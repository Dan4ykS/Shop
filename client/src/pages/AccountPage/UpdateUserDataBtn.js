import React, { useEffect, useState } from 'react';
import { connectToStore } from '../../utils/workWithRedux';
import { chekValidDataInForm } from '../../utils/workWithBrowser';
import { updateUserData } from '../../actions/userData';

const UpdateUserDataBtn = ({ userData, newUserData, actions: { updateUserData } }) => {
  const [updatedData, changeUpdatedData] = useState({});

  useEffect(() => {
    for (const key in newUserData) {
      if (key === 'avatar') {
        changeUpdatedData((data) => ({
          ...data,
          [key]: newUserData.avatar.avatarSrc !== userData.avatarSrc ? newUserData.avatar : null,
        }));
      } else {
        changeUpdatedData((data) => ({
          ...data,
          [key]: newUserData[key].trim() !== userData[key] ? newUserData[key].trim() : null,
        }));
      }
    }
  }, [newUserData, userData]);

  if (Object.keys(updatedData).length && !allDataIsOld(updatedData) && chekValidDataInForm('.accountPage__userInfo')) {
    return (
      <button
        onClick={async (e) => {
          e.persist();
          e.preventDefault();
          e.target.disabled = true;
          await updateUserData(updatedData, userData.token);
          e.target.disabled = false;
        }}
        className='btn'
      >
        Обновить данные
      </button>
    );
  } else {
    return null;
  }
};

const allDataIsOld = (updatedData) => {
  for (const key in updatedData) {
    if (updatedData[key]) {
      return false;
    }
  }
  return true;
};

export default connectToStore(['userData'], { updateUserData })(UpdateUserDataBtn);
