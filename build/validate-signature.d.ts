import { Request, Response, NextFunction } from 'express';
export declare const validateSignature: (secret: string) => (req: Request, res: Response, next: NextFunction) => void;
