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
                
                // Rating property fix (assume rating is a number or string)
                const rating = product.rating 
                    ? `<p class="text-yellow-500 text-sm">★${product.rating}</p>` 
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

            // --- main.js logic below ---

            // Image Slider Animation
            const slides = document.querySelector('.slides');
            let currentSlide = 0;
            const slideCount = 5;

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                if (slides) {
                    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
                }
            }

            // Start slider only if slides exist
            if (slides) {
                setInterval(nextSlide, 5000);
            }

            // Initialize Swiper for testimonials if it exists
            if (typeof Swiper !== 'undefined') {
                const testimonialSwiper = document.querySelector(".testimonialSwiper");
                if (testimonialSwiper) {
                    new Swiper(".testimonialSwiper", {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false,
                        },
                        breakpoints: {
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        },
                    });
                }

                // Initialize Swiper for product gallery if it exists
                const productSwiper = document.querySelector(".productSwiper");
                if (productSwiper) {
                    new Swiper(".productSwiper", {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                    });
                }
            }

            // GSAP Animations if available
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);

                // Hero text animation
                gsap.from("h1", {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: "power3.out"
                });

                // Highlight cards animation
                gsap.from(".card-hover", {
                    scrollTrigger: {
                        trigger: ".card-hover",
                        start: "top 80%",
                    },
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    stagger: 0.2,
                    ease: "power2.out"
                });

                // Product cards animation
                gsap.from(".product-card", {
                    scrollTrigger: {
                        trigger: ".product-card",
                        start: "top 80%",
                    },
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    stagger: 0.3,
                    ease: "power3.out"
                });

                // Counter animation
                const counters = document.querySelectorAll('#years-counter, #products-counter, #artisans-counter');
                
                if (counters.length > 0) {
                    ScrollTrigger.create({
                        trigger: "#years-counter",
                        start: "top 80%",
                        onEnter: () => {
                            if (typeof animateCounter === 'function') {
                                animateCounter("years-counter", 0, 28, 2000);
                                animateCounter("products-counter", 0, 12500, 2000);
                                animateCounter("artisans-counter", 0, 47, 2000);
                            }
                        }
                    });
                }
            }

            // Counter animation function
            function animateCounter(id, start, end, duration) {
                let obj = document.getElementById(id);
                if (!obj) return;
                
                let range = end - start;
                let current = start;
                let increment = end > start ? 1 : -1;
                let stepTime = Math.abs(Math.floor(duration / range));
                let timer = setInterval(() => {
                    current += increment;
                    obj.textContent = current.toLocaleString();
                    if (current == end) {
                        clearInterval(timer);
                    }
                }, stepTime);
            }

            // Form validation
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.getElementById('name');
                    const email = document.getElementById('email');
                    const phone = document.getElementById('phone');
                    const message = document.getElementById('message');
                    
                    if (!name || !email || !message) {
                        alert('Please fill in all required fields');
                        return;
                    }
                    
                    if (!isValidEmail(email.value)) {
                        alert('Please enter a valid email address');
                        return;
                    }
                    
                    // Here you would typically send the form data to your server
                    // For demonstration, we'll just show an alert
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                });
            }

            function isValidEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }

            // Mobile menu functionality
            const menuToggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');

            if (menuToggle && mobileMenu) {
                // Toggle menu on hamburger click
                menuToggle.addEventListener('click', function () {
                    mobileMenu.classList.toggle('hidden');
                });

                // Close menu when clicking on a menu link
                const mobileMenuLinks = mobileMenu.querySelectorAll('a');
                mobileMenuLinks.forEach(link => {
                    link.addEventListener('click', function () {
                        mobileMenu.classList.add('hidden');
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', function (event) {
                    const isClickInsideMenu = mobileMenu.contains(event.target);
                    const isClickOnToggle = menuToggle.contains(event.target);

                    if (!isClickInsideMenu && !isClickOnToggle) {
                        mobileMenu.classList.add('hidden');
                    }
                });
            }

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Add fade-in animation to elements when they come into view
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeIn');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.animate-fadeIn').forEach(el => {
                observer.observe(el);
            });

            console.log('Main.js initialization complete');
        });

        // Cart Modal functionality
        const cartModal = document.getElementById('cartModal');
        const cartBtn = document.getElementById('cartBtn');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');

        if (cartBtn && cartModal) {
            cartBtn.addEventListener('click', () => {
                cartModal.classList.remove('hidden');
                renderCart();
            });
        }

        if (closeCart && cartModal) {
            closeCart.addEventListener('click', () => {
                cartModal.classList.add('hidden');
            });
        }

        function renderCart() {
            if (!cartItems) return;
            
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
                            <p class="text-primary">₹${item.price}</p>
                        </div>
                        <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                    `;
                    cartItems.appendChild(productDiv);
                });
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartCounter();
            renderCart();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
