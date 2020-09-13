/**
 * Determines whether the user input is valid or not when
 * entering in zombies' position.
 *
 * @param {string} value
 * @returns {(boolean | string)}
 */
export const isZombiePositionValid = (value: string): boolean | string => {
  const matches = value.match(/^([0-9],[0-9])$/);
  return matches
    ? true
    : 'Invalid zombie position format, correct format should be e.g 1,2';
};

/**
 * Determines whether the user input is valid or not when
 * entering in creature' positions.
 *
 * @param {string} value
 * @returns {(boolean | string)}
 */
export const isCreaturePositionValid = (value: string): boolean | string => {
  const matches = value.match(/^(\s?[0-9],[0-9]\s?)+$/);
  return matches
    ? true
    : 'Invalid creature positions format, correct format should be e.g 1,2 0,1';
};

/**
 * Determines whether the user input is valid or not when
 * entering in zombies' movements.
 *
 * @param {string} value
 * @returns {(boolean | string)}
 */
export const isMovementsValid = (value: string): boolean | string => {
  const matches = value.match(/^[U,R,D,L]+$/);
  return matches
    ? true
    : 'Invalid movements, valid movements are URDL e.g DDRULL';
};
