const quantityInputEl = document.querySelectorAll('.quantity-input');

if (quantityInputEl) {
    quantityInputEl.forEach(input => {
        let plusBtn = input.querySelector('.plus');
        let minusBtn = input.querySelector('.minus');
        let inputField = input.querySelector('input');
        
        plusBtn.addEventListener('click', () => inputField.value++);
        minusBtn.addEventListener('click', () => {
            return inputField.value == 1 ? '' : inputField.value--;
        });
    });
}
