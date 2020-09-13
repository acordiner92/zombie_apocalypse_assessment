import { execute, SimulatorResult } from './Simulator';
import Logger from './Logger';
import { readFromCommandLine } from './SimulatorSetupReader';

const logSimulationResult = (simulatorResult: SimulatorResult): void =>
  Logger.info(`
    zombies\` score: ${simulatorResult.zombieScore}
    zombies\` positions: 
    ${simulatorResult.zombiePositions.map(z => `(${z.x},${z.y})`).join(' ')}
  `);

const runSimulation = async (): Promise<void> => {
  const simulatorSetup = await readFromCommandLine();
  const simulatorResult = execute(simulatorSetup);
  logSimulationResult(simulatorResult);
};

void runSimulation();
