import { timingSafeEqual, createHmac } from 'crypto';

export const verifySecret = (
  payload: string,
  secret: string,
  checksum: Buffer
) => {
  const hmac = createHmac('sha1', secret);
  const digestString = `sha1=${hmac.update(payload).digest('hex')}`;
  const digest = Buffer.from(digestString, 'utf8');

  return checksum.length === digest.length && timingSafeEqual(digest, checksum);
};
