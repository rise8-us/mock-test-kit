import fs from 'fs';
import path from 'path';
import type { IMockTestKitRestRequestAndResponse } from './types';

export interface IConfig {
  development: boolean;
  outputDir: string;
}

let config: IConfig;

export const initialize = (options: IConfig): void => {
  config = options;
};

export const generate = (
  ...requestAndResponses: IMockTestKitRestRequestAndResponse[]
) => {
  if (config.development) {
    requestAndResponses.forEach((requestAndResponse) => {
      const { id, service, path: mockPath, method } = requestAndResponse;

      if (!fs.existsSync(path.join(config.outputDir, service, mockPath))) {
        fs.mkdirSync(path.join(config.outputDir, service, mockPath), {
          recursive: true,
        });
      }

      if (
        fs.existsSync(
          path.join(config.outputDir, service, mockPath, `${method}.json`),
        )
      ) {
        const mocks: IMockTestKitRestRequestAndResponse[] = JSON.parse(
          fs.readFileSync(
            path.join(config.outputDir, service, mockPath, `${method}.json`),
            'utf8',
          ),
        );
        const index = mocks.findIndex(
          (mock) => mock.id === requestAndResponse.id,
        );
        if (index > -1) {
          mocks[index] = requestAndResponse;
        } else {
          mocks.push(requestAndResponse);
        }

        fs.writeFileSync(
          path.join(config.outputDir, service, mockPath, `${method}.json`),
          JSON.stringify(mocks),
        );
      } else {
        fs.writeFileSync(
          path.join(config.outputDir, service, mockPath, `${method}.json`),
          JSON.stringify([requestAndResponse]),
        );
      }
    });
  }
};
