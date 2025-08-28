// Assuming productGrid is your main product listing container
const productGrid = document.getElementById('productGrid');

// Create or select a container for product details below the product grid
let productDetailSection = document.getElementById('productDetailSection');
if (!productDetailSection) {
    productDetailSection = document.createElement('div');
    productDetailSection.id = 'productDetailSection';
    productDetailSection.style.display = 'none'; // Initially hidden
    productDetailSection.className = 'mt-10 p-4 bg-white rounded shadow max-w-6xl mx-auto';
    productGrid.parentNode.insertBefore(productDetailSection, productGrid.nextSibling);
}

// Function to render product details + related products below the product grid
function showProductDetailsWithRelated(product) {
    if (!product) return;

    // Related products: same category, excluding current product
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

    // Build related products HTML
    let relatedHTML = '';
    if (relatedProducts.length > 0) {
        relatedHTML += `<h3 class="text-xl font-semibold mb-4">Related Products</h3><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">`;
        relatedProducts.forEach(rp => {
            const discountBadge = rp.discount 
                ? `<span class="bg-red-500 text-white px-2 py-1 text-xs rounded">${rp.discount}% OFF</span>` 
                : '';
            const originalPrice = rp.originalPrice 
                ? `<span class="line-through text-gray-500">₹${rp.originalPrice}</span>` 
                : '';
            const rating = rp.rating 
                ? `<p class="text-yellow-500 text-sm">★${rp.rating}</p>` 
                : '';
            relatedHTML += `
                <div class="product cursor-pointer bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-105" data-product-id="${rp.id}">
                    <img src="${rp.image}" alt="${rp.name}" class="w-full object-cover ">
                    <div class="p-3">
                        ${discountBadge}
                        <h4 class="font-bold mt-2">${rp.name}</h4>
                        <p class="text-orange-600 font-semibold">₹${rp.price} ${originalPrice}</p>
                        ${rating}
                    </div>
                </div>
            `;
        });
        relatedHTML += `</div>`;
    }

    // Build main product detail HTML
    productDetailSection.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 mt-20">
            <img src="${product.image}" alt="${product.name}" class="w-2/5 object-cover rounded">
            <div class="md:w-1/2">
                <h2 class="text-3xl font-bold mb-2">${product.name}</h2>
                ${product.discount ? `<span class="bg-red-500 text-white px-2 py-1 text-sm rounded">${product.discount}% OFF</span>` : ''}
                <p class="text-xl text-orange-600 font-semibold mt-2">₹${product.price} ${product.originalPrice ? `<span class="line-through text-gray-500 text-base ml-2">₹${product.originalPrice}</span>` : ''}</p>
                ${product.rating ? `<p class="text-yellow-500 text-lg mt-1">★${product.rating}</p>` : ''}
                ${product.description ? `<p class="mt-4 text-gray-700">${product.description}</p>` : ''}
                <button id="detailAddToCartBtn" class="mt-6 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded transition">Add to Cart</button>
                <button id="closeDetailsBtn" class="mt-4 text-gray-600 underline cursor-pointer ">Close Details</button>
            </div>
        </div>
        ${relatedHTML}
    `;

    // Show the detail section
    productDetailSection.style.display = 'block';

    // Scroll to detail section smoothly
    productDetailSection.scrollIntoView({ behavior: 'smooth' });

    // Add to cart button inside detail section
    const detailAddToCartBtn = document.getElementById('detailAddToCartBtn');
    detailAddToCartBtn.addEventListener('click', () => {
        addToCart(product.id);
        showNotification(`${product.name} added to cart!`);
    });

    // Close details button
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    closeDetailsBtn.addEventListener('click', () => {
        productDetailSection.style.display = 'none';
    });

    // Add click listeners to related products to open their details
    const relatedProductCards = productDetailSection.querySelectorAll('.product');
    relatedProductCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.getAttribute('data-product-id'));
            const prod = products.find(p => p.id === id);
            if (prod) {
                showProductDetailsWithRelated(prod);
            }
        });
    });
}

// Modify your renderProducts function to add click event on product cards (except Add to Cart button)
function renderProducts(productsToRender) {     
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const discountBadge = product.discount 
            ? `<span class="bg-red-500 text-white px-2 py-1 text-xs rounded">${product.discount}% OFF</span>` 
            : '';
        
        const originalPrice = product.originalPrice 
            ? `<span class="line-through text-gray-500">₹${product.originalPrice}</span>` 
            : '';
        
        const rating = product.rating 
            ? `<p class="text-yellow-500 text-sm">★${product.rating}</p>` 
            : '';

        const productCard = document.createElement('div');
        productCard.className = `product bg-white rounded-lg shadow overflow-hidden category-${product.category} transition-all duration-300 cursor-pointer`;
        productCard.setAttribute('data-product-id', product.id);
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full object-cover ">
            <div class="p-4">
                ${discountBadge}
                <h3 class="font-bold mt-2">${product.name}</h3>
                <p class="text-orange-600 font-semibold">₹${product.price} ${originalPrice}</p>
                ${rating}
                <button class="add-to-cart-btn bg-orange-600 hover:bg-orange-700 text-white w-full py-2 rounded mt-3 transition-colors duration-300">Add to Cart</button>
            </div>
        `;

        // Prevent card click when clicking Add to Cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
            showNotification(`${product.name} added to cart!`);
        });

        // On product card click, show details below product grid
        productCard.addEventListener('click', () => {
            showProductDetailsWithRelated(product);
        });

        productGrid.appendChild(productCard);
    });
}

// On DOMContentLoaded, call renderProducts as usual
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartCounter();
    // ... your other initialization code ...
});
