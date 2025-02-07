const axios = require('axios');

class ShoppingCart {
    constructor() {
        this.items = new Map();
        this.TAX_RATE = 0.125; // 12.5%
        this.API_BASE_URL = 'http://localhost:3001/products';
    }

    async addProduct(productName, quantity) {
        try {
            const price = await this.fetchProductPrice(productName);
            const currentQuantity = this.items.get(productName)?.quantity || 0;
            this.items.set(productName, {
                quantity: currentQuantity + quantity,
                price
            });
        } catch (error) {
            throw new Error(`Failed to add product: ${error.message}`);
        }
    }

    async fetchProductPrice(productName) {
        try {
            const response = await axios.get(`${this.API_BASE_URL}/${productName}`);
            return response.data.price;
        } catch (error) {
            throw new Error(`Failed to fetch price for ${productName}`);
        }
    }

    getCartContents() {
        const contents = {};
        this.items.forEach((item, productName) => {
            contents[productName] = item.quantity;
        });
        return contents;
    }

    calculateSubtotal() {
        let subtotal = 0;
        this.items.forEach((item) => {
            subtotal += item.price * item.quantity;
        });
        return Math.ceil(subtotal * 100) / 100;
    }

    calculateTax() {
        const tax = this.calculateSubtotal() * this.TAX_RATE;
        return Math.ceil(tax * 100) / 100;
    }

    calculateTotal() {
        const total = this.calculateSubtotal() + this.calculateTax();
        return Math.ceil(total * 100) / 100;
    }

    getCartState() {
        return {
            contents: this.getCartContents(),
            subtotal: this.calculateSubtotal(),
            tax: this.calculateTax(),
            total: this.calculateTotal()
        };
    }
}

module.exports = ShoppingCart;
