import {
  parseZombiePosition,
  parseCreaturePositions,
  parseMovements,
} from '../src/SimulatorSetupParser';
import { Movement } from '../src/Character';

describe('SimulatorSetupParse', () => {
  describe('parseZombiePosition', () => {
    test('string value gets mapped correct to position', () =>
      expect(parseZombiePosition('1,2')).toStrictEqual({
        x: 1,
        y: 2,
      }));
  });

  describe('parseCreaturePositions', () => {
    test('single creature position value gets mapped to array of 1 position', () =>
      expect(parseCreaturePositions('1,2')).toStrictEqual([
        {
          x: 1,
          y: 2,
        },
      ]));

    test('2 creature position values gets mapped to array of 2 positions', () =>
      expect(parseCreaturePositions('1,2 2,1')).toStrictEqual([
        {
          x: 1,
          y: 2,
        },
        {
          x: 2,
          y: 1,
        },
      ]));
  });

  describe('parseMovements', () => {
    test('U maps to Movement.up', () =>
      expect(parseMovements('U')).toStrictEqual([Movement.up]));

    test('R maps to Movement.up', () =>
      expect(parseMovements('R')).toStrictEqual([Movement.right]));

    test('D maps to Movement.up', () =>
      expect(parseMovements('D')).toStrictEqual([Movement.down]));

    test('L maps to Movement.up', () =>
      expect(parseMovements('L')).toStrictEqual([Movement.left]));

    test('Multi values maps to multi movements', () =>
      expect(parseMovements('LRD')).toStrictEqual([
        Movement.left,
        Movement.right,
        Movement.down,
      ]));
  });
});
