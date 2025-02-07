const ShoppingCart = require('./Cart');
const axios = require('axios');

jest.mock('axios');

describe('ShoppingCart', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
        jest.clearAllMocks();
    });

    describe('addProduct', () => {
        it('should add a product to the cart', async () => {
            axios.get.mockResolvedValueOnce({ data: { price: 2.52 } });
            
            await cart.addProduct('cornflakes', 1);
            const contents = cart.getCartContents();
            
            expect(contents.cornflakes).toBe(1);
        });

        it('should accumulate quantity for the same product', async () => {
            axios.get.mockResolvedValueOnce({ data: { price: 2.52 } });
            axios.get.mockResolvedValueOnce({ data: { price: 2.52 } });
            
            await cart.addProduct('cornflakes', 1);
            await cart.addProduct('cornflakes', 1);
            const contents = cart.getCartContents();
            
            expect(contents.cornflakes).toBe(2);
        });
    });

    describe('calculations', () => {
        beforeEach(async () => {
            // Mock the example scenario
            axios.get.mockResolvedValueOnce({ data: { price: 2.52 } }); // cornflakes
            axios.get.mockResolvedValueOnce({ data: { price: 2.52 } }); // cornflakes
            axios.get.mockResolvedValueOnce({ data: { price: 9.98 } }); // weetabix
            
            await cart.addProduct('cornflakes', 1);
            await cart.addProduct('cornflakes', 1);
            await cart.addProduct('weetabix', 1);
        });

        it('should calculate correct subtotal', () => {
            expect(cart.calculateSubtotal()).toBe(15.02);
        });

        it('should calculate correct tax', () => {
            expect(cart.calculateTax()).toBe(1.88);
        });

        it('should calculate correct total', () => {
            expect(cart.calculateTotal()).toBe(16.90);
        });
    });

    describe('error handling', () => {
        it('should throw error for invalid product', async () => {
            const response = new Error('Request failed with status code 404');
            axios.get.mockRejectedValueOnce(response);

            try {
                await cart.addProduct('invalid-product', 1);
                fail('Expected an error to be thrown');
            } catch (error) {
                expect(error.message).toContain('Failed to fetch price for invalid-product');
            }
            
        });
    });
});
