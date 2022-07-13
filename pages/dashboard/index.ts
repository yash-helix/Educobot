import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// config
import { PATH_AFTER_LOGIN } from '../../config';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Index() {
  const { user } = useAuth();
  
  const { pathname, replace, prefetch } = useRouter();
  const role = user.role.toLowerCase();

  useEffect(() => {
    // if (pathname === PATH_DASHBOARD.root) {
    //   replace(PATH_AFTER_LOGIN);
    // }
    
    replace(PATH_DASHBOARD[role].root)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // useEffect(() => {
  //   prefetch(PATH_AFTER_LOGIN);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return null;
}
