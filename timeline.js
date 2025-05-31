// timeline.js
document.addEventListener('DOMContentLoaded', () => {
    const timelineDiv = document.getElementById('timeline');
    const noTimelineEventsMessage = document.getElementById('noTimelineEventsMessage');

    function renderTimeline() {
        timelineDiv.innerHTML = ''; // 既存の内容をクリア

        // localStorageから直接イベントデータをロード
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

        if (storedEvents.length === 0) {
            noTimelineEventsMessage.style.display = 'block'; // メッセージを表示
            return;
        } else {
            noTimelineEventsMessage.style.display = 'none'; // メッセージを非表示
        }

        const sortedEvents = [...storedEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

        const timelineList = document.createElement('ul');
        // timelineList.style.listStyle = 'none'; // スタイルはCSSに移動
        // timelineList.style.paddingLeft = '0'; // スタイルはCSSに移動

        sortedEvents.forEach(event => {
            const item = document.createElement('li');
            // item.style.marginBottom = '20px'; // スタイルはCSSに移動
            // item.style.borderLeft = '4px solid #007bff'; // スタイルはCSSに移動
            // item.style.paddingLeft = '10px'; // スタイルはCSSに移動

            const date = document.createElement('div');
            date.classList.add('date'); // クラスを追加
            // date.style.fontWeight = 'bold'; // スタイルはCSSに移動
            date.textContent = event.date;

            const name = document.createElement('div');
            name.classList.add('name'); // クラスを追加
            name.textContent = `会社/イベント名: ${event.name}`;

            const details = document.createElement('div');
            details.classList.add('details'); // クラスを追加
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
                const urlDiv = document.createElement('div');
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

    renderTimeline(); // タイムラインを初期表示
});