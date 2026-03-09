document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');

    // Check if user is logged in
    if (!token) {
        window.location.href = '../login.html';
        return;
    }

    // Role-based protection
    const currentPath = window.location.pathname;
    if (currentPath.includes('/student/') && role !== 'student') {
        window.location.href = '../../index.html';
        return;
    } else if (currentPath.includes('/admin/') && role !== 'admin') {
        window.location.href = '../../index.html';
        return;
    }

    // Update UI
    const welcomeText = document.getElementById('welcomeText');
    if (welcomeText) {
        welcomeText.innerText = `Welcome Back, ${name}!`;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = '../login.html';
        });
    }

    // Display current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        dateElement.innerText = new Date().toLocaleDateString('en-US', options);
    }

    // Fetch Live Dashboard Stats
    async function fetchStats() {
        try {
            // Payments
            const payRes = await fetch('/api/payments/history', { headers: { 'x-auth-token': token } });
            const payments = await payRes.json();
            const totalDuesElem = document.querySelector('.stat-card .value.neon-text');
            if (totalDuesElem) {
                // Mock balance or sum of certain types
                totalDuesElem.innerText = `₹ ${payments.length * 150}`; // Simulated dues logic
            }

            // Projects
            const projectRes = await fetch('/api/projects/me', { headers: { 'x-auth-token': token } });
            const projects = await projectRes.json();
            const projectCountElem = document.querySelector('.stat-card:nth-child(3) .value');
            if (projectCountElem) {
                projectCountElem.innerText = projects.length < 10 ? `0${projects.length}` : projects.length;
            }

            // Orders
            const orderRes = await fetch('/api/canteen/my-orders', { headers: { 'x-auth-token': token } });
            const orders = await orderRes.json();
            const recentOrdersList = document.getElementById('recentOrders');
            if (recentOrdersList && orders.length > 0) {
                recentOrdersList.innerHTML = '';
                orders.slice(0, 3).forEach(order => {
                    recentOrdersList.innerHTML += `
                        <li class="item">
                            <div>
                                <h4 style="font-size: 0.95rem;">${order.items[0].name} ${order.items.length > 1 ? `+${order.items.length - 1} more` : ''}</h4>
                                <p style="font-size: 0.8rem; color: var(--text-muted);">Pickup: ${new Date(order.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Status: <span style="color:${order.status === 'ready' ? 'var(--success)' : 'var(--warning)'};">${order.status.toUpperCase()}</span></p>
                            </div>
                            <button class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="alert('QR Code: ${order.qrCode}')">View QR</button>
                        </li>
                    `;
                });
            }
        } catch (err) { console.error('Error fetching dashboard stats:', err); }
    }

    if (currentPath.includes('dashboard.html')) fetchStats();
});
