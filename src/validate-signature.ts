import { Request, Response, NextFunction } from 'express';
import { verifySecret } from './verify-secret';

const SIGNATURE_HEADER_NAME = 'X-Hub-Signature';

export const validateSignature = (secret: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = JSON.stringify(req.body);

  if (payload.length <= 2) {
    res.status(400);
    return next('Request body empty');
  }

  const signature = req.get(SIGNATURE_HEADER_NAME) || '';
  const checksum = Buffer.from(signature, 'utf8');

  if (verifySecret(payload, secret, checksum)) {
    next();
  } else {
    res.status(403);
    next(
      `Request body digest did not match ${SIGNATURE_HEADER_NAME} (${checksum})`
    );
  }
};
