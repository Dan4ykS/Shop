import { redirectToLink, redirectToPage } from '../../../utils/workWithBrowser';

export const redirectToSlideLink = (link = '', history) => {
  if (link.startsWith('http') || link.startsWith('http')) {
    redirectToLink(link);
  } else {
    redirectToPage(history, link);
  }
};
