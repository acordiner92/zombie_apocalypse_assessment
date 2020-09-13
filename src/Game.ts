import { Movement, Position } from './Character';
import { initialize, applyZombieMove, executeZombieBite, Board } from './Board';

export type GameResult = {
  readonly zombieScore: number;
  readonly zombiePositions: ReadonlyArray<Position>;
};

export type GameSetup = {
  readonly boardDimension: number;
  readonly zombiePosition: Position;
  readonly creaturePositions: ReadonlyArray<Position>;
  readonly movements: ReadonlyArray<Movement>;
};

const calculateZombieScore = (board: Board): number =>
  board.zombies.length > 1 ? board.zombies.length - 1 : 0;

const executeMovements = (
  board: Board,
  movements: ReadonlyArray<Movement>,
): Board => {
  const endResultBoard = movements.reduce((board, move) => {
    return executeZombieBite(applyZombieMove(board, move));
  }, board);

  if (endResultBoard.activeZombieId + 1 < endResultBoard.zombies.length) {
    return executeMovements(
      { ...endResultBoard, activeZombieId: endResultBoard.activeZombieId + 1 },
      movements,
    );
  } else {
    return endResultBoard;
  }
};

export const execute = (gameSetup: GameSetup): GameResult => {
  const initialBoard = initialize(
    gameSetup.boardDimension,
    gameSetup.zombiePosition,
    gameSetup.creaturePositions,
  );
  const finishedBoard = executeMovements(initialBoard, gameSetup.movements);

  return {
    zombieScore: calculateZombieScore(finishedBoard),
    zombiePositions: finishedBoard.zombies.map(z => ({ x: z.x, y: z.y })),
  };
};
