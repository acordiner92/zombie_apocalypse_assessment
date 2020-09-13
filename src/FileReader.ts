import * as fs from 'fs';

export const readJsonFile = (path: string): string => {
  const jsonFile = fs.readFileSync(path);
  return jsonFile.toString('utf-8');
};
