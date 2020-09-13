import { Movement, Position } from './Character';
import { initialize, applyZombieMove, executeZombieBite, Board } from './Board';

type GameResult = {
  readonly zombieScore: number;
  readonly zombiePositions: ReadonlyArray<Position>;
};

const calculateZombieScore = (board: Board): number =>
  board.zombies.length > 1 ? board.zombies.length - 1 : 0;

export const execute = (
  boardSize: number,
  zombiePosition: Position,
  creaturePositions: ReadonlyArray<Position>,
  movements: ReadonlyArray<Movement>,
): GameResult => {
  const board = movements.reduce((board, move) => {
    return executeZombieBite(applyZombieMove(board, move));
  }, initialize(boardSize, zombiePosition, creaturePositions));

  return {
    zombieScore: calculateZombieScore(board),
    zombiePositions: board.zombies.map(z => ({ x: z.x, y: z.y })),
  };
};
