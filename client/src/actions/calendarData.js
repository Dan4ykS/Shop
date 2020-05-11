const selectDate = (date) => {
  return {
    type: 'SELECT_DATE',
    payload: date,
  };
};

export const changeSelectedDate = (dispatch) => (date) => { 
  dispatch(selectDate(date))
}
