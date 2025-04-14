import { SocialLoginProvider } from '../lib/stores/useAuthStore';

const mapProviderToKR = (provider: SocialLoginProvider) => {
  if (provider === 'google') {
    return '구글';
  } else {
    return '카카오';
  }
};

export { mapProviderToKR };
