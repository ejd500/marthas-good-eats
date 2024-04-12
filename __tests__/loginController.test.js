DEBUG = true

const bcrypt = require('bcrypt');
const loginDAL = require('../services/pg.login.dal');

const { loginGetController, loginPostController } = require('../controllers/loginController');

const mockUser = {
  user_id: 1,
  email: 'jest_test@email.com',
  password: '$2b$10$1uBOYk3g/XonoZAjAkJ57.k67VJsE8eeOpebC7/XJONS3ffwYTwbG',
  is_staff: false,
};

const mockResponse = () => {
    const res = {};
    res.render = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
  };

const mockRequest = (sessionData, body) => ({
  session: sessionData,
  body: body,
});

jest.mock('../services/pg.login.dal', () => ({
  getLoginByEmail: jest.fn(),
}));
  
test('Renders the Login page', async () => {
  const req = {};
  const res = mockResponse();

  await loginGetController(req, res);

  expect(res.render).toHaveBeenCalledWith('login', { error: null });
});

test('Redirects to Customer or Staff Home page upon successful login', async () => {
  const req = mockRequest({}, { email: 'test@example.com', password: 'password' });
  const res = mockResponse();

  loginDAL.getLoginByEmail.mockResolvedValueOnce([mockUser]);
  const bcryptCompareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

  await loginPostController(req, res);

  expect(bcryptCompareMock).toHaveBeenCalledWith('password', mockUser.password);
  expect(req.session.user).toEqual({
    user_id: mockUser.user_id,
    email: mockUser.email,
    isStaff: mockUser.is_staff,
  });
  expect(res.redirect).toHaveBeenCalledWith('/home');
});