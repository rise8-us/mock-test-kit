import { Ctx, Expr, Fn } from '../../src';

describe('Expression', () => {
  describe('Context', () => {
    it('should output headers context expression', () => {
      expect(Expr.create(Ctx.headers('authorization'))).toStrictEqual(
        '${{ headers.authorization }}',
      );
    });

    it('should output params context expression', () => {
      expect(Expr.create(Ctx.params('id'))).toStrictEqual('${{ params.id }}');
    });

    it('should output query context expression', () => {
      expect(Expr.create(Ctx.queryParams('scope'))).toStrictEqual(
        '${{ query.scope }}',
      );
    });

    it('should output body context expression', () => {
      expect(Expr.create(Ctx.bodyParams('redirect'))).toStrictEqual(
        '${{ body.redirect }}',
      );
    });
  });

  describe('Function', () => {
    it('should output jwt function expression', () => {
      expect(Expr.create(Fn.jwt({}, 'HS256'))).toStrictEqual(
        '${{ jwt({},"HS256",null,null) }}',
      );
    });

    it('should output now function expression', () => {
      expect(Expr.create(Fn.now(0, 'sec'))).toStrictEqual('${{ now(0,sec) }}');
    });
  });
});
