
document.addEventListener("DOMContentLoaded", function () {
    // Function to handle "Add To Cart" button click
    function addToCart(title, price, imagePath) {
        // Retrieve existing cart items from local storage
        const existingCartItems = localStorage.getItem("cartItems");
        const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

        // Add the current course to the cart items
        cartItems.push({ title, price, imagePath });

        // Save the updated cart items back to local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Attach event listeners to "Add To Cart" buttons
    const addToCartButtons = document.querySelectorAll('.btn-custom');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            const title = card.querySelector('.card-title').innerText;
            const price = card.querySelector('.price').innerText.split(':')[1].trim();
            const imagePath = card.querySelector('.card-img-top').getAttribute('src');
            
            addToCart(title, price, imagePath);
            alert(`${title} added to the cart!`);
        });
    });
});

