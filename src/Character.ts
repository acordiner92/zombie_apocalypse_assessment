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

/**
 * Creates a new zombie.
 *
 * @param {Position} position
 * @param {ReadonlyArray<Zombie>} zombies
 * @returns {Zombie}
 */
export const createZombie = (
  position: Position,
  zombies: ReadonlyArray<Zombie>,
): Zombie => ({
  ...position,
  id: zombies.length,
});

/**
 * Creates a new creature.
 *
 * @param {Position} position
 * @returns {Creature}
 */
export const createCreature = (position: Position): Creature => ({
  ...position,
});

/**
 * Apply the movement on the zombie. This ignores the boundaries of the map
 * which is handle in Board.
 *
 * @param {Zombie} zombie
 * @param {Movement} move
 * @returns {Zombie}
 */
export const applyMove = (zombie: Zombie, move: Movement): Zombie => {
  const { x, y } = zombie;
  switch (move) {
    case Movement.up:
      return { ...zombie, y: y - 1 };
    case Movement.right:
      return { ...zombie, x: x + 1 };
    case Movement.down:
      return { ...zombie, y: y + 1 };
    default:
      return { ...zombie, x: x - 1 };
  }
};
