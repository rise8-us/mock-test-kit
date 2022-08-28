import * as fs from 'fs';
import * as path from 'path';

import MockTestKit, {
  Matcher,
  RestRequestBuilder,
  RestResponseBuilder,
} from '../src';

describe('MockTestKit', () => {
  beforeAll(() => {
    MockTestKit.initialize({
      development: true,
      outputDir: path.join('/tmp', 'mock-data'),
    });
  });

  afterAll(() => {
    fs.rmSync(path.join('/tmp', 'mock-data'), {
      recursive: true,
    });
  });

  it('should generate mock', (done) => {
    MockTestKit.generateJSON(
      new RestRequestBuilder('foo', '/bar', 'POST')
        .withBodyParams({
          foo: `${Matcher.any()}`,
        })
        .addResponses(new RestResponseBuilder().withStatus(200).build())
        .build(),
    );

    fs.readFile('/tmp/mock-data/foo/bar/POST.json', 'utf-8', (err, data) => {
      expect(data).toEqual(
        '[{"service":"foo","path":"/bar","method":"POST","request":{"body":{"foo":"/.*/"}},"response":[{"status":200}]}]',
      );
      done();
    });
  });
});
