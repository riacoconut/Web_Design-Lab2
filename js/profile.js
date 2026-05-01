// Сторінка профілю: відображає дані поточного користувача
// та підраховує кількість будильників.

(function () {
    const user = Storage.getCurrentUser();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    function formatDate(iso) {
        if (!iso) return '—';
        const d = new Date(iso);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return dd + '.' + mm + '.' + yyyy;
    }

    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileGender').textContent = user.gender;
    document.getElementById('profileBirth').textContent = formatDate(user.birthDate);
    document.getElementById('profileRegistered').textContent = formatDate(user.registeredAt);

    const alarms = Storage.getAlarms() || [];
    document.getElementById('profileAlarms').textContent = alarms.length;
})();
