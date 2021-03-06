// @flow

export const width = 27;
export const height = 36;

export type Command = {
  p: string,
  x: number | null,
  y: number | null,
  h?: boolean,
  v?: boolean
}

export const commands: Array<Command> = [
  // Outer logo shape
  { p: 'M', x: 12.6731383, y: 27.4000435, v: true },
  { p: 'C', x: 11.5872979, y: 32.0698934, v: true },
  { p: '', x: 7.36372527, y: 34.4757822, v: true },
  { p: '', x: 0.83932178, y: 35.5998349, v: true },
  { p: 'L', x: 0.333171707, y: 33.2633818, v: true },
  { p: 'C', x: 5.97312967, y: 32.3141978, v: true },
  { p: '', x: 9.95002311, y: 30.1602802, v: true },
  { p: '', x: 9.95002311, y: 25.0127821, v: true },
  { p: 'L', x: 9.95002311, y: 11.0305711 },
  { p: 'L', x: 1.99623623, y: 11.0305711 },
  { p: 'L', x: 1.99623623, y: 8.65761105 },
  { p: 'L', x: 18.6387039, y: 8.65886646, h: true },
  { p: 'L', x: 19.0002396, y: 12.3460814, h: true },
  { p: 'C', x: 20.1210005, y: 9.60805049, h: true },
  { p: '', x: 22.217908, y: 8.22078152, h: true },
  { p: '', x: 24.4955833, y: 8.22078152, h: true },
  { p: 'C', x: 25.4355763, y: 8.22078152, h: true },
  { p: '', x: 26.0863407, y: 8.29379567, h: true },
  { p: '', x: 26.9901801, y: 8.51283814, h: true },
  { p: 'L', x: 26.4478764, y: 11.5064186, h: true },
  { p: 'C', x: 25.6163442, y: 11.2873761, h: true },
  { p: '', x: 25.0378869, y: 11.1778549, h: true },
  { p: '', x: 24.2425083, y: 11.1778549, h: true },
  { p: 'C', x: 21.6756043, y: 11.1778549, h: true },
  { p: '', x: 19.6871576, y: 13.6968433, h: true },
  { p: '', x: 19.0363932, y: 16.36186, h: true },
  { p: 'L', x: 19.0363932, y: 24.9905764, h: true, v: true },
  { p: 'L', x: 24.3871226, y: 24.9905764, h: true, v: true },
  { p: 'L', x: 24.3871226, y: 27.4000435, h: true, v: true },
  { p: 'L', x: 12.6731383, y: 27.4000435, v: true },
  { p: 'Z', x: null, y: null },

  // Inner box
  { p: 'M', x: 13, y: 11 },
  { p: 'L', x: 13, y: 25, v: true },
  { p: 'L', x: 16, y: 25, h: true, v: true },
  { p: 'L', x: 16, y: 11, h: true },
  { p: 'L', x: 13, y: 11 },
  { p: 'Z', x: null, y: null }
];
