import React from 'react';
import { configure, addParameters, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import { ThemeProvider, theme } from '../react-native-design-system/index';

function loadStories() {
  const req = require.context("../react-native-design-system/src", true, /\.stories\.(js|mdx)$/);
  req.keys().forEach(story => req(story));
}

addDecorator(withKnobs)

addDecorator((Story) => {
  return (
    <ThemeProvider value={theme}>
      <Story />
    </ThemeProvider>
  );
});

configure(loadStories, module);
