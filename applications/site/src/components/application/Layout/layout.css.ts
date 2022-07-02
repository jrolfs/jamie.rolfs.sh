import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('html, body, #__next', {
  margin: 0,
  height: '100vh',
});

globalStyle('canvas', {
  touchAction: 'none',
});

export const canvas = style({
  height: '100%',
  width: '100%',
});
