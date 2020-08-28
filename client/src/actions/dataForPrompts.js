import GoodsService from '../services/GoodsService';
import { createAction } from '../utils/workWithRedux';
import { LOAD_ALL_PROMPTS, CLEAR_PROMPT, UPDATE_PROMPTS_AUTHORS } from './types';

export const loadPrompts = (data) => createAction(LOAD_ALL_PROMPTS, data);

export const updatePromptsAuthors = (authors) => createAction(UPDATE_PROMPTS_AUTHORS, authors);

export const clearPrompts = () => createAction(CLEAR_PROMPT);

export const loadPromptFomServer = (token) => async (dispatch) => {
  const authors = await GoodsService.getAuthors(token),
    tags = await GoodsService.getTags(token),
    genres = await GoodsService.getGenres(token);

  dispatch(loadPrompts({ authors, tags, genres }));
};
