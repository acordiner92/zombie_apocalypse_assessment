import { Movement, Position } from './Character';
/**
 * Parses command line value into the zombie position value.
 *
 * @param {string} value
 * @returns {Position}
 */
export const parseZombiePosition = (value: string): Position => {
  const [x, y] = value.split(',');
  return {
    x: parseInt(x),
    y: parseInt(y),
  };
};

/**
 * Parses command line value into creature position array.
 *
 * @param {string} value
 * @returns {ReadonlyArray<Position>}
 */
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

/**
 * Parses command line value into movements array
 *
 * @param {*} x
 * @returns
 */
export const parseMovements = (value: string): ReadonlyArray<Movement> =>
  value.split('').map(x => {
    switch (x) {
      case 'U':
        return Movement.up;
      case 'R':
        return Movement.right;
      case 'D':
        return Movement.down;
      default:
        return Movement.left;
    }
  });
