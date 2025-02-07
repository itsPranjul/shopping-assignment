A simple shopping cart implementation in JavaScript that provides basic shopping cart capabilities with integration to a Price API. 

## Features

- Add products to cart with quantity
- Automatic price fetching from Price API
- Calculate cart subtotal, tax, and total
- Handle multiple quantities of the same product
- Proper rounding of monetary values
- Error handling for invalid products
- Full test coverage

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd shopping-cart
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
shopping-cart/
├── cart.js         # Main cart implementation
├── cart.test.js    # Test suite
├── index.js        # Example usage
└── package.json    # Project configuration
```

## Usage

### Starting the Price API

Before using the cart, start the Price API server:
```bash
npm run serve-products
```

The API will be available at `http://localhost:3001`

### Available Products

The following products are available in the Price API:
- cheerios
- cornflakes
- frosties
- shreddies
- weetabix

### Basic Usage

```javascript
const ShoppingCart = require('./cart');

async function runExample() {
    const cart = new ShoppingCart();
    
    // Add products
    await cart.addProduct('cornflakes', 1);
    await cart.addProduct('cornflakes', 1);
    await cart.addProduct('weetabix', 1);
    
    // Get cart state
    console.log('Cart State:', cart.getCartState());
}

runExample().catch(console.error);
```

### Running Tests

```bash
npm test
```

## Implementation Details

### Cart Class Methods

- `addProduct(productName, quantity)`: Adds a product to the cart
- `getCartContents()`: Returns current cart contents
- `calculateSubtotal()`: Calculates cart subtotal
- `calculateTax()`: Calculates tax (12.5%)
- `calculateTotal()`: Calculates final total
- `getCartState()`: Returns complete cart state

### Example Output

For the example scenario (1 × weetabix and 2 × cornflakes):

```javascript
{
  contents: {
    cornflakes: 2,
    weetabix: 1
  },
  subtotal: 15.02,
  tax: 1.88,
  total: 16.90
}
```

## Technical Choices

1. **Data Structure**: Used `Map` for storing cart items for efficient lookups and updates
2. **HTTP Client**: Used `axios` for reliable HTTP requests to the Price API
3. **Testing**: Used `Jest` for testing with mocked API calls
4. **Error Handling**: Comprehensive error handling for API failures and invalid products

## Testing

The test suite covers:
- Product addition
- Quantity accumulation
- Price calculations
- Error handling
- Example scenario validation

## Dependencies

- axios: HTTP client for API requests
- jest: Testing framework

## Assumptions and Trade-offs

1. Prices are assumed to be in the same currency
2. Rounding is done up to 2 decimal places
3. Tax rate is fixed at 12.5%
4. No persistent storage as per requirements
5. Single cart instance per use case
