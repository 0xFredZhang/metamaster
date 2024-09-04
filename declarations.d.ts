declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-virtual-keyboard';
declare module 'react-native-simple-bottom-sheet';
