import { Position, Movement } from './Character';

type GameSetup = {
  readonly boardDimension: number;
  readonly zombiePosition: Position;
  readonly creaturePositions: ReadonlyArray<Position>;
  readonly movements: ReadonlyArray<Movement>;
};

const parseMovements = (movementValue: string): ReadonlyArray<Movement> =>
  movementValue.split('').map(x => {
    switch (x) {
      case 'U':
        return Movement.up;
      case 'R':
        return Movement.right;
      case 'D':
        return Movement.down;
      case 'L':
        return Movement.left;
      default:
        throw new Error(
          `movment ${x} does not exists, Supported movements are U,R,D,L`,
        );
    }
  });

export const decodeJson = (jsonString: string): GameSetup => {
  const jsonValue = JSON.parse(jsonString);
  const gameSetup = {
    ...jsonValue,
    movements: parseMovements(jsonValue.movements),
  };
  return gameSetup;
};
