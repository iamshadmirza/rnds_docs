import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react';
import { loadStories } from './storyLoader';

import './rn-addons';
import { ThemeProvider, theme } from '../react-native-design-system/index';

addDecorator(withInfo);

addDecorator((Story) => {
  return (
    <ThemeProvider value={theme}>
      <Story />
    </ThemeProvider>
  );
});

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;