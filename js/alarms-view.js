// VIEW: відповідає тільки за відображення (DOM).
// Не знає про дані — отримує їх ззовні.

class AlarmView {
    constructor() {
        this.listEl = document.getElementById('alarmList');
        this.timeInput = document.getElementById('inputTime');
        this.labelInput = document.getElementById('inputLabel');
        this.addBtn = document.getElementById('addBtn');
        this.clockEl = document.getElementById('clock');
        this.dateEl = document.getElementById('clock-date');

        this.days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа',
            'Четвер', 'П\'ятниця', 'Субота'];
        this.months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
            'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    }

    renderClock(now) {
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        this.clockEl.textContent = h + ':' + m + ':' + s;
        this.dateEl.textContent = this.days[now.getDay()] + ', ' +
            now.getDate() + ' ' + this.months[now.getMonth()] + ' ' + now.getFullYear();
    }

    renderAlarms(alarms) {
        if (alarms.length === 0) {
            this.listEl.innerHTML = '<p class="text-muted text-center">Будильників ще немає</p>';
            return;
        }

        let html = '';
        alarms.forEach(function (alarm) {
            const inactiveClass = alarm.active ? '' : ' inactive';
            const checked = alarm.active ? 'checked' : '';
            html += '<div class="card alarm-item p-3 mb-2' + inactiveClass + '">' +
                '<div class="d-flex justify-content-between align-items-center flex-wrap gap-2">' +
                    '<div>' +
                        '<span class="alarm-time">' + alarm.time + '</span>' +
                        '<span class="text-muted ms-3">' + alarm.label + '</span>' +
                    '</div>' +
                    '<div class="d-flex gap-2 align-items-center">' +
                        '<div class="form-check form-switch mb-0">' +
                            '<input class="form-check-input toggle-alarm" type="checkbox" ' +
                                checked + ' data-id="' + alarm.id + '">' +
                        '</div>' +
                        '<button class="btn btn-outline-danger btn-sm delete-alarm" ' +
                            'data-id="' + alarm.id + '">Видалити</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });
        this.listEl.innerHTML = html;
    }

    getInputValues() {
        return {
            time: this.timeInput.value,
            label: this.labelInput.value.trim()
        };
    }

    clearInputs() {
        this.timeInput.value = '';
        this.labelInput.value = '';
    }

    showError(msg) {
        alert(msg);
    }

    showAlarmTrigger(alarm) {
        alert('⏰ Будильник: ' + alarm.time + ' — ' + alarm.label);
    }

    bindAdd(handler) {
        this.addBtn.addEventListener('click', handler);
    }

    bindToggle(handler) {
        this.listEl.addEventListener('change', function (e) {
            if (e.target.classList.contains('toggle-alarm')) {
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                handler(id);
            }
        });
    }

    bindDelete(handler) {
        this.listEl.addEventListener('click', function (e) {
            if (e.target.classList.contains('delete-alarm')) {
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                handler(id);
            }
        });
    }
}
