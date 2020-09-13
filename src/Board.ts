import {
  Position,
  createZombie,
  createCreature,
  Movement,
  applyMove,
  Zombie,
  Creature,
} from './Character';

type Board = {
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
  zombies: [createZombie(zombiePosition)],
  creatures: creaturePositions.map(createCreature),
});

const isOutsideBoardBoundaries = (zombie: Zombie, board: Board): boolean =>
  zombie.x > board.x || zombie.x < 0 || zombie.y > board.y || zombie.y < 0;

export const applyZombieMove = (board: Board, move: Movement): Board => {
  const zombie = board.zombies[board.activeZombieId];
  const movedZombie = applyMove(zombie, move);
  if (isOutsideBoardBoundaries(movedZombie, board)) {
    return board;
  } else {
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
  }
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
        createZombie({ x: infectedCreature.x, y: infectedCreature.y }),
      ],
      creatures: board.creatures.filter(
        c => c.x != infectedCreature.x && c.y != infectedCreature.y,
      ),
    };
  } else {
    return board;
  }
};
