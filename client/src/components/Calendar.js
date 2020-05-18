import React from 'react';
import withStore from '../utils/workWithRedux';
import CalendarComp from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/scss/Calendar.scss';
import Moment from '../utils/Moment';

const Calendar = ({ calendarData: { date, selectedDate }, actions: { selectDate } }) => {
  return (
    <div className='row justify-content-center'>
      <div className='col-lg-6 col-12'>
        <CalendarComp className='calendar' onChange={(day) => selectDate(day)} defaultValue={[(new Date(2020, 4, 1), new Date(2020, 4, 8)), new Date(2020, 4, 15)]} />
      </div>
      <div className='col-lg-6 col-12'>
        <p>{selectedDate ? `Вы выбрали дату: ${Moment.convertDate(selectedDate, 'dddd D MMMM')} ` : 'Выберите дату!'}</p>
      </div>
    </div>
  );
};

export default withStore(Calendar);
