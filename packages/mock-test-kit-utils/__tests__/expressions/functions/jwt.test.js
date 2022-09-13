const fs = require('fs');
const {
  isFunction,
  getFunction,
} = require('../../../lib/expressions/functions/jwt');

describe('jwt', () => {
  describe('isFunction', () => {
    it('should return true when the expression is a jwt', () => {
      expect(isFunction('jwt()')).toBe(true);
    });

    it('should return false when the expression is not a jwt', () => {
      expect(isFunction('jwt')).toBe(false);
      expect(isFunction('jwt(')).toBe(false);
      expect(isFunction('jwt)')).toBe(false);
      expect(isFunction('test()')).toBe(false);
    });
  });

  describe('getFunction', () => {
    it('should throw an error when given an invalid jwt function', () => {
      expect(() => getFunction('test()')).toThrowError(
        'The expression test() is not a valid jwt function.',
      );
    });

    it('should throw an error when missing payload', () => {
      expect(() => getFunction('jwt()')).toThrowError(
        'Missing payload when calling jwt.',
      );
    });

    it('should throw an error when missing secret or private key', () => {
      expect(() => getFunction('jwt({})')).toThrowError(
        'Missing secret or private key when calling jwt.',
      );
    });

    it('should throw an error when missing both payload exp and iat', () => {
      expect(() => getFunction('jwt({}, "privateKey")')).toThrowError(
        'Missing payload exp and/or iat. These are required fields.',
      );
    });

    it('should throw an error when missing payload exp', () => {
      expect(() => getFunction('jwt({"iat":3600}, "privateKey")')).toThrowError(
        'Missing payload exp and/or iat. These are required fields.',
      );
    });

    it('should throw an error when missing payload iat', () => {
      expect(() => getFunction('jwt({"exp":3600}, "privateKey")')).toThrowError(
        'Missing payload exp and/or iat. These are required fields.',
      );
    });

    it('should return the jwt', () => {
      expect(getFunction('jwt({"exp":3600,"iat":3600}, "secret")')).toEqual(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDAsImlhdCI6MzYwMH0.-cXEY6w0CcTJc3BK4CkWtIb4IoYUjkfvgwhuENou6KU',
      );
    });

    it('should throw an error when using passphrase without algorithm', () => {
      expect(() =>
        getFunction(
          'jwt({"exp":3600,"iat":3600}, "private.key", null, "secret")',
        ),
      ).toThrowError(
        'Missing options algorithm. This is required when using passphrase and private key.',
      );
    });

    it('should return the jwt when using a passphrase', () => {
      fs.writeFileSync(
        '/tmp/private.key',
        `-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,924779D264DE9BE6A459E6DF706542E0

v7XN3U4J3PYVbN1yMo/AgP5jz4YUiZkJo+HtRqhWZbcfT1AThQTMTt7hQghMVsvw
SmyTYyop6oTZ9euJKE6Cg0/BQSM1lX9DX2yAnkVnw1lTFYLxmsJvoyWhdhZ4GJHw
Jz/oAEYzf2sFePkeGB1NFfKCXExb+8w6DwC/dCuu/tWjdEi5IoN8nf7DBoZI/pbc
PkKlV4TnZEdNQuP9CywvE9KG+GiOWeX1NPNR4PiUNmW6DK9m/0QhHLV9S7oxQ53S
KvqiM1YDqTzQd0UxLYXfOZwHc9DYoGr/FubUYcwfMOwrZmoGFJ4k1Yj9JUFD+31B
3uCeGuBfMhfU6skFZqXO3PQ3wEChN3KXcaC3RQjxUcPD8sotVpW6X/IeEAk04XQ3
f9y0vbY4QbYtFoUc8NPb1SlMTT16ziY4Po2TkXIgqbDvvQPUjV+TVmCx4sfznWCO
Hg4gG7EQMSuzQPqUtd7CQFeureYaHX9IsIpKTujrG+8rjilp1JQiwwZePQg3FyIt
TDU71Fv00XV2YkAxnxxLWkbX8++g9ag/kCVGHNjqR90tDU6g8ThjhU9xPL9Kbv8Y
twODF5v4UzbR6wPEnWBu1x657qnMWUP3KnZBDhcXdciOR37DTCZi5/gphsiqDhMS
6S7SlKPiWjRP3hi258GFz9zKaHyzJAakZdEjTBSSotxQaTbgtiuPzz7FwJ/HrIsJ
3W1WVqZ7j/vi6TiiXRf+ru9/WpcrnbK7aWVnxJkTSZmEqdMfhykHm/RyPm0ga37w
XZzLf7PyylJ3TkPSlRaehKqrezmVXtZ48jIZ6/9LJbPHqXBjDKWwEO0SrIu00x4L
-----END RSA PRIVATE KEY-----`,
      );

      expect(
        getFunction(
          'jwt({"exp":3600,"iat":3600}, "private.key", {"algorithm": "RS256"}, "secret")',
        ),
      ).toEqual(
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDAsImlhdCI6MzYwMH0.MvYZvUdCc1g9ROy5PjnlST3plyaKI3B6PRf_SzuDBgruCu4u2nNEti6zPoCjko6TBUW6L8WITJuwDxi1lmMsXtSiY6wTGVNkJJ7VrgINUbslMa4NYBP4F11Z9b6WWty2ebMqNH4QLxI8pxt71LCMH8C6I4Za439q2OZRYxlQGW4',
      );

      fs.rmSync('/tmp/private.key');
    });
  });
});
