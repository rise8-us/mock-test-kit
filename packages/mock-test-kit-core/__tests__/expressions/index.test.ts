import { Ctx, Expr, Fn } from '../../src';

describe('Expression', () => {
  describe('Context', () => {
    it('should output headers context expression', () => {
      expect(
        Expr.create(Ctx.getHeader('authorization')).toString(),
      ).toStrictEqual('${{ headers.authorization }}');
    });

    it('should output params context expression', () => {
      expect(Expr.create(Ctx.getParam('id')).toString()).toStrictEqual(
        '${{ params.id }}',
      );
    });

    it('should output query context expression', () => {
      expect(Expr.create(Ctx.getQueryParam('scope')).toString()).toStrictEqual(
        '${{ query.scope }}',
      );
    });

    it('should output body context expression', () => {
      expect(
        Expr.create(Ctx.getBodyParam('redirect')).toString(),
      ).toStrictEqual('${{ body.redirect }}');
    });
  });

  describe('Function', () => {
    it('should output jwt function expression', () => {
      expect(Expr.create(Fn.callJwt({}, 'HS256')).toString()).toStrictEqual(
        '${{ jwt({}, "HS256", null, null) }}',
      );
    });

    it('should output now function expression', () => {
      expect(Expr.create(Fn.callNow(0, 'sec')).toString()).toStrictEqual(
        '${{ now(0, "sec") }}',
      );
    });
  });
});
