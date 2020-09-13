import { execute, GameResult } from './Game';
import Logger from './Logger';
import { readFromCommandLine } from './GameSetupReader';

const logEndGameResult = (gameResult: GameResult): void =>
  Logger.info(`
    zombies\` score: ${gameResult.zombieScore}
    zombies\` positions: 
    ${gameResult.zombiePositions.map(z => `(${z.x},${z.y})`).join(' ')}
  `);

const runGame = async (): Promise<void> => {
  const gameSetup = await readFromCommandLine();
  const gameResult = execute(gameSetup);
  logEndGameResult(gameResult);
};

void runGame();
