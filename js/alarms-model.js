// MODEL: відповідає за зберігання та зміну даних будильників.
// Нічого не знає про інтерфейс.

class AlarmModel {
    constructor() {
        const saved = Storage.getAlarms();
        if (saved) {
            this.alarms = saved;
        } else {
            this.alarms = [
                { id: 1, time: '07:00', label: 'Прокидатись', active: true, triggered: false },
                { id: 2, time: '09:00', label: 'Ранкова зустріч', active: true, triggered: false },
                { id: 3, time: '22:00', label: 'Час спати', active: false, triggered: false }
            ];
            this._save();
        }
        this.nextId = this.alarms.reduce(function (max, a) {
            return a.id > max ? a.id : max;
        }, 0) + 1;

        this.onChange = null;
    }

    _save() {
        Storage.saveAlarms(this.alarms);
    }

    _notify() {
        if (typeof this.onChange === 'function') {
            this.onChange(this.alarms);
        }
    }

    getAll() {
        return this.alarms.slice();
    }

    add(time, label) {
        const alarm = {
            id: this.nextId++,
            time: time,
            label: label || 'Будильник',
            active: true,
            triggered: false
        };
        this.alarms.push(alarm);
        this._save();
        this._notify();
    }

    remove(id) {
        this.alarms = this.alarms.filter(function (a) {
            return a.id !== id;
        });
        this._save();
        this._notify();
    }

    toggle(id) {
        const alarm = this.alarms.find(function (a) {
            return a.id === id;
        });
        if (alarm) {
            alarm.active = !alarm.active;
            alarm.triggered = false;
            this._save();
            this._notify();
        }
    }

    markTriggered(id) {
        const alarm = this.alarms.find(function (a) {
            return a.id === id;
        });
        if (alarm) {
            alarm.triggered = true;
            this._save();
        }
    }

    resetTriggers() {
        this.alarms.forEach(function (a) {
            a.triggered = false;
        });
        this._save();
    }
}
