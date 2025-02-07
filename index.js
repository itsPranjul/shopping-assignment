const ShoppingCart = require('./Cart');

async function runExample() {
    const cart = new ShoppingCart();
    
    // Add products as per the example
    await cart.addProduct('cornflakes', 2);
    await cart.addProduct('weetabix', 1);
    await cart.addProduct(`frosties`,1);
    
    // Get cart state
    console.log('Cart State:', cart.getCartState());
}

runExample().catch(console.error);