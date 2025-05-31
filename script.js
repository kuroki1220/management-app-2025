// script.js (test.html が読み込むファイル)
document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const eventDetailsInput = document.getElementById('eventDetails');
    const eventListDiv = document.getElementById('eventList');

    // 既存の予定を保持する配列 (localStorageから読み込む)
    // 初回は空の配列、またはlocalStorageからJSONパースした配列
    // 新しい予定が追加されるごとにここに保存される
    let events = JSON.parse(localStorage.getItem('jobHuntEvents')) || [];
    // 次のイベントIDを生成するためのカウンター
    // 既存のイベントIDの最大値 + 1 を初期値とする
    let nextEventId = events.length > 0 ? Math.max(...events.map(e => e.id || 0)) + 1 : 1;


    // フォームが送信されたときの処理
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault(); // フォームのデフォルト送信をキャンセル

        const eventName = eventNameInput.value.trim();
        const eventDate = eventDateInput.value;
        const eventDetails = eventDetailsInput.value.trim();

        if (eventName && eventDate) {
            const newEvent = {
                id: nextEventId++, // ユニークなIDを付与
                name: eventName,
                date: eventDate,
                details: eventDetails,
                time: '', // test.htmlには時間入力がないため、空で初期化
                type: 'other' // test.htmlには種類入力がないため、'other'で初期化
            };

            events.push(newEvent); // 新しい予定を配列に追加

            // localStorageに保存
            localStorage.setItem('jobHuntEvents', JSON.stringify(events));

            clearForm(); // フォームをクリア
            
            // 登録後にカレンダーページへリダイレクト
            window.location.href = 'calendar.html'; // calendar.htmlへのパス
        } else {
            alert('会社名/イベント名と日付は必須です。');
        }
    });

    // 予定リストを表示する関数 (test.html内の「登録された予定」リスト用)
    function renderEvents() {
        eventListDiv.innerHTML = ''; // まず既存のリストをクリア

        if (events.length === 0) {
            eventListDiv.innerHTML = '<p>まだ予定は登録されていません。</p>';
            return;
        }

        // 日付順にソート (時系列順)
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        events.forEach((event) => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item'); // スタイルを適用するためのクラス
            // eventItem.dataset.eventId = event.id; // このページでは編集しないため不要だが、念のため付与

            const eventNameEl = document.createElement('h3');
            eventNameEl.textContent = event.name;

            const eventDateEl = document.createElement('p');
            eventDateEl.textContent = `日付: ${event.date}`;

            const eventDetailsEl = document.createElement('p');
            eventDetailsEl.textContent = `詳細: ${event.details || 'なし'}`; // 詳細がなければ「なし」と表示

            eventItem.appendChild(eventNameEl);
            eventItem.appendChild(eventDateEl);
            eventItem.appendChild(eventDetailsEl);
            
            // 削除ボタンの追加 (test.html側でも削除できるように)
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '削除';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.style.backgroundColor = '#dc3545';
            deleteBtn.addEventListener('click', () => {
                if (confirm('この予定を削除しますか？')) {
                    // 削除対象のID以外のイベントで配列を再構築
                    events = events.filter(e => e.id !== event.id);
                    localStorage.setItem('jobHuntEvents', JSON.stringify(events)); // localStorageを更新
                    renderEvents(); // リストを再描画
                }
            });
            eventItem.appendChild(deleteBtn);

            eventListDiv.appendChild(eventItem);
        });
    }

    // フォームをクリアする関数
    function clearForm() {
        eventNameInput.value = '';
        eventDateInput.value = '';
        eventDetailsInput.value = '';
    }

    // ページ読み込み時に一度予定をレンダリング (test.htmlのリスト表示用)
    renderEvents();
});