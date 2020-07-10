import { agent } from 'supertest';
import { createGithubHookListener } from '../src/create-github-hook-listener';

describe('createGithubHookListener', () => {
  const mockSecret = 'somesecret';
  const onAuthorizedCall = jest.fn();

  const app = createGithubHookListener({
    secret: mockSecret,
    onAuthorizedCall,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('when called without body, should return status 400', async () => {
    await agent(app).post('/').expect(400);
    expect(onAuthorizedCall).not.toHaveBeenCalled();
  });

  it('when called with correct signature and a body, should call error status', async () => {
    await agent(app)
      .post('/')
      .set('X-Hub-Signature', 'sha1=1421d29dc52a5cdcc7447e10442677fc0da137a6')
      .send({ some: 'body' })
      .expect(200);
    expect(onAuthorizedCall).toHaveBeenCalled();
  });

  it('when called with incorrect signature and a body, should call error status', async () => {
    await agent(app)
      .post('/')
      .set('X-Hub-Signature', 'sha1=somewrongsignature')
      .send({ some: 'body' })
      .expect(403);
    expect(onAuthorizedCall).not.toHaveBeenCalled();
  });
});
