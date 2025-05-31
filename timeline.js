// timeline.js
document.addEventListener('DOMContentLoaded', () => {
    const timelineDiv = document.getElementById('timeline');
    const noTimelineEventsMessage = document.getElementById('noTimelineEventsMessage');

    function renderTimeline() {
        timelineDiv.innerHTML = ''; // 既存の内容をクリア

        // localStorageから直接イベントデータをロード
        const storedEvents = JSON.parse(localStorage.getItem('events')) || []; // キーを 'events' に統一

        if (storedEvents.length === 0) {
            noTimelineEventsMessage.style.display = 'block'; // メッセージを表示
            return;
        } else {
            noTimelineEventsMessage.style.display = 'none'; // メッセージを非表示
        }

        // イベントを日付と時間でソート
        const sortedEvents = [...storedEvents].sort((a, b) => {
            const dateA = new Date(a.date + (a.time ? 'T' + a.time : ''));
            const dateB = new Date(b.date + (b.time ? 'T' + b.time : ''));
            return dateA - dateB;
        });

        const timelineList = document.createElement('ul');

        sortedEvents.forEach(event => {
            const item = document.createElement('li');

            const date = document.createElement('div');
            date.classList.add('date');
            date.textContent = event.date + (event.time ? ` ${event.time}` : ''); // 時間も表示

            const name = document.createElement('div');
            name.classList.add('name');
            name.textContent = `会社/イベント名: ${event.name}`;

            const details = document.createElement('div');
            details.classList.add('details');
            details.textContent = `詳細: ${event.details || 'なし'}`;

            if (event.url) {
                const urlLink = document.createElement('a');
                let formattedUrl = event.url;
                if (!/^https?:\/\//i.test(formattedUrl)) {
                    formattedUrl = 'http://' + formattedUrl; 
                }
                urlLink.href = formattedUrl;
                urlLink.textContent = '企業ホームページへアクセス'; 
                urlLink.target = '_blank';
                urlLink.rel = 'noopener noreferrer';
                const urlDiv = document.createElement('div'); // URL表示用のdivを追加
                urlDiv.appendChild(urlLink);
                item.appendChild(urlDiv);
            }
            
            item.appendChild(date);
            item.appendChild(name);
            item.appendChild(details);
            timelineList.appendChild(item);
        });
        timelineDiv.appendChild(timelineList);
    }

    // 初期表示
    renderTimeline();
});