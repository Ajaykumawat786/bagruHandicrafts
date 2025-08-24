    //  Include product data and functions -->


        // Cart array to store items
        let cart = [];

        // Function to render products
        function renderProducts(productsToRender) {
            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = '';
            
            productsToRender.forEach(product => {
                const discountBadge = product.discount 
                    ? `<span class="bg-red-500 text-white px-2 py-1 text-xs rounded">${product.discount}% OFF</span>` 
                    : '';
                
                const originalPrice = product.originalPrice 
                    ? `<span class="line-through text-gray-500">₹${product.originalPrice}</span>` 
                    : '';
                
                const rating = product.rating 
                    ? `<p class="text-yellow-500 text-sm">★${product.rating.stars} <span class="text-gray-500">(${product.rating.count})</span></p>` 
                    : '';

                const productCard = document.createElement('div');
                productCard.className = `product bg-white rounded-lg shadow overflow-hidden category-${product.category} transition-all duration-300`;
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full  object-cover">
                    <div class="p-4">
                        ${discountBadge}
                        <h3 class="font-bold mt-2">${product.name}</h3>
                        <p class="text-orange-600 font-semibold">₹${product.price} ${originalPrice}</p>
                        ${rating}
                        ${product.description ? `<p class="text-sm text-gray-600 mt-2">${product.description}</p>` : ''}
                        <button onclick="addToCart(${product.id})" class="bg-orange-600 hover:bg-orange-700 text-white w-full py-2 rounded mt-3 transition-colors duration-300">Add to Cart</button>
                    </div>
                `;
                
                productGrid.appendChild(productCard);
            });
        }

        // Function to add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            // Update cart counter
            updateCartCounter();
            
            // Show notification
            showNotification(`${product.name} added to cart!`);
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Function to update cart counter
        function updateCartCounter() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            const cartCounter = document.getElementById('cart-counter');
            
            if (cartCounter) {
                cartCounter.textContent = totalItems;
                cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        }

        // Function to show notification
        function showNotification(message) {
            const notification = document.getElementById('cart-notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Function to filter products by category
        function filterProducts(category) {
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                renderProducts(filteredProducts);
            }
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Load cart from localStorage if available
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
            
            // Render all products initially
            renderProducts(products);
            
            // Update cart counter
            updateCartCounter();
            
            // Add event listeners to category buttons
            document.querySelectorAll('.category-btn').forEach(button => {
                button.addEventListener('click', function() {
                    // Update active button
                    document.querySelectorAll('.category-btn').forEach(btn => {
                        btn.classList.remove('bg-orange-600', 'text-white');
                        btn.classList.add('bg-white', 'text-gray-700');
                    });
                    this.classList.remove('bg-white', 'text-gray-700');
                    this.classList.add('bg-orange-600', 'text-white');
                    
                    // Filter products
                    filterProducts(this.dataset.category);
                });
            });
        });
    


        

        
        // Mobile Menu Toggle
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });

        // Auth Modal
        const authModal = document.getElementById('authModal');
        const loginBtn = document.getElementById('loginBtn');
        const closeModal = document.getElementById('closeModal');
        const toggleAuth = document.getElementById('toggleAuth');
        const modalTitle = document.getElementById('modalTitle');
        const toggleText = document.getElementById('toggleText');
        const authForm = document.getElementById('authForm');

        loginBtn.addEventListener('click', () => {
            authModal.classList.remove('hidden');
            modalTitle.textContent = 'Login';
            toggleText.textContent = "Don't have an account? ";
            toggleAuth.textContent = 'Signup';
        });

        closeModal.addEventListener('click', () => {
            authModal.classList.add('hidden');
        });

        toggleAuth.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalTitle.textContent === 'Login') {
                modalTitle.textContent = 'Signup';
                toggleText.textContent = 'Already have an account? ';
                toggleAuth.textContent = 'Login';
            } else {
                modalTitle.textContent = 'Login';
                toggleText.textContent = "Don't have an account? ";
                toggleAuth.textContent = 'Signup';
            }
        });

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(modalTitle.textContent + ' successful!');
            authModal.classList.add('hidden');
        });

        // Cart Functionality
        // const cart = [];
        const cartModal = document.getElementById('cartModal');
        const cartBtn = document.getElementById('cartBtn');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');

        cartBtn.addEventListener('click', () => {
            cartModal.classList.remove('hidden');
            renderCart();
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });

        function addToCart(name, price, image) {
            cart.push({ name, price, image });
            cartCount.textContent = cart.length;
            alert(name + ' added to cart!');
        }

        function renderCart() {
            cartItems.innerHTML = '';
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
            } else {
                cart.forEach((item, index) => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('bg-white', 'rounded-lg', 'shadow', 'overflow-hidden', 'flex', 'items-center', 'p-4');
                    productDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover mr-4">
                        <div class="flex-1">
                            <h3 class="font-bold">${item.name}</h3>
                            <p class="text-primary">${item.price}</p>
                        </div>
                        <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                    `;
                    cartItems.appendChild(productDiv);
                });
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            cartCount.textContent = cart.length;
            renderCart();
        }

        // Image Slider Animation
        const slides = document.querySelector('.slides');
        let currentSlide = 0;
        const slideCount = 5;

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        setInterval(nextSlide, 5000);

        // Product Filtering
        function filterProducts(category) {
            const products = document.querySelectorAll('.product');
            products.forEach(product => {
                if (category === 'all' || product.classList.contains(`category-${category}`)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }

        // Initial show all
        filterProducts('all');
    