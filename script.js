document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const eventUrlInput = document.getElementById('eventUrl');
    const eventDetailsInput = document.getElementById('eventDetails');
    const eventListDiv = document.getElementById('eventList');

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

        const newEvent = {
            name: eventNameInput.value,
            date: eventDateInput.value,
            details: eventDetailsInput.value
        };

        storedEvents.push(newEvent);

        localStorage.setItem('events', JSON.stringify(storedEvents));

        renderEvents(storedEvents);

        clearForm();
    });

    window.renderEvents = function(eventsData) {
        const eventsToRender = eventsData || JSON.parse(localStorage.getItem('events')) || [];

        eventListDiv.innerHTML = '';

        if (eventsToRender.length === 0) {
            eventListDiv.innerHTML = '<p>まだ予定は登録されていません。</p>';
            return;
        }

        eventsToRender.sort((a, b) => new Date(a.date) - new Date(b.date));

        eventsToRender.forEach(event => {
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
    };

    function clearForm() {
        eventNameInput.value = '';
        eventDateInput.value = '';
        eventUrlInput.value = '';
        eventDetailsInput.value = '';
    }

    renderEvents();
});
