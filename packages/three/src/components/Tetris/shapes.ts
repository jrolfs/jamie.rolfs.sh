import { Shape } from 'three';

export const THICKNESS = 10;

export const shapes = {
  I: () => {
    const s = new Shape();

    s.moveTo(0, 0);
    s.lineTo(3 * THICKNESS, 0);
    s.lineTo(3 * THICKNESS, THICKNESS);
    s.lineTo(0, THICKNESS);

    return s;
  },
  L: () => {
    const s = new Shape();

    s.moveTo(0, 0);
    s.lineTo(THICKNESS * 2, 0);
    s.lineTo(THICKNESS * 2, THICKNESS);
    s.lineTo(THICKNESS, THICKNESS);
    s.lineTo(THICKNESS, THICKNESS * 3);
    s.lineTo(0, THICKNESS * 3);

    return s;
  },
  O: () => {
    const s = new Shape();

    s.moveTo(0, 0);
    s.lineTo(THICKNESS, 0);
    s.lineTo(THICKNESS, THICKNESS);
    s.lineTo(0, THICKNESS);

    return s;
  },
  T: () => {
    const s = new Shape();

    s.moveTo(0, 0);
    s.lineTo(THICKNESS, 0);
    s.lineTo(THICKNESS, THICKNESS * 3);
    s.lineTo(0, THICKNESS * 3);
    s.lineTo(0, THICKNESS * 2);
    s.lineTo(-THICKNESS, THICKNESS * 2);
    s.lineTo(-THICKNESS, THICKNESS);
    s.lineTo(0, THICKNESS);

    return s;
  },
  Z: () => {
    const s = new Shape();

    s.moveTo(0, 0);
    s.lineTo(THICKNESS, 0);
    s.lineTo(THICKNESS, THICKNESS * 2);
    s.lineTo(0, THICKNESS * 2);
    s.lineTo(0, THICKNESS * 3);
    s.lineTo(-THICKNESS, THICKNESS * 3);
    s.lineTo(-THICKNESS, THICKNESS);
    s.lineTo(0, THICKNESS);

    return s;
  },
} as const;
