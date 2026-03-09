document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('name', data.name);

                    // Redirect based on role
                    redirectUser(data.role);
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (err) {
                console.error('Login error:', err);
                alert('An error occurred during login');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('name', data.name);

                    redirectUser(data.role);
                } else {
                    alert(data.message || 'Signup failed');
                }
            } catch (err) {
                console.error('Signup error:', err);
                alert('An error occurred during signup');
            }
        });
    }
});

function redirectUser(role) {
    switch (role) {
        case 'student':
            window.location.href = 'student/dashboard.html';
            break;
        case 'admin':
            window.location.href = 'admin/dashboard.html';
            break;
        case 'faculty':
            window.location.href = 'faculty/dashboard.html';
            break;
        case 'library':
            window.location.href = 'library/dashboard.html';
            break;
        case 'canteen':
            window.location.href = 'canteen/dashboard.html';
            break;
        default:
            window.location.href = '../index.html';
    }
}
