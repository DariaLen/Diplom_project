import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';

export function useBreadcrumbs ( details ) {

  const {state, pathname} = useLocation();

  return useMemo( () => {
    if ( !details.length ) {
      return [];
    }
    const [singleProduct] = details
    const {title} = singleProduct

    const breadcrumbs = [
      {label: "Main page", path: "/"},
      ...state,
      {
        label: title,
        path: pathname,
        active: true,
      },
    ];

    return breadcrumbs
  }, [details] )
}