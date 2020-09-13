export const CharacterType = {
  zombie: 'ZOMBIE',
  creature: 'CREATURE',
} as const;
export type CharacterType = typeof CharacterType[keyof typeof CharacterType];

export type Position = {
  readonly x: number;
  readonly y: number;
};

export type Character = Position & {
  readonly type: CharacterType;
};

export const Movement = {
  up: 'U',
  right: 'R',
  down: 'D',
  left: 'L',
} as const;
export type Movement = typeof Movement[keyof typeof Movement];

export const createZombie = (position: Position): Character => ({
  ...position,
  type: CharacterType.zombie,
});

export const createCreature = (position: Position): Character => ({
  ...position,
  type: CharacterType.creature,
});

export const applyMove = (zombie: Character, move: Movement): Character => {
  const { x, y } = zombie;
  switch (move) {
    case Movement.up:
      return { ...zombie, y: y + 1 };
    case Movement.right:
      return { ...zombie, x: x + 1 };
    case Movement.down:
      return { ...zombie, y: y - 1 };
    case Movement.left:
      return { ...zombie, x: x - 1 };
    default:
      throw new Error('unsupported move'); // TODO: fix this to return Either
  }
};
