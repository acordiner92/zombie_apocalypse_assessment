export const CharacterType = {
  zombie: 'ZOMBIE',
  creature: 'CREATURE',
} as const;
export type CharacterType = typeof CharacterType[keyof typeof CharacterType];

export type Position = {
  readonly x: number;
  readonly y: number;
};

export type Zombie = Position & {
  readonly id: number;
};

export type Creature = Position;

export type Character = Zombie | Creature;

export const Movement = {
  up: 'U',
  right: 'R',
  down: 'D',
  left: 'L',
} as const;
export type Movement = typeof Movement[keyof typeof Movement];

export const createZombie = (
  position: Position,
  zombies: ReadonlyArray<Zombie>,
): Zombie => ({
  ...position,
  id: zombies.length,
});

export const createCreature = (position: Position): Creature => ({
  ...position,
});

export const applyMove = (zombie: Zombie, move: Movement): Zombie => {
  const { x, y } = zombie;
  switch (move) {
    case Movement.up:
      return { ...zombie, y: y - 1 };
    case Movement.right:
      return { ...zombie, x: x + 1 };
    case Movement.down:
      return { ...zombie, y: y + 1 };
    case Movement.left:
      return { ...zombie, x: x - 1 };
    default:
      throw new Error('unsupported move'); // TODO: fix this to return Either
  }
};
