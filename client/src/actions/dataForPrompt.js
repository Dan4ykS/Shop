import GoodsService from '../services/GoodsService';
import { createAction } from '../utils/workWithRedux';
import { LOAD_PROMPT, CLEAR_PROMPT } from './types';

export const loadPrompt = (data) => createAction(LOAD_PROMPT, data);

export const clearPrompt = () => createAction(CLEAR_PROMPT);

export const loadPromptFomServer = (token) => async (dispatch) => {
  const authors = await GoodsService.getAuthors(token),
    tags = await GoodsService.getTags(token),
    genres = await GoodsService.getGenres(token);

  dispatch(loadPrompt({ authors, tags, genres }));
};