// CONTROLLER: зв'язує Model і View.
// Слухає події View, змінює дані в Model і просить View оновитись.

class AlarmController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // коли модель змінюється — перемальовуємо
        this.model.onChange = (alarms) => this.view.renderAlarms(alarms);

        // прив'язуємо обробники подій з View
        this.view.bindAdd(() => this.handleAdd());
        this.view.bindToggle((id) => this.model.toggle(id));
        this.view.bindDelete((id) => this.model.remove(id));

        // початкове відмалювання
        this.view.renderAlarms(this.model.getAll());

        // годинник + перевірка спрацьовування будильників
        this.tick();
        setInterval(() => this.tick(), 1000);

        // на початку нового дня скидаємо позначки спрацювання
        this.lastDay = new Date().getDate();
    }

    handleAdd() {
        const values = this.view.getInputValues();
        if (!values.time) {
            this.view.showError('Будь ласка, вкажіть час');
            return;
        }
        this.model.add(values.time, values.label);
        this.view.clearInputs();
    }

    tick() {
        const now = new Date();
        this.view.renderClock(now);

        // якщо настав новий день — скинути triggered
        if (now.getDate() !== this.lastDay) {
            this.lastDay = now.getDate();
            this.model.resetTriggers();
        }

        // перевіряємо спрацьовування лише на 0-й секунді кожної хвилини
        if (now.getSeconds() !== 0) return;

        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const currentTime = hh + ':' + mm;

        this.model.getAll().forEach((alarm) => {
            if (alarm.active && !alarm.triggered && alarm.time === currentTime) {
                this.model.markTriggered(alarm.id);
                this.view.showAlarmTrigger(alarm);
            }
        });
    }
}
