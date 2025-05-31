document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const eventUrlInput = document.getElementById('eventUrl');
    const eventDetailsInput = document.getElementById('eventDetails');
    const eventListDiv = document.getElementById('eventList');

    let events = [];

    function loadEvents() {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            events = JSON.parse(storedEvents);
        }
    }

    // localStorageにデータの保存
    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(events));
    }

    eventForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;
        const eventUrl = eventUrlInput.value;
        const eventDetails = eventDetailsInput.value;

        if (eventName && eventDate) {
            const newEvent = {
                name: eventName,
                date: eventDate,
                url: eventUrl,
                details: eventDetails
            };

            events.push(newEvent);
            saveEvents(); // データを保存
            renderEvents();
            clearForm();
        } else {
            alert('会社名/イベント名と日付は必須です。');
        }
    });

    function renderEvents() {
        eventListDiv.innerHTML = '';

        if (events.length === 0) {
            eventListDiv.innerHTML = '<p>まだ予定は登録されていません。</p>';
            return;
        }

        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        events.forEach((event, index) => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');

            const eventNameEl = document.createElement('h3');
            eventNameEl.textContent = event.name;

            const eventDateEl = document.createElement('p');
            eventDateEl.textContent = `日付: ${event.date}`;

            const eventDetailsEl = document.createElement('p');
            eventDetailsEl.textContent = `詳細: ${event.details || 'なし'}`;

            eventItem.appendChild(eventNameEl);
            eventItem.appendChild(eventDateEl);

            if (event.url) {
                const eventUrlEl = document.createElement('p');
                const urlLink = document.createElement('a');
                // URLの形式をチェックし、http://またはhttps://が付いていなければ追加
                let formattedUrl = event.url;
                if (!/^https?:\/\//i.test(formattedUrl)) {
                    formattedUrl = 'http://' + formattedUrl; 
                }
                urlLink.href = formattedUrl;
                urlLink.textContent = '企業ホームページへアクセス'; 
                urlLink.target = '_blank';
                urlLink.rel = 'noopener noreferrer';
                eventUrlEl.appendChild(urlLink);
                eventItem.appendChild(eventUrlEl); 
            }
            
            eventItem.appendChild(eventDetailsEl); 
            
            eventListDiv.appendChild(eventItem);
        });
    }

    function clearForm() {
        eventNameInput.value = '';
        eventDateInput.value = '';
        eventUrlInput.value = '';
        eventDetailsInput.value = '';
    }

    
    loadEvents();
    renderEvents();
});