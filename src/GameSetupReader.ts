import prompts, { PromptObject } from 'prompts';
import { GameSetup } from './Game';
import {
  parseMovements,
  parseZombiePosition,
  parseCreaturePositions,
} from './GameSetupParser';

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
      validate: value => {
        const matches = value.match(/^([0-9],[0-9])$/);
        return matches
          ? true
          : 'Invalid zombie position format, correct format should be e.g 1,2';
      },
    },
    {
      type: 'text',
      name: 'creaturePositions',
      message: 'What is the positions of the creature?',
      validate: value => {
        const matches = value.match(/^(\s?[0-9],[0-9]\s?)+$/);
        return matches
          ? true
          : 'Invalid creature positions format, correct format should be e.g 1,2 0,1';
      },
    },
    {
      type: 'text',
      name: 'movements',
      message: 'What is the movements of the zombie?',
      validate: value => {
        const matches = value.match(/^[U,R,D,L]+$/);
        return matches
          ? true
          : 'Invalid movements, valid movements are URDL e.g DDRULL';
      },
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
