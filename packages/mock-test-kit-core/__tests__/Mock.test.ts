import * as fs from 'fs';
import * as path from 'path';

import MockTestKit, { Builder, Match } from '../src';

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
    MockTestKit.generate(
      new Builder.RestRequest('test', 'foo', '/bar', 'POST')
        .withBodyParams({
          foo: `${Match.all()}`,
        })
        .addResponses(new Builder.RestResponse().withStatus(200).build())
        .build(),
    );

    fs.readFile('/tmp/mock-data/foo/bar/POST.json', 'utf-8', (err, data) => {
      expect(data).toEqual(
        '[{"id":"test","service":"foo","path":"/bar","method":"POST","request":{"body":{"foo":"/.*/"}},"response":[{"status":200}]}]',
      );
      done();
    });
  });

  it('should overwrite the mock by id when directory of {service}/{path}/{method}', (done) => {
    MockTestKit.generate(
      new Builder.RestRequest('test', 'foo', '/bar', 'POST')
        .withBodyParams({
          foo: `${Match.all()}`,
        })
        .addResponses(new Builder.RestResponse().withStatus(200).build())
        .build(),
    );

    MockTestKit.generate(
      new Builder.RestRequest('test', 'foo', '/bar', 'POST')
        .withBodyParams({
          foo: `${Match.all()}`,
        })
        .addResponses(new Builder.RestResponse().withStatus(204).build())
        .build(),
    );

    MockTestKit.generate(
      new Builder.RestRequest('test', 'foo', '/baz', 'GET')
        .withBodyParams({
          foo: `${Match.all()}`,
        })
        .addResponses(new Builder.RestResponse().withStatus(200).build())
        .build(),
    );

    fs.readFile('/tmp/mock-data/foo/bar/POST.json', 'utf-8', (err, data) => {
      expect(data).toEqual(
        '[{"id":"test","service":"foo","path":"/bar","method":"POST","request":{"body":{"foo":"/.*/"}},"response":[{"status":204}]}]',
      );
      done();
    });
    fs.readFile('/tmp/mock-data/foo/baz/GET.json', 'utf-8', (err, data) => {
      expect(data).toEqual(
        '[{"id":"test","service":"foo","path":"/baz","method":"GET","request":{"body":{"foo":"/.*/"}},"response":[{"status":200}]}]',
      );
      done();
    });
  });
});
