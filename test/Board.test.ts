import { initialize } from '../src/Board';
import { CharacterType } from '../src/Character';

describe('Board', () => {
  describe('initialize', () => {
    const zombiePosition = { x: 0, y: 0 };
    const creaturePositions = [{ x: 1, y: 2 }];
    const initializedBoard = initialize(4, zombiePosition, creaturePositions);

    it('x coordinate is size of dimension', () =>
      expect(initializedBoard.x).toBe(4));

    it('y coordinate is size of dimension', () =>
      expect(initializedBoard.y).toBe(4));

    it('zombie score is set to 0', () =>
      expect(initializedBoard.zombiesScore).toBe(0));

    it('characters array should have a zombie and a creature', () =>
      expect(initializedBoard.characters).toStrictEqual([
        { x: 0, y: 0, type: CharacterType.zombie },
        { x: 1, y: 2, type: CharacterType.creature },
      ]));

    it('characters array should have a zombie and 2 creatures', () => {
      const twoCreaturesPositions = [...creaturePositions, { x: 2, y: 2 }];
      const initializedBoard = initialize(
        4,
        zombiePosition,
        twoCreaturesPositions,
      );
      expect(initializedBoard.characters).toStrictEqual([
        { x: 0, y: 0, type: CharacterType.zombie },
        { x: 1, y: 2, type: CharacterType.creature },
        { x: 2, y: 2, type: CharacterType.creature },
      ]);
    });
  });
});
