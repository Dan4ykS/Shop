import { LOAD_PROMPT, CLEAR_PROMPT } from '../actions/types';

const updateDataForPrompt = (state, action) => {
  if (state === undefined) {
    return {
      genres: [],
      authors: [],
      tags: [],
    };
  }
  switch (action.type) {
    case LOAD_PROMPT:
      return {
        ...action.payload,
      };

    case CLEAR_PROMPT:
      return {
        genres: [],
        authors: [],
        tags: [],
      };
    default:
      return state.dataForPrompt;
  }
};

export default updateDataForPrompt;
