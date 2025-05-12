import { WebView } from 'react-native-webview';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useSettingsStackRoute } from '@/app/navigation/SettingsStackNavigator';
import { WEB_VIEW_URL } from '@/shared/utils/constants';

export const WebViewScreen: React.FC = () => {
  const route = useSettingsStackRoute();
  return (
    <ScreenLayout title="약관">
      <WebView
        source={{ uri: route.params?.uri ?? WEB_VIEW_URL.SERVICE_POLICY }}
      />
    </ScreenLayout>
  );
};
