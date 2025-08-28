
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const authModal = document.getElementById('authModal');
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            const successMessage = document.getElementById('successMessage');
            const authButtons = document.getElementById('authButtons');
            const userSection = document.getElementById('userSection');
            const usernameDisplay = document.getElementById('usernameDisplay');
            const welcomeUsername = document.getElementById('welcomeUsername');
            
            // Buttons
            const showLoginBtn = document.getElementById('showLoginBtn');
            const showSignupBtn = document.getElementById('showSignupBtn');
            const switchToSignup = document.getElementById('switchToSignup');
            const switchToLogin = document.getElementById('switchToLogin');
            const loginBtn = document.getElementById('loginBtn');
            const signupBtn = document.getElementById('signupBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const closeModal = document.getElementById('closeModal');
            
            // Show modal when login/signup buttons are clicked
            showLoginBtn.addEventListener('click', function() {
                showModal();
                showLoginForm();
            });
            
            showSignupBtn.addEventListener('click', function() {
                showModal();
                showSignupForm();
            });
            
            // Close modal when clicking outside
            authModal.addEventListener('click', function(e) {
                if (e.target === authModal) {
                    hideModal();
                }
            });
            
            // Close modal when clicking close button
            closeModal.addEventListener('click', hideModal);
            
            // Check if user is already logged in
            checkLoginStatus();
            
            // Switch to Signup Form
            switchToSignup.addEventListener('click', showSignupForm);
            
            // Switch to Login Form
            switchToLogin.addEventListener('click', showLoginForm);
            
            // Signup Button Click
            signupBtn.addEventListener('click', handleSignup);
            
            // Login Button Click
            loginBtn.addEventListener('click', handleLogin);
            
            // Logout Button Click
            logoutBtn.addEventListener('click', handleLogout);
            
            function showModal() {
                authModal.classList.remove('hidden');
                authModal.classList.add('flex');
            }
            
            function hideModal() {
                authModal.classList.add('hidden');
                authModal.classList.remove('flex');
            }
            
            function showSignupForm() {
                loginForm.classList.add('hidden');
                signupForm.classList.remove('hidden');
                successMessage.classList.add('hidden');
                signupForm.classList.add('slide-in');
            }
            
            function showLoginForm() {
                signupForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                successMessage.classList.add('hidden');
                loginForm.classList.add('slide-in');
            }
            
            function showSuccessMessage(username) {
                loginForm.classList.add('hidden');
                signupForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                welcomeUsername.textContent = username;
            }
            
            function handleSignup() {
                const name = document.getElementById('signupName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                // Reset errors
                document.getElementById('signupNameError').classList.add('hidden');
                document.getElementById('signupEmailError').classList.add('hidden');
                document.getElementById('signupPasswordError').classList.add('hidden');
                document.getElementById('confirmPasswordError').classList.add('hidden');
                
                let isValid = true;
                
                // Validation
                if (!name) {
                    document.getElementById('signupNameError').classList.remove('hidden');
                    isValid = false;
                }
                
                if (!validateEmail(email)) {
                    document.getElementById('signupEmailError').classList.remove('hidden');
                    isValid = false;
                }
                
                if (password.length < 6) {
                    document.getElementById('signupPasswordError').classList.remove('hidden');
                    isValid = false;
                }
                
                if (password !== confirmPassword) {
                    document.getElementById('confirmPasswordError').classList.remove('hidden');
                    isValid = false;
                }
                
                if (!document.getElementById('termsAgree').checked) {
                    alert('Please agree to the Terms and Conditions');
                    isValid = false;
                }
                
                if (isValid) {
                    // Save user data to local storage
                    const userData = {
                        name: name,
                        email: email,
                        password: password
                    };
                    
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    // Show success message and switch to login
                    alert('Signup successful! Please login with your credentials.');
                    showLoginForm();
                    
                    // Clear form
                    document.getElementById('signupName').value = '';
                    document.getElementById('signupEmail').value = '';
                    document.getElementById('signupPassword').value = '';
                    document.getElementById('confirmPassword').value = '';
                    document.getElementById('termsAgree').checked = false;
                }
            }
            
            function handleLogin() {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Reset errors
                document.getElementById('loginEmailError').classList.add('hidden');
                document.getElementById('loginPasswordError').classList.add('hidden');
                
                let isValid = true;
                
                // Validation
                if (!validateEmail(email)) {
                    document.getElementById('loginEmailError').classList.remove('hidden');
                    isValid = false;
                }
                
                if (!password) {
                    document.getElementById('loginPasswordError').classList.remove('hidden');
                    isValid = false;
                }
                
                if (isValid) {
                    // Check if user data exists in local storage
                    const storedUserData = localStorage.getItem('userData');
                    
                    if (storedUserData) {
                        const userData = JSON.parse(storedUserData);
                        
                        if (userData.email === email && userData.password === password) {
                            // Login successful
                            const loginData = {
                                isLoggedIn: true,
                                username: userData.name,
                                email: userData.email
                            };
                            
                            localStorage.setItem('loginStatus', JSON.stringify(loginData));
                            
                            updateUIOnLogin(userData.name);
                            showSuccessMessage(userData.name);
                            
                            // Auto close modal after 2 seconds
                            setTimeout(hideModal, 2000);
                        } else {
                            document.getElementById('loginPasswordError').classList.remove('hidden');
                        }
                    } else {
                        alert('No user found. Please sign up first.');
                        showSignupForm();
                    }
                }
            }
            
            function handleLogout() {
                localStorage.removeItem('loginStatus');
                checkLoginStatus();
                showLoginForm();
                
                // Clear login form
                document.getElementById('loginEmail').value = '';
                document.getElementById('loginPassword').value = '';
            }
            
            function checkLoginStatus() {
                const loginStatus = localStorage.getItem('loginStatus');
                
                if (loginStatus) {
                    const loginData = JSON.parse(loginStatus);
                    
                    if (loginData.isLoggedIn) {
                        updateUIOnLogin(loginData.username);
                    } else {
                        showLoginForm();
                    }
                } else {
                    showLoginForm();
                }
            }
            
            function updateUIOnLogin(username) {
                authButtons.classList.add('hidden');
                userSection.classList.remove('hidden');
                usernameDisplay.textContent = username;
            }
            
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
        });
    