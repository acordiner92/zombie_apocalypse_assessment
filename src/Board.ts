import {
  Position,
  createZombie,
  createCreature,
  Movement,
  applyMove,
  Zombie,
  Creature,
} from './Character';

export type Board = {
  readonly dimension: number;
  readonly activeZombieId: number;
  readonly zombies: ReadonlyArray<Zombie>;
  readonly creatures: ReadonlyArray<Creature>;
};

const applyBoardEdgeMovement = (zombie: Zombie, board: Board): Zombie => {
  if (zombie.x > board.dimension) {
    return { ...zombie, x: 0 };
  } else if (zombie.y > board.dimension) {
    return { ...zombie, y: 0 };
  } else if (zombie.x < 0) {
    return { ...zombie, x: board.dimension };
  } else if (zombie.y < 0) {
    return { ...zombie, y: board.dimension };
  } else {
    return zombie;
  }
};

const convertInfectedCreatureToZombie = (
  infectedCreature: Creature,
  board: Board,
): Board => ({
  ...board,
  zombies: [
    ...board.zombies,
    createZombie({ x: infectedCreature.x, y: infectedCreature.y }),
  ],
  creatures: board.creatures.filter(
    c => c.x != infectedCreature.x || c.y != infectedCreature.y,
  ),
});

const getInfectedCreature = (
  activeZombie: Zombie,
  board: Board,
): Creature | undefined =>
  board.creatures.find(c => c.x === activeZombie.x && c.y === activeZombie.y);

/**
 * Creates initial board with laid out creatures
 * and zombies
 *
 * @param {number} dimension
 * @param {Position} zombiePosition
 * @param {ReadonlyArray<Position>} creaturePositions
 * @returns {Board}
 */
export const initialize = (
  dimension: number,
  zombiePosition: Position,
  creaturePositions: ReadonlyArray<Position>,
): Board => ({
  dimension: dimension - 1,
  activeZombieId: 0,
  zombies: [createZombie(zombiePosition)],
  creatures: creaturePositions.map(createCreature),
});

/**
 * Move the active zombie by a single movement.
 *
 * @param {Board} board
 * @param {Movement} move
 * @returns {Board}
 */
export const applyZombieMove = (board: Board, move: Movement): Board => {
  const zombie = board.zombies[board.activeZombieId];
  const movedZombie = applyBoardEdgeMovement(applyMove(zombie, move), board);

  return {
    ...board,
    zombies: board.zombies.map((z, i) =>
      i === board.activeZombieId ? movedZombie : z,
    ),
  };
};

/**
 * Performs zombie bite move. Any creature that
 * is in the same position as the zombie will be
 * infected and become a zombie
 *
 * @param {Board} board
 * @returns {Board}
 */
export const executeZombieBite = (board: Board): Board => {
  const activeZombie = board.zombies[board.activeZombieId];
  const infectedCreature = getInfectedCreature(activeZombie, board);
  return infectedCreature
    ? convertInfectedCreatureToZombie(infectedCreature, board)
    : board;
};
