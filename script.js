// script.js
document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    // eventForm が存在する場合のみ処理を実行 (test.html 専用のスクリプトのため)
    if (eventForm) {
        const eventNameInput = document.getElementById('eventName');
        const eventDateInput = document.getElementById('eventDate');
        const eventUrlInput = document.getElementById('eventUrl');
        const eventDetailsInput = document.getElementById('eventDetails');

        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

            const newEvent = {
                id: Date.now().toString() + Math.random().toString(36).substring(2, 7), // より一意性の高いIDを生成
                name: eventNameInput.value,
                date: eventDateInput.value,
                url: eventUrlInput.value,
                details: eventDetailsInput.value
            };

            storedEvents.push(newEvent);
            localStorage.setItem('events', JSON.stringify(storedEvents));

            clearForm(eventNameInput, eventDateInput, eventUrlInput, eventDetailsInput);
            alert('予定が登録されました！');
        });

        function clearForm(nameInput, dateInput, urlInput, detailsInput) {
            nameInput.value = '';
            dateInput.value = '';
            urlInput.value = '';
            detailsInput.value = '';
        }
    }
});