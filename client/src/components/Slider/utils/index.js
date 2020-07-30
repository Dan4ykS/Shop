import { redirectToLink, redirectToPage, scrollToTop } from '../../../utils/workWithBrowser';

export const redirectToSlideLink = (link = '', history) => {
  if (link.startsWith('http') || link.startsWith('http')) {
    redirectToLink(link);
  } else {
    scrollToTop();
    redirectToPage(history, link);
  }
};
