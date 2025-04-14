module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null, // 제외할 변수 (옵션)
        allowlist: null, // 포함할 변수 (옵션)
        safe: false, // .env.example과 비교 (옵션)
        allowUndefined: true, // 정의되지 않은 변수 허용 여부 (옵션)
      },
    ],
  ],
};
