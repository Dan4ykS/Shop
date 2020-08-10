import React, { useEffect } from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import { connectToStore } from '../../utils/workWithRedux';
import { loadMoreGoods } from '../../actions/goodsList';
import { findNeedElement, findNeedElements } from '../../utils/workWithBrowser';

const Continuation = ({ goodsList: { updateGoods, goods }, actionType, actions: { loadMoreGoods } }) => {
  useEffect(() => {
    const moreIndicator = findNeedElement('.continuation'),
      observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(async (el) => {
            if (el.intersectionRatio > 0) {
              const shownGoodsCount = findNeedElements('.previewCard').length,
                loadGoodsCount = await loadMoreGoods({ offset: shownGoodsCount, type: actionType });

              if (loadGoodsCount < 8) {
                el.target.classList.add('hiddenElem');
              }
            }
          });
        },
        { root: null, rootMargin: '0px', threshold: 0 }
      );
    observer.observe(moreIndicator);

    return () => {
      observer.unobserve(moreIndicator);
    };
  }, [loadMoreGoods, actionType]);

  return (
    <div className={`continuation ${goods.length ? '' : 'hiddenElem'}`}>{updateGoods ? <LoadingIndicator /> : null}</div>
  );
};

export default connectToStore(['goodsList'], { loadMoreGoods })(Continuation);
