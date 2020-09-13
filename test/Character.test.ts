import {
  createZombie,
  Movement,
  applyMove,
  createCreature,
} from '../src/Character';

describe('Character', () => {
  describe('applyMove', () => {
    const zombie = createZombie(
      {
        x: 1,
        y: 1,
      },
      [],
    );

    test('movement up decreases y position by 1', () =>
      expect(applyMove(zombie, Movement.up).y).toBe(0));

    test('movement up does not change x position', () =>
      expect(applyMove(zombie, Movement.up).x).toBe(1));

    test('movement right does not change y position', () =>
      expect(applyMove(zombie, Movement.right).y).toBe(1));

    test('movement right increases x position by 1', () =>
      expect(applyMove(zombie, Movement.right).x).toBe(2));

    test('movement down increases y position by 1', () =>
      expect(applyMove(zombie, Movement.down).y).toBe(2));

    test('movement down does not change x position', () =>
      expect(applyMove(zombie, Movement.down).x).toBe(1));

    test('movement left decreases x position  by 1', () =>
      expect(applyMove(zombie, Movement.left).x).toBe(0));

    test('movement left does not change y position', () =>
      expect(applyMove(zombie, Movement.left).y).toBe(1));
  });

  describe('createZombie', () => {
    test('creates a zombie', () => {
      const zombie = createZombie(
        {
          x: 1,
          y: 1,
        },
        [],
      );
      expect(zombie).toStrictEqual({
        id: 0,
        x: 1,
        y: 1,
      });
    });
  });

  describe('createCreature', () => {
    test('creates a creature', () => {
      const creature = createCreature({
        x: 2,
        y: 2,
      });
      expect(creature).toStrictEqual({
        x: 2,
        y: 2,
      });
    });
  });
});
