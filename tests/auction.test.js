// Import the required modules and controllers
import { getAllAuction } from './yourControllerFile.js';
import connection from '../config/conn.js';

// Mock the connection.query method to return mock data
jest.mock('../config/conn.js', () => ({
    query: jest.fn(),
}));

describe('Auction Controller Tests', () => {
    // Test getAllAuction function
    describe('getAllAuction', () => {
        it('should return all auctions', async () => {
            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };
            const mockResults = [{ id: 1, name: 'Auction 1' }, { id: 2, name: 'Auction 2' }];
            connection.query.mockImplementation((query, callback) => {
                callback(null, mockResults);
            });
            await getAllAuction(req, res);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockResults);
        });

        it('should handle database error', async () => {
            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };
            connection.query.mockImplementation((query, callback) => {
                callback(new Error('Database error'));
            });

            await getAllAuction(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch auctions' });
        });
    });

});
