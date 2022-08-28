import type { MockTestKitRestRequestAndResponse } from './types';
import fs from 'fs';
import path from 'path';

let config: { development: boolean; outputDir: string };

export const init = (options: { development: boolean; outputDir: string }) => {
  config = options;

  if (config.development && fs.existsSync(config.outputDir)) {
    fs.rmSync(path.join(config.outputDir), {
      recursive: true,
    });
  }
};

export const generate = (
  ...requestAndResponses: MockTestKitRestRequestAndResponse[]
) => {
  if (config.development) {
    requestAndResponses.forEach((requestAndResponse) => {
      const { service, path: mockPath, method } = requestAndResponse;

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
        const mocks: MockTestKitRestRequestAndResponse[] = JSON.parse(
          fs.readFileSync(
            path.join(config.outputDir, service, mockPath, `${method}.json`),
            'utf8',
          ),
        );
        const index = mocks.findIndex(
          (mock) =>
            JSON.stringify(mock.request) ===
            JSON.stringify(requestAndResponse.request),
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
