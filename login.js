document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function() {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        });
    }
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function() {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let isValid = true;
            if (!(/^[a-zA-Z0-9]{4,}$/.test(username))) {
                document.getElementById('usernameError').textContent = 'Username must be at least 4 alphanumeric characters';
                isValid = false;
            } else {
                document.getElementById('usernameError').textContent = '';
            }
            if (password.length < 8) {
                document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
                isValid = false;
            } else {
                document.getElementById('passwordError').textContent = '';
            }
            if (isValid) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify({username: user.username, email: user.email}));
                    alert('Login successful!');
                    window.location.href = 'my-notes.html';
                } else {
                    alert('Invalid username or password');
                }
            }
        });
    }
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('newUsername').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let isValid = true;
            if (!(/^[a-zA-Z0-9]{4,}$/.test(username))) {
                document.getElementById('newUsernameError').textContent = 'Username must be at least 4 alphanumeric characters';
                isValid = false;
            } else {
                document.getElementById('newUsernameError').textContent = '';
            }
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                document.getElementById('emailError').textContent = '';
            }
            if (password.length < 8) {
                document.getElementById('newPasswordError').textContent = 'Password must be at least 8 characters';
                isValid = false;
            } else {
                document.getElementById('newPasswordError').textContent = '';
            }
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                isValid = false;
            } else {
                document.getElementById('confirmPasswordError').textContent = '';
            }
            if (isValid) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                if (users.some(u => u.username === username)) {
                    document.getElementById('newUsernameError').textContent = 'Username already exists';
                    return;
                }
                if (users.some(u => u.email === email)) {
                    document.getElementById('emailError').textContent = 'Email already in use';
                    return;
                }
                users.push({username: username, email: email, password: password});
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify({username: username, email: email}));
                alert('Registration successful! You are now logged in.');
                window.location.href = 'my-notes.html';
            }
        });
    }
});