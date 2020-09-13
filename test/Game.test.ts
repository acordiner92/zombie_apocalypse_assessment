import { initialize } from '../src/Board';
import { execute } from '../src/Game';
import { Movement } from '../src/Character';

describe('Game', () => {
  describe('execute', () => {
    test('if a zombie moves but bites no one then score is zero', () => {
      const zombiePosition = { x: 0, y: 0 };
      const creaturePositions = [{ x: 1, y: 1 }];
      const result = execute(3, zombiePosition, creaturePositions, [
        Movement.down,
      ]);
      expect(result.zombieScore).toBe(0);
    });

    test('if a zombie moves but bites no one then there should only be 1 zombie position', () => {
      const zombiePosition = { x: 0, y: 0 };
      const creaturePositions = [{ x: 1, y: 1 }];
      const result = execute(3, zombiePosition, creaturePositions, [
        Movement.down,
      ]);
      expect(result.zombiePositions).toStrictEqual([{ x: 0, y: 1 }]);
    });

    test('if a zombie moves and bites then score is 1', () => {
      const zombiePosition = { x: 0, y: 0 };
      const creaturePositions = [{ x: 0, y: 1 }];
      const result = execute(3, zombiePosition, creaturePositions, [
        Movement.down,
      ]);
      expect(result.zombieScore).toBe(1);
    });

    test('if a zombie moves and bites then there should be 2 zombie positions', () => {
      const zombiePosition = { x: 0, y: 0 };
      const creaturePositions = [{ x: 0, y: 1 }];
      const result = execute(3, zombiePosition, creaturePositions, [
        Movement.down,
      ]);
      expect(result.zombiePositions).toBe([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ]);
    });
  });
});
