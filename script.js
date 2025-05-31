document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const eventDetailsInput = document.getElementById('eventDetails');
    const eventListDiv = document.getElementById('eventList');

    // 既存の予定を保持する配列 (今回は簡易的にメモリ上に保持)
    let events = [];

    // フォームが送信されたときの処理
    eventForm.addEventListener('submit', (event) => {
        event.preventDefault(); // フォームのデフォルト送信をキャンセル

        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;
        const eventDetails = eventDetailsInput.value;

        if (eventName && eventDate) {
            const newEvent = {
                name: eventName,
                date: eventDate,
                details: eventDetails
            };

            events.push(newEvent); // 新しい予定を配列に追加
            renderEvents(); // 予定リストを再描画
            clearForm(); // フォームをクリア
        } else {
            alert('会社名/イベント名と日付は必須です。');
        }
    });

    // 予定リストを表示する関数
    function renderEvents() {
        // まず既存のリストをクリア
        eventListDiv.innerHTML = '';

        if (events.length === 0) {
            eventListDiv.innerHTML = '<p>まだ予定は登録されていません。</p>';
            return;
        }

        // 日付順にソート (時系列順)
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        events.forEach((event, index) => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item'); // スタイルを適用するためのクラス

            const eventNameEl = document.createElement('h3');
            eventNameEl.textContent = event.name;

            const eventDateEl = document.createElement('p');
            eventDateEl.textContent = `日付: ${event.date}`;

            const eventDetailsEl = document.createElement('p');
            eventDetailsEl.textContent = `詳細: ${event.details || 'なし'}`; // 詳細がなければ「なし」と表示

            eventItem.appendChild(eventNameEl);
            eventItem.appendChild(eventDateEl);
            eventItem.appendChild(eventDetailsEl);

            eventListDiv.appendChild(eventItem);
        });
    }

    // フォームをクリアする関数
    function clearForm() {
        eventNameInput.value = '';
        eventDateInput.value = '';
        eventDetailsInput.value = '';
    }

    // ページ読み込み時に一度予定をレンダリング (最初は空なので「まだ予定は登録されていません」が表示される)
    renderEvents();
});