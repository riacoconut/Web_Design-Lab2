// Точка входу робочої сторінки: створюємо Model, View та Controller.

document.addEventListener('DOMContentLoaded', function () {
    const model = new AlarmModel();
    const view = new AlarmView();
    new AlarmController(model, view);
});
