export const trimText = (text, maxlength) => {
  if (!maxlength) {
    return text;
  }
  return text.length > maxlength ? text.substr(0, maxlength - 3) + '...' : text;
};
