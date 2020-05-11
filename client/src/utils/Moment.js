import moment from 'moment';
import 'moment/locale/ru';

class Moment {
  convertDate = (date, format) => {
    return moment(date).format(format);
  };
}

export default new Moment();
