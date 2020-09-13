import { Position, Movement } from './Character';
import * as E from 'fp-ts/lib/Either';

type GameSetup = {
  readonly boardDimension: number;
  readonly zombiePosition: Position;
  readonly creaturePosition: ReadonlyArray<Position>;
  readonly movement: ReadonlyArray<Movement>;
};

export const decodeJson = (jsonString: string): GameSetup => {
  const gameSetup = JSON.parse(jsonString) as GameSetup;
  return gameSetup;
};
