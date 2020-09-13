import { execute } from '../src/Simulator';
import { Movement } from '../src/Character';

describe('Simulator', () => {
  describe('execute', () => {
    test('if a zombie moves but bites no one then score is zero', () => {
      const simulatorSetup = {
        boardDimension: 3,
        zombiePosition: { x: 0, y: 0 },
        creaturePositions: [{ x: 1, y: 1 }],
        movements: [Movement.down],
      };
      const result = execute(simulatorSetup);

      expect(result.zombieScore).toBe(0);
    });

    test('if a zombie moves but bites no one then there should only be 1 zombie position', () => {
      const simulatorSetup = {
        boardDimension: 3,
        zombiePosition: { x: 0, y: 0 },
        creaturePositions: [{ x: 1, y: 1 }],
        movements: [Movement.down],
      };
      const result = execute(simulatorSetup);
      expect(result.zombiePositions).toStrictEqual([{ x: 0, y: 1 }]);
    });

    test('if a zombie moves and bites then score is 1', () => {
      const simulatorSetup = {
        boardDimension: 3,
        zombiePosition: { x: 0, y: 0 },
        creaturePositions: [{ x: 0, y: 1 }],
        movements: [Movement.down],
      };
      const result = execute(simulatorSetup);
      expect(result.zombieScore).toBe(1);
    });

    test('if a zombie moves and bites then there should be 2 zombie positions', () => {
      const simulatorSetup = {
        boardDimension: 3,
        zombiePosition: { x: 0, y: 0 },
        creaturePositions: [{ x: 0, y: 1 }],
        movements: [Movement.down],
      };
      const result = execute(simulatorSetup);
      expect(result.zombiePositions).toStrictEqual([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ]);
    });

    test('if a zombie moves and bites a creature and that creature bites another creature then the score is 2', () => {
      const simulatorSetup = {
        boardDimension: 3,
        zombiePosition: { x: 0, y: 0 },
        creaturePositions: [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
        ],
        movements: [Movement.right],
      };

      const result = execute(simulatorSetup);
      expect(result.zombieScore).toBe(2);
    });

    test('if a zombie moves and bites a creature and that creature bites another creature then there should be 3 zombie positions', () => {
      const simulatorSetup = {
        boardDimension: 3,
        zombiePosition: { x: 0, y: 0 },
        creaturePositions: [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
        ],
        movements: [Movement.right],
      };

      const result = execute(simulatorSetup);
      expect(result.zombiePositions).toStrictEqual([
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 0 },
      ]);
    });

    test('if a zombie moves and bites a creature and that creature bites another creature from an edge move then there should be 3 zombie positions', () => {
      const simulatorSetup = {
        boardDimension: 3,
        zombiePosition: { x: 0, y: 0 },
        creaturePositions: [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
        ],
        movements: [Movement.left],
      };

      const result = execute(simulatorSetup);
      expect(result.zombiePositions).toStrictEqual([
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ]);
    });

    test('multi movement executes correctly and shows correct zombie positions', () => {
      const simulatorSetup = {
        boardDimension: 4,
        zombiePosition: { x: 2, y: 1 },
        creaturePositions: [
          { x: 0, y: 1 },
          { x: 1, y: 2 },
          { x: 3, y: 1 },
        ],
        movements: [
          Movement.down,
          Movement.left,
          Movement.up,
          Movement.up,
          Movement.right,
          Movement.right,
        ],
      };

      const result = execute(simulatorSetup);
      expect(result.zombiePositions).toStrictEqual([
        { x: 3, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ]);
    });

    test('multi movement executes correctly and shows correct zombie score', () => {
      const simulatorSetup = {
        boardDimension: 4,
        zombiePosition: { x: 2, y: 1 },
        creaturePositions: [
          { x: 0, y: 1 },
          { x: 1, y: 2 },
          { x: 3, y: 1 },
        ],
        movements: [
          Movement.down,
          Movement.left,
          Movement.up,
          Movement.up,
          Movement.right,
          Movement.right,
        ],
      };

      const result = execute(simulatorSetup);
      expect(result.zombieScore).toStrictEqual(3);
    });
  });
});
