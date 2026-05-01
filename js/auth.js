// Логіка сторінки входу та реєстрації.

function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const msg = document.getElementById('loginMsg');

    const user = Storage.findUserByEmail(email);
    if (!user || user.password !== password) {
        msg.className = 'alert alert-danger';
        msg.textContent = 'Невірний email або пароль';
        msg.style.display = 'block';
        return;
    }

    Storage.setSession(email);
    window.location.href = 'profile.html';
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const gender = document.getElementById('regGender').value;
    const birthDate = document.getElementById('regBirth').value;
    const password = document.getElementById('regPassword').value;
    const msg = document.getElementById('registerMsg');

    if (!name || !email || !gender || !birthDate || !password) {
        msg.className = 'alert alert-danger';
        msg.textContent = 'Заповніть, будь ласка, всі поля';
        msg.style.display = 'block';
        return;
    }

    if (password.length < 8) {
        msg.className = 'alert alert-danger';
        msg.textContent = 'Пароль повинен містити мінімум 8 символів';
        msg.style.display = 'block';
        return;
    }

    if (Storage.findUserByEmail(email)) {
        msg.className = 'alert alert-danger';
        msg.textContent = 'Користувач з таким email вже існує';
        msg.style.display = 'block';
        return;
    }

    const newUser = {
        name: name,
        email: email,
        gender: gender,
        birthDate: birthDate,
        password: password,
        registeredAt: new Date().toISOString()
    };

    Storage.addUser(newUser);
    Storage.setSession(email);
    window.location.href = 'profile.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
});
