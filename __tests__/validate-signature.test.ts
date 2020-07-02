import { validateSignature } from '../src/validate-signature';
import { Request, Response } from 'express';
import { verifySecret } from '../src/verify-secret';
import { mockModule } from '../test-utils/';

let mockVerifySecretResult = true;
const mockVerifySecret = jest.fn(() => mockVerifySecretResult);

mockModule('../src/verify-secret', { verifySecret: mockVerifySecret });

describe.only('#validateSignature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('given empty request body, should call next with error message', () => {
    const request = {
      body: {},
    };
    const response = {
      status: jest.fn(),
    };
    const next = jest.fn();

    validateSignature('some-secret')(
      request as Request,
      (response as unknown) as Response,
      next
    );

    expect(next).toHaveBeenCalledWith('Request body empty');
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('given valid parameters, should call verifySecret and call next without arguments', () => {
    mockVerifySecretResult = true;
    const mockSecret = 'some-secret';
    const mockSignature = 'some-signature';
    const body = { some: 'body' };

    const request = {
      body,
      get: () => mockSignature,
    };
    const response = {};
    const next = jest.fn();

    const expectedChecksum = Buffer.from(mockSignature, 'utf8');

    validateSignature(mockSecret)(
      (request as unknown) as Request,
      response as Response,
      next
    );

    expect(mockVerifySecret).toHaveBeenCalledWith(
      JSON.stringify(body),
      mockSecret,
      Buffer.from(mockSignature, 'utf8')
    );

    expect(next).toHaveBeenCalledWith();
  });

  it('given required parameters with falsy signature, should call verifySecret and call next with error message', () => {
    mockVerifySecretResult = false;
    const mockSecret = 'some-secret';
    const mockSignature = 'some-signature';
    const body = { some: 'body' };

    const request = {
      body,
      get: () => mockSignature,
    };
    const response = {
      status: jest.fn(),
    };
    const next = jest.fn();

    const expectedChecksum = Buffer.from(mockSignature, 'utf8');

    validateSignature(mockSecret)(
      (request as unknown) as Request,
      (response as unknown) as Response,
      next
    );

    expect(mockVerifySecret).toHaveBeenCalledWith(
      JSON.stringify(body),
      mockSecret,
      Buffer.from(mockSignature, 'utf8')
    );

    expect(next).toHaveBeenCalledWith(
      'Request body digest did not match X-Hub-Signature (some-signature)'
    );
    expect(response.status).toHaveBeenCalledWith(403);
  });
});
