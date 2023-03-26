/**
 * Save the product to local storage when viewed
 */

// Get local storage items or set viewedProducts to an empty array
const viewedProducts = localStorage.getItem('viewed-products') ? JSON.parse(localStorage.getItem('viewed-products')) : [];
// Get the products handle
const productHandle = document.querySelector('.main-product__inner').dataset.productHandle;

// Check to see if the current product is not already in viewedProducts
// Add current product to local storage
if (!viewedProducts.includes(productHandle)) {
    // Insert handle to the viewedProducts array
    viewedProducts.push(productHandle);
    // Set local storage item
    localStorage.setItem('viewed-products', JSON.stringify(viewedProducts));
}