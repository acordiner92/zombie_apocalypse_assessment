import { readJsonFile } from './FileReader';
import { decodeJson } from './GameSetupParser';
import { execute } from './Game';

// TODO: fix this linting error
// eslint-disable-next-line functional/no-return-void
const runGame = (): void => {
  const jsonFile = readJsonFile(`${__dirname}/src/gameSetup.json`);
  const gameSetup = decodeJson(jsonFile);
  execute(
    gameSetup.boardDimension,
    gameSetup.zombiePosition,
    gameSetup.creaturePosition,
    gameSetup.movement,
  );
};

runGame();
