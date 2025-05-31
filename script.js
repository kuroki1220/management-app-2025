// script.js
document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const eventUrlInput = document.getElementById('eventUrl');
    const eventDetailsInput = document.getElementById('eventDetails');
    // const eventListDiv = document.getElementById('eventList'); // test.htmlから削除されたため、ここも削除

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

        const newEvent = {
            name: eventNameInput.value,
            date: eventDateInput.value,
            url: eventUrlInput.value, // URLも保存するように追加
            details: eventDetailsInput.value
        };

        storedEvents.push(newEvent);

        localStorage.setItem('events', JSON.stringify(storedEvents));

        // renderEvents(storedEvents); // test.htmlでは一覧表示しないため不要

        clearForm();
        alert('予定が登録されました！'); // 登録完了のフィードバック
    });

    // renderEvents 関数はevents.htmlのスクリプトに移行されたため、ここから削除
    /*
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
    */

    function clearForm() {
        eventNameInput.value = '';
        eventDateInput.value = '';
        eventUrlInput.value = '';
        eventDetailsInput.value = '';
    }

    // renderEvents(); // test.htmlでは初期表示で一覧を表示しないため不要
});