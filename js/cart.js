// cart.js

document.addEventListener("DOMContentLoaded", function () {
    // Function to display cart items
    function displayCartItems() {
        // Retrieve cart items from local storage
        const existingCartItems = localStorage.getItem("cartItems");
        const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

        // Select the cart container
        const cartContainer = document.getElementById("cart-container");

        // Clear the existing content in the cart container
        cartContainer.innerHTML = '';

        // Display each cart item in the cart container
        cartItems.forEach(item => {
            // Create a Bootstrap card for each cart item
            const cartItemCard = document.createElement("div");
            cartItemCard.classList.add("card", "mb-3", "card-border");

            // Create a row for the card body
            const cardRow = document.createElement("div");
            cardRow.classList.add("row", "g-0");

            // Create column for the image
            const imgColumn = document.createElement("div");
            imgColumn.classList.add("col-md-4");

            // Create image element
            const imgElement = document.createElement("img");
            imgElement.src = item.imagePath;
            imgElement.alt = "Course Image";
            imgElement.classList.add("img-fluid");
            imgColumn.appendChild(imgElement);

            // Create column for the title and price
            const infoColumn = document.createElement("div");
            infoColumn.classList.add("col-md-6");

            // Create card body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            // Create title element
            const titleElement = document.createElement("h5");
            titleElement.textContent = item.title;
            titleElement.classList.add("card-title" ,"h2");
            cardBody.appendChild(titleElement);

            // Create price element
            const priceElement = document.createElement("p");
            priceElement.textContent = `Price: ${item.price}`;
            priceElement.classList.add("card-text", "price-courses", "h5");
            cardBody.appendChild(priceElement);

            // Append card body to the info column
            infoColumn.appendChild(cardBody);

            // Create column for the remove link
            const removeColumn = document.createElement("div");
            removeColumn.classList.add("col-md-2","mt-5");

            // Create remove link
            const removeLink = document.createElement("a");
            removeLink.href = "#";
            removeLink.textContent = "Remove";
            removeLink.classList.add( "btn-remove");
            removeLink.addEventListener('click', function () {
                // Remove the item from the cart and update the display
                const updatedCartItems = cartItems.filter(cartItem => cartItem.title !== item.title);
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                displayCartItems();
            });

            // Append remove link to the remove column
            removeColumn.appendChild(removeLink);

            // Append columns to the card row
            cardRow.appendChild(imgColumn);
            cardRow.appendChild(infoColumn);
            cardRow.appendChild(removeColumn);

            // Append card row to the card
            cartItemCard.appendChild(cardRow);

            // Append the card to the cart container
            cartContainer.appendChild(cartItemCard);
        });

        // Display the count of courses and total price
        displaySummarySection(cartItems);
    }

   // Function to display the summary section
function displaySummarySection(cartItems) {
    // Log the cart items to the console for debugging
    console.log(cartItems);

    const count = cartItems.length;
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

    const summaryContainer = document.getElementById("summary-container");
    summaryContainer.innerHTML = `
        <div class="row mt-5">
            <div class="col-md-6">
                <p class="cart-summary" >Courses in Cart: ${count}</p>
            </div>
            <div class="col-md-6">
                <p class="cart-summary" >Total Price: $${total}</p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <a href="#" class="btn btn-custom">Checkout</a>
            </div>
        </div>
    `;
}


    // Display cart items when the page is loaded
    displayCartItems();
});
