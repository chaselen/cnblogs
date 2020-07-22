module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // 禁用行内样式
    'react-native/no-inline-styles': 'off',
    semi: ['warn', 'never'],
    // 拖尾逗号
    'comma-dangle': ['error', 'never']
  }
}
