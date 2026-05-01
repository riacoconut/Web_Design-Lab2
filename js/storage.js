// Простий модуль для роботи з localStorage:
// зберігає список користувачів та поточну сесію.

const Storage = {
    USERS_KEY: 'alarmx_users',
    SESSION_KEY: 'alarmx_session',
    ALARMS_KEY: 'alarmx_alarms',

    getUsers() {
        const data = localStorage.getItem(this.USERS_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    },

    findUserByEmail(email) {
        return this.getUsers().find(function (u) {
            return u.email === email;
        });
    },

    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        this.saveUsers(users);
    },

    setSession(email) {
        localStorage.setItem(this.SESSION_KEY, email);
    },

    getSession() {
        return localStorage.getItem(this.SESSION_KEY);
    },

    clearSession() {
        localStorage.removeItem(this.SESSION_KEY);
    },

    getCurrentUser() {
        const email = this.getSession();
        if (!email) return null;
        return this.findUserByEmail(email);
    },

    getAlarms() {
        const data = localStorage.getItem(this.ALARMS_KEY);
        return data ? JSON.parse(data) : null;
    },

    saveAlarms(alarms) {
        localStorage.setItem(this.ALARMS_KEY, JSON.stringify(alarms));
    }
};
