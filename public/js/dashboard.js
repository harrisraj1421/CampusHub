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
    }

    // Update Profile Name
    const userNameDisplay = document.getElementById('userNameDisplay');
    const welcomeText = document.getElementById('welcomeText');
    if (userNameDisplay) userNameDisplay.innerText = name || 'User';
    if (welcomeText) welcomeText.innerText = `Welcome Back, ${name || 'Student'}!`;

    // Display current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        dateElement.innerText = new Date().toLocaleDateString('en-US', options);
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = '../login.html';
        });
    }

    // Chat Functionality
    const chatInput = document.getElementById('chatInput');
    const chatBtn = document.getElementById('chatBtn');
    const chatBox = document.getElementById('aiChatBox');

    async function sendChat() {
        const query = chatInput.value.trim();
        if (!query) return;

        // User message
        const userMsg = document.createElement('div');
        userMsg.style = "background: var(--bg-color); padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; font-size: 0.875rem; align-self: flex-end; border: 1px solid var(--border-light);";
        userMsg.innerHTML = `<p style="font-weight: 600; color: var(--primary); font-size: 0.7rem; margin-bottom: 2px;">YOU</p>${query}`;
        chatBox.appendChild(userMsg);
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ query })
            });
            const data = await res.json();

            // AI message
            const aiMsg = document.createElement('div');
            aiMsg.style = "background: var(--glass-accent); padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; font-size: 0.875rem; border: 1px solid var(--primary);";
            aiMsg.innerHTML = `<p style="font-weight: 600; color: var(--primary); font-size: 0.7rem; margin-bottom: 2px;">AI ASSISTANT</p>${data.response || "I'm sorry, I couldn't process that. Please try again."}`;
            chatBox.appendChild(aiMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (err) {
            console.error(err);
        }
    }

    if (chatBtn) chatBtn.addEventListener('click', sendChat);
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChat(); });

    // Fetch Stats
    async function fetchStats() {
        try {
            const projRes = await fetch('/api/projects/me', { headers: { 'x-auth-token': token } });
            const projects = await projRes.json();
            const statProjects = document.getElementById('statProjects');
            if (statProjects) statProjects.innerText = projects.length < 10 ? `0${projects.length}` : projects.length;

            const orderRes = await fetch('/api/canteen/my-orders', { headers: { 'x-auth-token': token } });
            const orders = await orderRes.json();
            const ordersList = document.getElementById('recentOrders');
            if (ordersList && orders.length > 0) {
                ordersList.innerHTML = orders.slice(0, 2).map(o => `
                    <div style="padding: 1rem; border: 1px solid var(--border-light); border-radius: 8px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="font-weight: 600; font-size: 0.9rem;">${o.items[0].name}</p>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">${new Date(o.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <span style="font-size: 0.75rem; padding: 4px 8px; background: var(--glass-accent); color: var(--primary); border-radius: 4px; text-transform: uppercase; font-weight: 700;">${o.status}</span>
                    </div>
                `).join('');
            } else if (ordersList) {
                ordersList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">No recent orders found.</p>';
            }
        } catch (err) { console.error('Stats error:', err); }
    }

    if (currentPath.includes('dashboard.html')) fetchStats();
});

