import { defaultActions } from "./default";

export const chekAccessToAuthPages = async (history, ...defaultParams) => {
  const errorFunc = (userName) => {
    if (userName) {
      history.push('/MyAccount/');
      alert('Вы уже зарегистрированы!');
    }
  };
  await defaultActions(...defaultParams, errorFunc);
};
