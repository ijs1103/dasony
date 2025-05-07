import { WebView } from 'react-native-webview';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useSettingsStackRoute } from '@/app/navigation/SettingsStackNavigator';

export const WebViewScreen: React.FC = () => {
  const route = useSettingsStackRoute();
  return (
    <ScreenLayout title="약관">
      <WebView
        source={{ uri: route.params?.uri ?? 'https://reactnative.dev/' }}
      />
    </ScreenLayout>
  );
};
