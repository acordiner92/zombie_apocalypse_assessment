import { Character, Position, createZombie, createCreature } from './Character';

type Board = {
  readonly x: number;
  readonly y: number;
  readonly characters: ReadonlyArray<Character>;
  readonly zombiesScore: number;
};

export const initialize = (
  dimension: number,
  zombiePosition: Position,
  creaturePositions: ReadonlyArray<Position>,
): Board => ({
  x: dimension,
  y: dimension,
  characters: [
    createZombie(zombiePosition),
    ...creaturePositions.map(createCreature),
  ],
  zombiesScore: 0,
});
