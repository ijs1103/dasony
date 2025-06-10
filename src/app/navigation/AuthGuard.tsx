import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { PropsWithChildren } from 'react';
import AuthStackNavigator from './AuthStackNavigator';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <AuthStackNavigator />;
  }

  return <>{children}</>;
};

export default AuthGuard;
