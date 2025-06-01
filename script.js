// script.js
document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    // eventForm が存在する場合のみ処理を実行 (test.html 専用のスクリプトのため)
    if (eventForm) {
        const eventNameInput = document.getElementById('eventName');
        const eventDateInput = document.getElementById('eventDate');
        const startTimeInput = document.getElementById('startTime'); // 追加
        const endTimeInput = document.getElementById('endTime');     // 追加
        const eventUrlInput = document.getElementById('eventUrl');
        const eventDetailsInput = document.getElementById('eventDetails');
        const tagButtonsContainer = document.getElementById('tagButtons'); // タグボタンコンテナを取得

        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

            // 現在選択されているタグからtypeを決定
            let eventType = 'other';
            if (eventDetailsInput.value.includes('[面接]')) {
                eventType = 'interview';
            } else if (eventDetailsInput.value.includes('[企業説明会]')) {
                eventType = 'briefing';
            } else if (eventDetailsInput.value.includes('[Web試験]')) { // 例えばWeb試験を締切とする
                eventType = 'deadline';
            }
            // その他のタグはすべて 'other' に分類

            const newEvent = {
                // IDは文字列で統一。calendar.htmlとevents.htmlもこれで対応できる
                id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
                name: eventNameInput.value,
                date: eventDateInput.value,
                startTime: startTimeInput.value, // 追加: 開始時間
                endTime: endTimeInput.value,     // 追加: 終了時間
                url: eventUrlInput.value,
                details: eventDetailsInput.value,
                type: eventType // イベントの種類を追加
            };

            storedEvents.push(newEvent);
            localStorage.setItem('events', JSON.stringify(storedEvents));

            clearForm(eventNameInput, eventDateInput, startTimeInput, endTimeInput, eventUrlInput, eventDetailsInput);
            alert('予定が登録されました！');
        });

        // clearForm 関数に新しい引数を追加
        function clearForm(nameInput, dateInput, startTimeInput, endTimeInput, urlInput, detailsInput) {
            nameInput.value = '';
            dateInput.value = '';
            startTimeInput.value = ''; // クリア
            endTimeInput.value = '';     // クリア
            urlInput.value = '';
            detailsInput.value = '';
        }
    }
});