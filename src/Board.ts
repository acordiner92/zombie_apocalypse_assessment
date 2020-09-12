export const CharacterType = {
  zombie: 'ZOMBIE',
  creature: 'CREATURE',
} as const;
export type CharacterType = typeof CharacterType[keyof typeof CharacterType];

type Position = {
  readonly x: number;
  readonly y: number;
};

type Character = Position & {
  readonly type: CharacterType;
};

type Board = {
  readonly x: number;
  readonly y: number;
  readonly characters: ReadonlyArray<Character>;
  readonly zombiesScore: number;
};

export const Movement = {
  up: 'U',
  right: 'R',
  down: 'D',
  left: 'L',
} as const;
export type Movement = typeof Movement[keyof typeof Movement];

const createZombie = (position: Position): Character => ({
  ...position,
  type: CharacterType.zombie,
});

const createCreature = (position: Position): Character => ({
  ...position,
  type: CharacterType.creature,
});

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
