import { verifySecret } from '../src/verify-secret';

describe('#verifySecret', () => {
  it.each([
    ['somesecret', 'sha1=36f578a4d8bc0b5d40eb70ed210339a4495b053a'],
    ['othersecret', 'sha1=f1e685afb26b2c7291d4df9fb88265f0a0089e29'],
  ])(
    'given secret of "%s", it should verify correct signature',
    (secret: string, signature: string) => {
      const payload = 'somepayload';
      const checksum = Buffer.from(signature, 'utf8');

      expect(verifySecret(payload, secret, checksum)).toBe(true);
    }
  );

  it.each([
    ['wrongsecret', 'sha1=36f578a4d8bc0b5d40eb70ed210339a4495b053a'],
    ['otherwrong', 'sha1=36f578a4d8bc0b5d40eb70ed210339a4495b053a'],
  ])(
    'given wrong of "%s", it should verify correct signature',
    (secret: string, signature: string) => {
      const payload = 'somepayload';
      const checksum = Buffer.from(signature, 'utf8');

      expect(verifySecret(payload, secret, checksum)).toBe(false);
    }
  );
});
