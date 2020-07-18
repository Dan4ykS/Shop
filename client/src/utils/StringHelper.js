import { nanoid } from 'nanoid';
import { camelCase, titleCase, latinise } from 'voca';

class StringHelper {
  createId = () => nanoid();

  formatTitle = (title) => titleCase(title, [' ']);

  toCamelCase = (string) => camelCase(string);

  latinise = (string) => latinise(string);
}

export default new StringHelper();
