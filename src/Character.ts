export type Position = {
  readonly x: number;
  readonly y: number;
};

export type Zombie = Position & {
  readonly type: 'ZOMBIE';
};

export type Creature = Position & {
  readonly type: 'CREATURE';
};

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
export const createZombie = (position: Position): Zombie => ({
  ...position,
  type: 'ZOMBIE',
});

/**
 * Creates a new creature.
 *
 * @param {Position} position
 * @returns {Creature}
 */
export const createCreature = (position: Position): Creature => ({
  ...position,
  type: 'CREATURE',
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
