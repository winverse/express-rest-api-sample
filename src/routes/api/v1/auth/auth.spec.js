const httpMocks = require('node-mocks-http');

const { User } = require('database/models');
const { mockUser } = require('test/mock');
const { register, login, logout } = require('./auth.ctrl');

let req = null;
let res = null;
let next = null;

User.findOne = null;
User.register = null;

beforeEach(() => {
  User.findOne = jest.fn();
  User.register = jest.fn();

  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('/api/v1/auth', () => {
  describe('[POST] /register', () => {
    let existUser = null;
    beforeEach(async () => {
      const { payload, user } = await mockUser();
      existUser = user;
      req.body = payload;
    });
    describe('[Success]', () => {
      it('should hava a register function', () => {
        expect(typeof register).toBe('function');
      });
      it('should return 201 status code in response', async () => {
        User.findOne.mockResolvedValue(null);
        User.register.mockResolvedValue(existUser);
        await register(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBe(true);
      });
    });
    describe('[Failure]', () => {
      it('should return 400 status code in response', async () => {
        req.body.email = null;
        await register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBe(true);
      });
      it('should return 409 status code in response', async () => {
        User.findOne.mockResolvedValue(existUser);
        await register(req, res, next);
        expect(res.statusCode).toBe(409);
        expect(res._isEndCalled()).toBe(true);
      });
      it('should handle error: User.findOne', async () => {
        const errorMessage = { message: 'throw User.findOne error' };
        User.findOne.mockRejectedValue(errorMessage);
        await register(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
      });
      it('should handle error: User.register', async () => {
        const errorMessage = { message: 'throw User.register error' };
        User.findOne.mockResolvedValue(null);
        User.register.mockRejectedValue(errorMessage);
        await register(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
      });
    });
  });
  describe('[POST] /login', () => {
    let loggedUser = null;
    beforeEach(async () => {
      const { payload, user } = await mockUser();
      const { username, ...rest } = payload;
      user.validatePassword = jest.fn();
      loggedUser = user;
      req.body = { ...rest };
    });
    describe('[Success]', () => {
      it('should hava a login function', () => {
        expect(typeof login).toBe('function');
      });
      it('should return 200 ststus code in response', async () => {
        User.findOne.mockResolvedValue(loggedUser);
        loggedUser.validatePassword.mockReturnValue(true);
        await login(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBe(true);
      });
    });
    describe('[Failure]', () => {
      it('should return 400 status code in response', async () => {
        req.body.email = null;
        await login(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBe(true);
      });
      it('should handle error: User.findOne', async () => {
        const errorMessage = { message: 'throw User.findOne' };
        User.findOne.mockRejectedValue(errorMessage);
        await login(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
      });
      it('should return 404 status code in response', async () => {
        User.findOne.mockResolvedValue(null);
        await login(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBe(true);
      });
      it('should return 403 statusCode code in response', async () => {
        User.findOne.mockResolvedValue(loggedUser);
        loggedUser.validatePassword.mockReturnValue(false);
        await login(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(res._isEndCalled()).toBe(true);
      });
      it('should handle error, user.validatePassword', async () => {
        const error = new Error('throw user.validatePassword');
        User.findOne.mockResolvedValue(loggedUser);
        loggedUser.validatePassword.mockImplementation(() => {
          throw error;
        });
        await login(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
  describe('[POST] /logout', () => {
    describe('[Success]', () => {
      it('should hava a logout function', () => {
        expect(typeof logout).toBe('function');
      });
      it('should return 200 status code in response', async () => {
        await logout(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBe(true);
      });
    });
  });
});
