module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './components',
          '@assets': './assets',
          '@utils': './utils',
        },
      },
    ],
  ],
};
