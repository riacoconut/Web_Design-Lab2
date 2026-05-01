// Невеличкий скрипт навігації: показує/ховає пункти меню
// залежно від того, чи увійшов користувач у систему.

(function () {
    const user = Storage.getCurrentUser();
    const loginLink = document.getElementById('navLogin');
    const profileLink = document.getElementById('navProfile');
    const logoutLink = document.getElementById('navLogout');

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
        if (logoutLink) {
            logoutLink.style.display = 'block';
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault();
                Storage.clearSession();
                window.location.href = 'login.html';
            });
        }
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
    }
})();
