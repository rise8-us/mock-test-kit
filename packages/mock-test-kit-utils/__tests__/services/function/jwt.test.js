const { applyJwt } = require('../../../lib/services/function/jwt');
const fs = require('fs');

jest.spyOn(fs, 'readFileSync');

describe('jwt', () => {
  describe('applyJwt', () => {
    it('should return value when no match', () => {
      const value = 'foo';

      expect(applyJwt(value)).toBe(value);
    });

    it('should return new value when match', () => {
      const value = 'jwt({"iat":1516239022,"exp":1516240022})';

      expect(applyJwt(value)).not.toBe(value);
    });

    it('should return new value when match given secret', () => {
      const value = 'jwt({},"secret")';

      expect(applyJwt(value)).not.toBe(value);
    });

    it('should return new value when match given no secret, and options', () => {
      const value = 'jwt({},null,{})';

      expect(applyJwt(value)).not.toBe(value);
    });

    it('should return new value when match given no secret, and options', () => {
      const value = 'jwt({},null,null)';

      expect(applyJwt(value)).not.toBe(value);
    });

    it('should return new value when match given no secret, and options', () => {
      const value = 'jwt({},"private.key",{"algorithm":"RS256"},"passphrase")';
      fs.readFileSync.mockImplementation(
        () =>
          '-----BEGIN RSA PRIVATE KEY-----\n' +
          'Proc-Type: 4,ENCRYPTED\n' +
          'DEK-Info: AES-128-CBC,BC806647D8AD827B2EEFAFC6E0E141FA\n' +
          '\n' +
          'nyeq+H2+IK9szcCphkn57KfF2PiIMj0uwdiw77tmwsZnhDKA1Ok8D31irfOibX+f\n' +
          '5kYzSsK5FzttculYg5A6Vbo7qbH0yL7ZwrqXsJrqVMvIr8m42zVbq0gwi9zeGLMR\n' +
          'iLHSe5RDVBjXd11Ang+SG060JgN0McF4RLTjPtdyzei+ziuZ0lj07WniKCGj2aBw\n' +
          'bcfx6Rh1boehsNx1QfCcOLOusD/WQZbpuTwnEbbBJoNwQ4IWKlMMv1MQc4klWBmx\n' +
          'VxTZiHGYlGody8pgl5y+XaRi67rCDczVhhz83P7jUzCc+yYbDDsFXzVuLblB1i2z\n' +
          '5dbu2y7OPwTUyxqXBMDqiD0y9OGeYJEHvQoPAF6YvfVxPiUij4Fe4tDIL1dIfjmi\n' +
          'Tn1aYYQhGeqo5NjAjo4hcOdT7jElo4l3dX0U/ZOKKxKahAkEUEvcSN7T+vRdo0KF\n' +
          '7nFYMxQHLCyIEv26DfJqfsq29TZDLXPyVfD1/u2izK5ZyItrBUNC6GUy7kCN0ESQ\n' +
          '/MC0cEI8QVyU2Is4RV/fqv0Bngo7n7QMr1IYd3JEVuH0m1SpCjcH3LXc2vRnIb6C\n' +
          'cOxzHeQxETgRE000WrgGkCuH6xwft1VAD+SdOZo69FTMZESMKA76/F2iu9i2cmoJ\n' +
          'aflFg3imWGP8ikDmg+C3KbYI4uTLY5paBTUlLwpQvKJC6h0QbxUlgJ1O1dUsLd8d\n' +
          'Ugg5pNiAtPsKhkQdoByC/J86h0QER+mC457pspbMqodI481knV9I2bq5BBxujx83\n' +
          'l+4xSKQ5rvLdQlnqlc8tczJN3doOF0qxVMsos2yudMxwl8RZseVc9SYTbWUG4z1u\n' +
          '-----END RSA PRIVATE KEY-----\n',
      );

      expect(applyJwt(value)).not.toBe(value);
    });

    it('should throw error when match given passphrase but no secret filepath', () => {
      const value = 'jwt({},null,null,"passphrase")';

      expect(() => applyJwt(value)).toThrowError();
    });
  });
});
