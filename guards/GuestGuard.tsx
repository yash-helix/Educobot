import { ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { push } = useRouter();

  const { isAuthenticated, user } = useAuth();


  useEffect(() => {
    const role = user.role.toLowerCase();
    if (isAuthenticated) {
      push(user.role=="Student" ? PATH_DASHBOARD.root : PATH_DASHBOARD.teacher.root);
      //push(role!=="" ? PATH_DASHBOARD[role].root : PATH_DASHBOARD.root)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
}
