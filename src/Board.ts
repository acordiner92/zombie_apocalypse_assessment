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
  readonly x: number;
  readonly y: number;
  readonly activeZombieId: number;
  readonly zombies: ReadonlyArray<Zombie>;
  readonly creatures: ReadonlyArray<Creature>;
};

export const initialize = (
  dimension: number,
  zombiePosition: Position,
  creaturePositions: ReadonlyArray<Position>,
): Board => ({
  x: dimension - 1,
  y: dimension - 1,
  activeZombieId: 0,
  zombies: [createZombie(zombiePosition, [])],
  creatures: creaturePositions.map(createCreature),
});

const applyBoardEdgeMovement = (zombie: Zombie, board: Board): Zombie => {
  if (zombie.x > board.x) {
    return { ...zombie, x: 0 };
  } else if (zombie.y > board.y) {
    return { ...zombie, y: 0 };
  } else if (zombie.x < 0) {
    return { ...zombie, x: board.x };
  } else if (zombie.y < 0) {
    return { ...zombie, y: board.y };
  } else {
    return zombie;
  }
};

export const applyZombieMove = (board: Board, move: Movement): Board => {
  const zombie = board.zombies[board.activeZombieId];
  const movedZombie = applyBoardEdgeMovement(applyMove(zombie, move), board);

  return {
    ...board,
    zombies: board.zombies.map((x, i) => {
      if (i === board.activeZombieId) {
        return movedZombie;
      } else {
        return x;
      }
    }),
  };
};

export const executeZombieBite = (board: Board): Board => {
  const activeZombie = board.zombies[board.activeZombieId];
  const infectedCreature = board.creatures.find(
    c => c.x === activeZombie.x && c.y === activeZombie.y,
  );
  if (infectedCreature) {
    return {
      ...board,
      zombies: [
        ...board.zombies,
        createZombie(
          { x: infectedCreature.x, y: infectedCreature.y },
          board.zombies,
        ),
      ],
      creatures: board.creatures.filter(
        c => c.x != infectedCreature.x || c.y != infectedCreature.y,
      ),
    };
  } else {
    return board;
  }
};
