import { initialize, applyZombieMove, executeZombieBite } from '../src/Board';
import { Movement } from '../src/Character';

describe('Board', () => {
  describe('initialize', () => {
    const zombiePosition = { x: 0, y: 0 };
    const creaturePositions = [{ x: 1, y: 2 }];
    const initializedBoard = initialize(4, zombiePosition, creaturePositions);

    it('x coordinate is size of dimension', () =>
      expect(initializedBoard.x).toBe(3));

    it('y coordinate is size of dimension', () =>
      expect(initializedBoard.y).toBe(3));

    it('activeZombieId is set to 0', () =>
      expect(initializedBoard.activeZombieId).toBe(0));

    it('zombie array should have 1 zombie', () =>
      expect(initializedBoard.zombies).toStrictEqual([{ x: 0, y: 0 }]));

    it('creature array should have 2 creatures', () => {
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
    it('zombie move up by one', () => {
      const board = initialize(4, { x: 1, y: 1 }, []);
      expect(
        applyZombieMove(board, Movement.up).zombies[board.activeZombieId].y,
      ).toStrictEqual(0);
    });

    it('no change when moving up on a y=0 positioned zombie', () => {
      const board = initialize(4, { x: 1, y: 0 }, []);
      expect(
        applyZombieMove(board, Movement.up).zombies[board.activeZombieId].y,
      ).toStrictEqual(0);
    });

    it('no change when moving left on a x=0 positioned zombie', () => {
      const board = initialize(4, { x: 0, y: 0 }, []);
      expect(
        applyZombieMove(board, Movement.left).zombies[board.activeZombieId].x,
      ).toStrictEqual(0);
    });

    it('no change when moving right on a x=2 positioned zombie (2x2 grid)', () => {
      const board = initialize(3, { x: 2, y: 0 }, []);
      expect(
        applyZombieMove(board, Movement.up).zombies[board.activeZombieId].x,
      ).toStrictEqual(2);
    });

    it('no change when moving down on a y=2 positioned zombie (2x2 grid)', () => {
      const board = initialize(3, { x: 0, y: 2 }, []);
      expect(
        applyZombieMove(board, Movement.down).zombies[board.activeZombieId].y,
      ).toStrictEqual(2);
    });
  });

  describe('executeZombieBite', () => {
    it('new zombie is created if active zombie is on creature position', () => {
      const zombiePosition = { x: 1, y: 0 };
      const creaturePositions = [
        { x: 1, y: 0 },
        { x: 2, y: 2 },
      ];
      const board = initialize(3, zombiePosition, creaturePositions);

      const { zombies } = executeZombieBite(board);
      expect(zombies).toStrictEqual([
        { x: 1, y: 0 },
        { x: 1, y: 0 },
      ]);
    });

    it('creature is removed if active zombie is on creature position', () => {
      const zombiePosition = { x: 1, y: 0 };
      const creaturePositions = [
        { x: 1, y: 0 },
        { x: 2, y: 2 },
      ];
      const board = initialize(3, zombiePosition, creaturePositions);

      const { creatures } = executeZombieBite(board);
      expect(creatures).toStrictEqual([{ x: 2, y: 2 }]);
    });

    it('no change to zombies if active zombie is not on creature position', () => {
      const zombiePosition = { x: 1, y: 0 };
      const creaturePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];
      const board = initialize(3, zombiePosition, creaturePositions);

      const { zombies } = executeZombieBite(board);
      expect(zombies).toStrictEqual([{ x: 1, y: 0 }]);
    });

    it('no change to creatures if active zombie is not on creature position', () => {
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
