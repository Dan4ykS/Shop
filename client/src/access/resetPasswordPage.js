import { defaultActions } from "./default";

export const chekAccessToResetPasswordPage = async (token, ...defaultParams) => {
  // const token = { token: history.location.pathname.split('=')[1] };
  console.log(token)
  const errorFunc = (userName) => {
    if (!userName) {
      alert('Ваш токен устарел, попробуйте снова!');
    }
  };
  await defaultActions(token, ...defaultParams, errorFunc);
};
