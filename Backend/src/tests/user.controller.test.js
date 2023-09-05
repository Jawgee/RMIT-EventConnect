const axios = require('axios');
const { createUser, listUsers, getUserByID } = require('../controllers/user.controller.js');

// Mock Axios to simulate HTTP requests
jest.mock('axios');

// Import the real database connection pool
const originalConnectionPool = require('../../app.js');

describe('createUser', () => {
  it('should create a new user', async () => {
    // Mock the Axios POST request to simulate user creation
    axios.post.mockResolvedValue({
      data: {
        id: 1,
        first_name: 'New',
        last_name: 'User',
        email: 'newuser@example.com',
        password: 'Password123!',
      },
    });

    // Create a mock request and response object
    const req = {
      body: {
        first_name: 'New',
        last_name: 'User',
        email: 'newuser@example.com',
        password: 'Password123!',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Mock the status method to chain it
      cookie: jest.fn(), // Mock the cookie method if needed
    };

    // Create a mock database connection pool
    const connectionPool = {
      query: jest.fn((query, params, callback) => {
        // Simulate a successful query execution
        callback(null, /* query result */);
      }),
    };

    // Replace the real connection pool with the mock connection pool
    jest.mock('../your-database-module', () => ({
      ...originalConnectionPool,
      connectionPool,
    }));

    // Call the createUser function
    await createUser(req, res);

    // Assert the expected behavior
    expect(res.status).toHaveBeenCalledWith(200); // Assuming 200 for success
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      first_name: 'New',
      last_name: 'User',
      email: 'newuser@example.com',
    });
    expect(res.cookie).toHaveBeenCalledWith({httpOnly: true,maxAge: 3600000,});
  });
});
