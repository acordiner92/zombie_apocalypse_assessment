import {
  isZombiePositionValid,
  isCreaturePositionValid,
  isMovementsValid,
} from '../src/GameSetupValidator';

describe('GameSetupValidator', () => {
  describe('isZombiePositionValid', () => {
    test('error message is return if invalid', () =>
      expect(isZombiePositionValid('1')).toBe(
        'Invalid zombie position format, correct format should be e.g 1,2',
      ));

    test('true is return if valid', () =>
      expect(isZombiePositionValid('1,2')).toBeTruthy());
  });

  describe('isCreaturePositionValid', () => {
    test('error message is return if invalid', () =>
      expect(isCreaturePositionValid('1')).toBe(
        'Invalid creature positions format, correct format should be e.g 1,2 0,1',
      ));

    test('true is return if valid', () =>
      expect(isCreaturePositionValid('1,2 0,1')).toBeTruthy());
  });

  describe('isMovementsValid', () => {
    test('error message is return if invalid', () =>
      expect(isMovementsValid('A')).toBe(
        'Invalid movements, valid movements are URDL e.g DDRULL',
      ));

    test('true is return if valid', () =>
      expect(isMovementsValid('LR')).toBeTruthy());
  });
});
