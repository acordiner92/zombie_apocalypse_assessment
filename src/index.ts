import { execute, SimulatorResult } from './Simulator';
import Logger from './Logger';
import { readFromCommandLine } from './SimulatorSetupReader';

const logSimulationResult = (simulatorResult: SimulatorResult): void =>
  Logger.info(`
    zombies\` score: ${simulatorResult.zombieScore}
    zombies\` positions: 
    ${simulatorResult.zombiePositions.map(z => `(${z.x},${z.y})`).join(' ')}
  `);

const logError = (error: Error): void =>
  Logger.error(error, 'An error has occurred running the simulation');

const runSimulation = async (): Promise<void> => {
  try {
    const simulatorSetup = await readFromCommandLine();
    const simulatorResult = execute(simulatorSetup);
    logSimulationResult(simulatorResult);
  } catch (error) {
    logError(error);
    process.exit(1);
    return;
  }
};

void runSimulation();
