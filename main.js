

  // Image Slider Animation
        const slides = document.querySelector('.slides');
        let currentSlide = 0;
        const slideCount = 5;

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        setInterval(nextSlide, 5000);


        // Initialize Swiper for testimonials
        var testimonialSwiper = new Swiper(".testimonialSwiper", {
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

        // Initialize Swiper for product gallery
        var productSwiper = new Swiper(".productSwiper", {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        // GSAP Animations
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
                    animateCounter("years-counter", 0, 28, 2000);
                    animateCounter("products-counter", 0, 12500, 2000);
                    animateCounter("artisans-counter", 0, 47, 2000);
                }
            });
        }

        function animateCounter(id, start, end, duration) {
            let obj = document.getElementById(id);
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
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const message = document.getElementById('message').value;
                
                if (!name || !email || !message) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                if (!isValidEmail(email)) {
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

        // Shopping Cart Functionality
        let cart = [];
        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');
        const cartModal = document.getElementById('cart-modal');
        const closeCart = document.getElementById('close-cart');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartNotification = document.getElementById('cart-notification');

        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = productCard.getAttribute('data-product-id');
                const productName = productCard.getAttribute('data-product-name');
                const productPrice = parseFloat(productCard.getAttribute('data-product-price'));
                
                addToCart(productId, productName, productPrice, 1);
                
                // Show notification
                cartNotification.classList.add('active');
                setTimeout(() => {
                    cartNotification.classList.remove('active');
                }, 3000);
            });
        });

        // View details buttons
        const viewDetailsButtons = document.querySelectorAll('.view-details');
        const productModal = document.getElementById('product-modal');
        const closeProduct = document.getElementById('close-product');
        const modalProductName = document.getElementById('modal-product-name');
        const modalProductDescription = document.getElementById('modal-product-description');
        const modalProductPrice = document.getElementById('modal-product-price');
        const modalAddToCart = document.getElementById('modal-add-to-cart');
        const sizeOptions = document.querySelectorAll('.size-option');
        const decreaseQty = document.getElementById('decrease-qty');
        const increaseQty = document.getElementById('increase-qty');
        const productQty = document.getElementById('product-qty');

        let currentProduct = null;

        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = productCard.getAttribute('data-product-id');
                const productName = productCard.getAttribute('data-product-name');
                const productPrice = parseFloat(productCard.getAttribute('data-product-price'));
                
                currentProduct = {
                    id: productId,
                    name: productName,
                    price: productPrice
                };
                
                // Update modal content
                modalProductName.textContent = productName;
                modalProductDescription.textContent = productCard.querySelector('p').textContent;
                modalProductPrice.textContent = `₹${productPrice}`;
                
                // Show modal
                productModal.classList.add('active');
            });
        });

        // Size selection
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        // Quantity controls
        decreaseQty.addEventListener('click', function() {
            if (parseInt(productQty.value) > 1) {
                productQty.value = parseInt(productQty.value) - 1;
            }
        });

        increaseQty.addEventListener('click', function() {
            productQty.value = parseInt(productQty.value) + 1;
        });

        // Add to cart from modal
        modalAddToCart.addEventListener('click', function() {
            if (currentProduct) {
                const selectedSize = document.querySelector('.size-option.selected').textContent;
                const quantity = parseInt(productQty.value);
                
                addToCart(currentProduct.id, currentProduct.name, currentProduct.price, quantity, selectedSize);
                
                // Close modal
                productModal.classList.remove('active');
                
                // Show notification
                cartNotification.classList.add('active');
                setTimeout(() => {
                    cartNotification.classList.remove('active');
                }, 3000);
            }
        });

        // Close modals
        closeProduct.addEventListener('click', function() {
            productModal.classList.remove('active');
        });

        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });

        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.add('active');
            updateCartDisplay();
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
            if (e.target === productModal) {
                productModal.classList.remove('active');
            }
        });

        function addToCart(id, name, price, quantity, size = 'M') {
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === id && item.size === size);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity,
                    size
                });
            }
            
            updateCartCount();
        }

        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            if (totalItems > 0) {
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
        }

        function updateCartDisplay() {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                cartTotal.textContent = '₹0.00';
                return;
            }
            
            emptyCartMessage.classList.add('hidden');
            
            let total = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'flex justify-between items-center py-4 border-b';
                cartItem.innerHTML = `
                    <div>
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-sm text-gray-600">Size: ${item.size} | Qty: ${item.quantity}</p>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-4">₹${itemTotal.toFixed(2)}</span>
                        <button class="text-red-500 remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = `₹${total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    updateCartDisplay();
                    updateCartCount();
                });
            });
        }

        // Three.js product preview (simplified version)
        function initThreeJS() {
            // This would be replaced with actual Three.js code for product visualization
            console.log("Three.js would initialize here for product previews");
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initThreeJS();
            updateCartCount();
        });
    