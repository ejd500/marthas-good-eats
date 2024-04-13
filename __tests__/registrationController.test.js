const { registrationGetController, registrationPostController } = require('../controllers/registrationController');

const loginDAL = require('../services/pg.login.dal');

const mockRequest = (body) => ({
    body: body,
});

const mockResponse = () => {
    const res = {};
    res.render = jest.fn().mockReturnValue(res);
    return res;
};

const mockUser = {
    first_name: 'Corina',
    last_name: 'Jewer',
    email: 'corina@email.com',
    password: 'password',
    isStaff: true,
};

const mockError = ('500 - Internal Server Error'); 
  
test('Renders the Registration page', async () => {
    const req = {};
    const res = mockResponse();

    await registrationGetController(req, res);

    expect(res.render).toHaveBeenCalledWith('registration.ejs');
});
  
test('Renders Thank-You page upon successful registration', async () => {
    const req = mockRequest(mockUser);
    const res = mockResponse();
    
    loginDAL.createUser = jest.fn().mockResolvedValueOnce();
    
    await registrationPostController(req, res);

    expect(loginDAL.createUser).toHaveBeenCalledWith(
      mockUser.first_name,
      mockUser.last_name,
      mockUser.email,
      mockUser.password,
      mockUser.isStaff
    );
    expect(res.render).toHaveBeenCalledWith('thank-you.ejs');
});

test('Renders 500 error page if registration fails', async () => {
    const req = mockRequest(mockUser);
    const res = mockResponse(); 
    
    loginDAL.createUser = jest.fn().mockRejectedValueOnce(mockError);

    await registrationPostController(req, res);

    expect(loginDAL.createUser).toHaveBeenCalledWith(
      mockUser.first_name,
      mockUser.last_name,
      mockUser.email,
      mockUser.password,
      mockUser.isStaff
    );
    expect(res.render).toHaveBeenCalledWith('500.ejs', { error: '500 - Internal Server Error' });
});