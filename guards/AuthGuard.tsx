import { useState, ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';
// components
import { PATH_DASHBOARD } from "../routes/paths"
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

type Props = {
    children: ReactNode;
};

export default function AuthGuard({ children }: Props) {

    const { isAuthenticated, isInitialized, user } = useAuth();

    const { pathname, push } = useRouter();
    const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    let loadding = false

    const getRole = () => {
      if(!loadding) loadding=true

        const role = user.role.toLowerCase();
        
        const re = new RegExp(String.raw`dashboard/${role}/?`)
        // console.log(re, pathname.search(re), pathname.search(re)>=0);

        if (!role || (pathname.search(re))>=0) return;
        else push(PATH_DASHBOARD[role].root)
        
        loadding=false
        //push((pathname.replace(/(?<=dashboard\/)(.*?)(?=\/)/, role)))\
    }

    useEffect(() => {
        if (requestedLocation && pathname !== requestedLocation) {
            setRequestedLocation(null);
            push(requestedLocation);
        }
    }, [pathname, push, requestedLocation]);

    if (!isInitialized || loadding) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    getRole()
    return <>{children}</>;
}
