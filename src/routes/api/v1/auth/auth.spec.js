const httpMocks = require('node-mocks-http');

const { register, login, logout, check } = require('./auth.ctrl');

let req = null;
let res = null;
let next = null;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('/api/v1/auth', () => {
  describe('[POST] /register', () => {
    describe('[Success]', () => {
      it('should hava a register function', () => {
        expect(typeof register).toBe('function');
      });
    });
    describe('[Failure]', () => {});
  });
  describe('[POST] /login', () => {
    describe('[Success]', () => {
      it('should hava a login function', () => {
        expect(typeof login).toBe('function');
      });
    });
    describe('[Failure]', () => {});
  });
  describe('[POST] /logout', () => {
    describe('[Success]', () => {
      it('should hava a logout function', () => {
        expect(typeof logout).toBe('function');
      });
    });
    describe('[Failure]', () => {});
  });
  describe('[GET] /check', () => {
    describe('[Success]', () => {
      it('should hava a check function', () => {
        expect(typeof check).toBe('function');
      });
    });
    describe('[Failure]', () => {});
  });
});
