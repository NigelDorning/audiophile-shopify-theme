/**
 * Handle the quantity input on single product page
 */
const quantityInputEl = document.querySelector('.quantity-input');

if (quantityInputEl) {
    const plusBtn = quantityInputEl.querySelector('.plus');
    const minusBtn = quantityInputEl.querySelector('.minus');
    const inputField = quantityInputEl.querySelector('input');
    
    plusBtn.addEventListener('click', () => inputField.value++);
    minusBtn.addEventListener('click', () => {
        return inputField.value == 1 ? '' : inputField.value--;
    });
}