import prompts, { PromptObject } from 'prompts';
import { GameSetup } from './Game';
import {
  parseMovements,
  parseZombiePosition,
  parseCreaturePositions,
} from './GameSetupParser';
import {
  isZombiePositionValid,
  isCreaturePositionValid,
  isMovementsValid,
} from './GameSetupValidator';

/**
 * Command line user interface that asks a series of questions to
 * set up the game.
 *
 * @returns {Promise<GameSetup>}
 */
export const readFromCommandLine = async (): Promise<GameSetup> => {
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
