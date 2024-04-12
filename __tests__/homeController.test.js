const { homeController } = require('../controllers/homeController');

const mockResponse = () => {
    const res = {};
    res.render = jest.fn().mockReturnValue(res);
    return res;
};

test('Renders the Customer Home page', async () => {
    const req = {};
    const res = mockResponse();

    await homeController(req, res);

    expect(res.render).toHaveBeenCalledWith('customerHome.ejs');
});