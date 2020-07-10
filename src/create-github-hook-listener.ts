import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Response, Request } from 'express';
import { validateSignature } from './validate-signature';

export interface ListenerProperties {
  secret: string;
  onAuthorizedCall: Function;
}

export const createGithubHookListener = ({
  secret,
  onAuthorizedCall,
}: ListenerProperties) => {
  const app = express();

  app.use(bodyParser.json());

  app.post('/', validateSignature(secret), (req: Request, res: Response) => {
    onAuthorizedCall();
    res.sendStatus(200);
  });

  return app;
};
