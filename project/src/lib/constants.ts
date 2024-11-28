import type { FurnitureTemplate } from './types';

export const FURNITURE_TEMPLATES: FurnitureTemplate[] = [
  {
    id: 'round-table',
    name: 'Round Table',
    icon: '⭕',
    width: 2,
    height: 2,
    color: 'yellow'
  },
  {
    id: 'rect-table',
    name: 'Rectangle Table',
    icon: '⬛',
    width: 3,
    height: 2,
    color: 'red'
  },
  {
    id: 'square-table',
    name: 'Square Table',
    icon: '▫️',
    width: 1,
    height: 1,
    color: 'blue'
  }
];