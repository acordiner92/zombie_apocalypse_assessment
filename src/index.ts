import { readJsonFile } from './FileReader';
import { decodeJson } from './GameSetupParser';
import { execute, GameResult } from './Game';
import Logger from './Logger';

const logEndGameResult = (gameResult: GameResult): void =>
  Logger.info(`
    zombies\` score: ${gameResult.zombieScore}
    zombies\` positions: 
    ${gameResult.zombiePositions.map(z => `(${z.x},${z.y})`).join(' ')}
  `);

const runGame = (): void => {
  const jsonFile = readJsonFile(`${__dirname}/gameSetup.json`);
  const gameSetup = decodeJson(jsonFile);
  const gameResult = execute(
    gameSetup.boardDimension,
    gameSetup.zombiePosition,
    gameSetup.creaturePositions,
    gameSetup.movements,
  );
  logEndGameResult(gameResult);
};

runGame();
