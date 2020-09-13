import { createZombie, Movement, applyMove } from '../src/Character';

describe('Character', () => {
  describe('applyMove', () => {
    const zombie = createZombie({
      x: 1,
      y: 1,
    });

    it('movement up increases y position by 1', () =>
      expect(applyMove(zombie, Movement.up).y).toBe(2));

    it('movement up does not change x position', () =>
      expect(applyMove(zombie, Movement.up).x).toBe(1));

    it('movement right does not change y position', () =>
      expect(applyMove(zombie, Movement.right).y).toBe(1));

    it('movement right increases x position by 1', () =>
      expect(applyMove(zombie, Movement.right).x).toBe(2));

    it('movement down decreases y position by 1', () =>
      expect(applyMove(zombie, Movement.down).y).toBe(0));

    it('movement down does not change x position', () =>
      expect(applyMove(zombie, Movement.down).x).toBe(1));

    it('movement left decreases x position  by 1', () =>
      expect(applyMove(zombie, Movement.left).x).toBe(0));

    it('movement left does not change y position', () =>
      expect(applyMove(zombie, Movement.left).y).toBe(1));
  });
});
