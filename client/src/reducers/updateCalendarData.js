const updateCalendarData = (state, action) => {
  if (state === undefined) {
    return {
      date: new Date(),
      selectedDate: null,
    };
  }
  switch (action.type) {
    case 'SELECT_DATE':
      return {
        date: action.payload,
        selectedDate: action.payload,
      };
    default:
      return state.calendarData;
  }
};

export default updateCalendarData;
