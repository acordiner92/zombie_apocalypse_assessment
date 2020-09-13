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
      expect(result.zombiePositions).toStrictEqual([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ]);
    });

    test('if a zombie moves and bites a creature and that creature bites another creature then the score is 2', () => {
      const zombiePosition = { x: 0, y: 0 };
      const creaturePositions = [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ];
      const result = execute(3, zombiePosition, creaturePositions, [
        Movement.right,
      ]);
      expect(result.zombieScore).toBe(2);
    });

    test('if a zombie moves and bites a creature and that creature bites another creature then there should be 3 zombie positions', () => {
      const zombiePosition = { x: 0, y: 0 };
      const creaturePositions = [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ];
      const result = execute(3, zombiePosition, creaturePositions, [
        Movement.right,
      ]);
      expect(result.zombiePositions).toStrictEqual([
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 0 },
      ]);
    });

    test('if a zombie moves and bites a creature and that creature bites another creature from an edge move then there should be 3 zombie positions', () => {
      const zombiePosition = { x: 0, y: 0 };
      const creaturePositions = [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ];
      const result = execute(3, zombiePosition, creaturePositions, [
        Movement.left,
      ]);
      expect(result.zombiePositions).toStrictEqual([
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ]);
    });

    test('multi movement executes correctly and shows correct zombie positions', () => {
      const zombiePosition = { x: 2, y: 1 };
      const creaturePositions = [
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 3, y: 1 },
      ];
      const result = execute(4, zombiePosition, creaturePositions, [
        Movement.down,
        Movement.left,
        Movement.up,
        Movement.up,
        Movement.right,
        Movement.right,
      ]);
      expect(result.zombiePositions).toStrictEqual([
        { x: 3, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ]);
    });

    test('multi movement executes correctly and shows correct zombie score', () => {
      const zombiePosition = { x: 2, y: 1 };
      const creaturePositions = [
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 3, y: 1 },
      ];
      const result = execute(4, zombiePosition, creaturePositions, [
        Movement.down,
        Movement.left,
        Movement.up,
        Movement.up,
        Movement.right,
        Movement.right,
      ]);
      expect(result.zombieScore).toStrictEqual(3);
    });
  });
});
