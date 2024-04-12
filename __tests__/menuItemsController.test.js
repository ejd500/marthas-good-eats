const { menuItemsController } = require('../controllers/menuItemsController');
const fullTextDAL = require('../services/pg.fulltext.dal');
const menuItemsDAL = require('../services/pg.menuItems.dal');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new EventEmitter();


const mockRequest = (query) => ({
    query: query,
    session: { user: { user_id: 1 } } 
});

const mockResponse = () => {
    const res = {};
    res.render = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

const mockMenuItems = [
    { menu_id: 1, name: 'Item 1', category: 'Breakfast' },
    { menu_id: 2, name: 'Item 2', category: 'Lunch' },
];

const mockError = ('500 - Internal Server Error');

jest.mock('../services/pg.fulltext.dal', () => ({
    getFullText: jest.fn(),
}));

jest.mock('../services/pg.menuItems.dal', () => ({
    getMenuItems: jest.fn(),
}));

test('Renders menu items when selectedCategory is not provided', async () => {
    const req = mockRequest({});
    const res = mockResponse();

    menuItemsDAL.getMenuItems.mockResolvedValueOnce(mockMenuItems);

    await menuItemsController(req, res);

    expect(menuItemsDAL.getMenuItems).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('menuItems', {
    groupedMenuItems: { 'Breakfast': [mockMenuItems[0]], 'Lunch': [mockMenuItems[1]] },
    selectedCategory: undefined,
    });
});

test('Renders menu items by category when category is provided', async () => {
    const req = mockRequest({ category: 'Breakfast' });
    const res = mockResponse();

    menuItemsDAL.getMenuItems.mockResolvedValueOnce(mockMenuItems);

    await menuItemsController(req, res);

    expect(menuItemsDAL.getMenuItems).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('menuItems', {
        groupedMenuItems: { 'Breakfast': [mockMenuItems[0]] },
        selectedCategory: 'Breakfast',
    });
});

test('Renders 500 error page when an error occurs', async () => {
    const req = mockRequest({});
    const res = mockResponse();

    menuItemsDAL.getMenuItems.mockRejectedValueOnce(mockError);

    await menuItemsController(req, res);

    expect(menuItemsDAL.getMenuItems).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith('500');
    expect(res.render).toHaveBeenCalledWith('500', { error: '500 - Internal Server Error' });
});
