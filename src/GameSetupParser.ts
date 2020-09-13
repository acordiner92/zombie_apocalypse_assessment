import { Movement, Position } from './Character';

export const parseZombiePosition = (value: string): Position => {
  const [x, y] = value.split(',');
  return {
    x: parseInt(x),
    y: parseInt(y),
  };
};

export const parseCreaturePositions = (
  value: string,
): ReadonlyArray<Position> => {
  const positions = value.split(' ');
  return positions.map(p => {
    const [x, y] = p.split(',');
    return {
      x: parseInt(x),
      y: parseInt(y),
    };
  });
};

export const parseMovements = (value: string): ReadonlyArray<Movement> =>
  value.split('').map(x => {
    switch (x) {
      case 'U':
        return Movement.up;
      case 'R':
        return Movement.right;
      case 'D':
        return Movement.down;
      case 'L':
        return Movement.left;
      default:
        throw new Error(
          `movment ${x} does not exists, Supported movements are U,R,D,L`,
        );
    }
  });
