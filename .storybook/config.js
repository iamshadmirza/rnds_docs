import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider, theme } from '../react-native-design-system/index';

function loadStories() {
  const req = require.context("../react-native-design-system", true, /\.stories\.js?$/);
  req.keys().forEach(story => req(story));
}

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

