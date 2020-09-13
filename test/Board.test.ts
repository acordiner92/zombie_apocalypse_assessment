import { initialize, applyZombieMove, executeZombieBite } from '../src/Board';
import { Movement } from '../src/Character';

describe('Board', () => {
  describe('initialize', () => {
    const zombiePosition = { x: 0, y: 0 };
    const creaturePositions = [{ x: 1, y: 2 }];
    const initializedBoard = initialize(4, zombiePosition, creaturePositions);

    test('x coordinate is size of dimension', () =>
      expect(initializedBoard.x).toBe(3));

    test('y coordinate is size of dimension', () =>
      expect(initializedBoard.y).toBe(3));

    test('activeZombieId is set to 0', () =>
      expect(initializedBoard.activeZombieId).toBe(0));

    test('zombie array should have 1 zombie', () =>
      expect(initializedBoard.zombies).toStrictEqual([{ id: 0, x: 0, y: 0 }]));

    test('creature array should have 2 creatures', () => {
      const twoCreaturesPositions = [...creaturePositions, { x: 2, y: 2 }];
      const initializedBoard = initialize(
        4,
        zombiePosition,
        twoCreaturesPositions,
      );
      expect(initializedBoard.creatures).toStrictEqual([
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ]);
    });
  });

  describe('applyZombieMove', () => {
    test('zombie move up by one', () => {
      const board = initialize(4, { x: 1, y: 1 }, []);
      expect(
        applyZombieMove(board, Movement.up).zombies[board.activeZombieId].y,
      ).toStrictEqual(0);
    });

    test('other end of board on y axis when moving up on a y=0 positioned zombie', () => {
      const board = initialize(4, { x: 1, y: 0 }, []);
      expect(
        applyZombieMove(board, Movement.up).zombies[board.activeZombieId].y,
      ).toStrictEqual(3);
    });

    test('other end of board on x axis when moving left on a x=0 positioned zombie', () => {
      const board = initialize(4, { x: 0, y: 0 }, []);
      expect(
        applyZombieMove(board, Movement.left).zombies[board.activeZombieId].x,
      ).toStrictEqual(3);
    });

    test('beginning of board on x-axis when moving right on a x=2 positioned zombie (2x2 grid)', () => {
      const board = initialize(3, { x: 2, y: 0 }, []);
      expect(
        applyZombieMove(board, Movement.right).zombies[board.activeZombieId].x,
      ).toStrictEqual(0);
    });

    test('beginning of board on y-axis when moving down on a y=2 positioned zombie (2x2 grid)', () => {
      const board = initialize(3, { x: 0, y: 2 }, []);
      expect(
        applyZombieMove(board, Movement.down).zombies[board.activeZombieId].y,
      ).toStrictEqual(0);
    });
  });

  describe('executeZombieBite', () => {
    test('new zombie is created if active zombie is on creature position', () => {
      const zombiePosition = { x: 1, y: 0 };
      const creaturePositions = [
        { x: 1, y: 0 },
        { x: 2, y: 2 },
      ];
      const board = initialize(3, zombiePosition, creaturePositions);

      const { zombies } = executeZombieBite(board);
      expect(zombies).toStrictEqual([
        { id: 0, x: 1, y: 0 },
        { id: 1, x: 1, y: 0 },
      ]);
    });

    test('creature is removed if active zombie is on creature position', () => {
      const zombiePosition = { x: 1, y: 0 };
      const creaturePositions = [
        { x: 1, y: 0 },
        { x: 2, y: 2 },
      ];
      const board = initialize(3, zombiePosition, creaturePositions);

      const { creatures } = executeZombieBite(board);
      expect(creatures).toStrictEqual([{ x: 2, y: 2 }]);
    });

    test('no change to zombies if active zombie is not on creature position', () => {
      const zombiePosition = { x: 1, y: 0 };
      const creaturePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];
      const board = initialize(3, zombiePosition, creaturePositions);

      const { zombies } = executeZombieBite(board);
      expect(zombies).toStrictEqual([{ id: 0, x: 1, y: 0 }]);
    });

    test('no change to creatures if active zombie is not on creature position', () => {
      const zombiePosition = { x: 1, y: 0 };
      const creaturePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];
      const board = initialize(3, zombiePosition, creaturePositions);

      const { creatures } = executeZombieBite(board);
      expect(creatures).toStrictEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]);
    });
  });
});
