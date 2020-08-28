import {
  LOAD_ALL_PROMPTS,
  CLEAR_PROMPT,
  UPDATE_PROMPTS_AUTHORS,
  UPDATE_PROMPTS_GENRES,
  UPDATE_PROMPTS_TAGS,
} from '../actions/types';

const updateDataForPrompts = (state, action) => {
  if (state === undefined) {
    return {
      genres: [],
      authors: [],
      tags: [],
    };
  }
  switch (action.type) {
    case LOAD_ALL_PROMPTS:
      return {
        ...action.payload,
      };

    case UPDATE_PROMPTS_AUTHORS:
      return {
        ...state.dataForPrompts,
        authors: action.payload,
      };

    case UPDATE_PROMPTS_GENRES:
      return {
        ...state.dataForPrompts,
        genres: action.payload,
      };

    case UPDATE_PROMPTS_TAGS:
      return {
        ...state.dataForPrompts,
        tags: action.payload,
      };

    case CLEAR_PROMPT:
      return {
        genres: [],
        authors: [],
        tags: [],
      };
    default:
      return state.dataForPrompts;
  }
};

export default updateDataForPrompts;
