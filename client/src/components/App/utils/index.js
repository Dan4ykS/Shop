import React from 'react';

export const createLazyPage = (pageName) => React.lazy(() => import(`../../../pages/${pageName}Page`));
