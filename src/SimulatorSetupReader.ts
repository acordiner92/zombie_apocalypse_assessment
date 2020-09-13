import prompts, { PromptObject } from 'prompts';
import { SimulatorSetup } from './Simulator';
import {
  parseMovements,
  parseZombiePosition,
  parseCreaturePositions,
} from './SimulatorSetupParser';
import {
  isZombiePositionValid,
  isCreaturePositionValid,
  isMovementsValid,
} from './SimulatorSetupValidator';

/**
 * Command line user interface that asks a series of questions to
 * set up the simulation.
 *
 * @returns {Promise<SimulatorSetup>}
 */
export const readFromCommandLine = async (): Promise<SimulatorSetup> => {
  const questions: readonly PromptObject[] = [
    {
      type: 'number',
      name: 'boardDimension',
      message: 'What is the dimension of the board?',
    },
    {
      type: 'text',
      name: 'zombiePosition',
      message: 'What is the position of zombie?',
      validate: isZombiePositionValid,
    },
    {
      type: 'text',
      name: 'creaturePositions',
      message: 'What is the positions of the creature?',
      validate: isCreaturePositionValid,
    },
    {
      type: 'text',
      name: 'movements',
      message: 'What is the movements of the zombie?',
      validate: isMovementsValid,
    },
  ];

  const response = await prompts([...questions]);
  return {
    boardDimension: response.boardDimension,
    zombiePosition: parseZombiePosition(response.zombiePosition),
    creaturePositions: parseCreaturePositions(response.creaturePositions),
    movements: parseMovements(response.movements),
  };
};
