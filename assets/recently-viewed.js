/**
 * Displays recently viewed items in local storage
 */

// Get revcently viewied items or set an empty array
const recentlyViewed = localStorage.getItem('viewed-products') ? JSON.parse(localStorage.getItem('viewed-products')) : [];
// Get DOM element to render items to
const recentlyViewedItemsEl = document.querySelector('.recently-viewed__items');

// Check to see if the recentlyViewed array is empty
// Loop through recentlyViewed array and get product information
// Render product information to the DOM
if (recentlyViewed.length > 0) {
    // Loop through viewed items
    recentlyViewed.forEach(productHandle => {
        // Send get request to Shopify API to get product information
        fetch(`${window.Shopify.routes.root}products/${productHandle}.js`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Renders details to the DOM
                recentlyViewedItemsEl.innerHTML += `
                    <div class="recently-viewed__item">
                        <img 
                            src="${data.media[0].src}"
                            alt="${data.media[0].alt}"
                        >
                        <h2>${data.title}</h2>
                        <a href="${data.url}" class="button">
                            See Product
                        </a>
                    </div>
                `;
            });
    });
}