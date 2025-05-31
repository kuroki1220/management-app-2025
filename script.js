// script.js
document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    // eventForm が存在する場合のみ処理を実行 (test.html 専用のスクリプトのため)
    if (eventForm) {
        const eventNameInput = document.getElementById('eventName');
        const eventDateInput = document.getElementById('eventDate');
        const eventUrlInput = document.getElementById('eventUrl');
        const eventDetailsInput = document.getElementById('eventDetails');
        const tagButtonsContainer = document.getElementById('tagButtons'); // タグボタンコンテナを取得

        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

            // 現在選択されているタグからtypeを決定
            // 複数のタグがクリックされた場合、最後のタグのtypeを優先するか、詳細内容から推測するかは要件次第ですが、
            // 今回は特定のタグが押されたらそれに対応するtypeを設定する簡単なロジックを想定します。
            // 詳細は「詳細」テキストエリアの内容から判断されるため、ここではシンプルに初期値を 'other' とします。
            // calendar.htmlで利用する'type'は、面接(interview), 説明会(briefing), 締切(deadline), その他(other)
            let eventType = 'other';
            // タグボタンが押されたときに、そのタグのdata-event-typeを取得して利用するロジックを別途追加するか、
            // またはdetailsの内容を解析してtypeを決定します。
            // 今回は、登録時にtypeを明示的に選択するUIがないため、detailsの内容から簡易的に判断します。
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
                time: '', // calendar.htmlの編集モーダルのためにtimeプロパティを追加
                url: eventUrlInput.value,
                details: eventDetailsInput.value,
                type: eventType // イベントの種類を追加
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