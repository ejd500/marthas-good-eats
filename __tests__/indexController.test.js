const { indexController } = require('../controllers/indexController');

const mockResponse = () => {
    const res = {};
    res.render = jest.fn().mockReturnValue(res);
    return res;
};

test('Renders the Index page', async () => {
    const req = {};
    const res = mockResponse();

    await indexController(req, res);

    expect(res.render).toHaveBeenCalledWith('index.ejs');
});

