document.addEventListener('DOMContentLoaded', () => {
    const timelineDiv = document.getElementById('timeline');
    const noTimelineEventsMessage = document.getElementById('noTimelineEventsMessage');

    function renderTimeline() {
        timelineDiv.innerHTML = ''; 

        const storedEvents = JSON.parse(localStorage.getItem('events')) || []; 

        if (storedEvents.length === 0) {
            noTimelineEventsMessage.style.display = 'block'; 
            return;
        } else {
            noTimelineEventsMessage.style.display = 'none'; 
        }

        const sortedEvents = [...storedEvents].sort((a, b) => {
            const getTimeString = (event) => {
                if (event.startTime) return event.startTime;
                if (event.endTime) return event.endTime;
                return '';
            };
            const dateA = new Date(a.date + (getTimeString(a) ? 'T' + getTimeString(a) : ''));
            const dateB = new Date(b.date + (getTimeString(b) ? 'T' + getTimeString(b) : ''));
            return dateA - dateB;
        });

        const timelineList = document.createElement('ul');

        sortedEvents.forEach(event => {
            const item = document.createElement('li');

            const date = document.createElement('div');
            date.classList.add('date');
            
            let timeDisplay = '';
            if (event.startTime && event.endTime) {
                timeDisplay = ` ${event.startTime} - ${event.endTime}`;
            } else if (event.startTime) {
                timeDisplay = ` ${event.startTime}`;
            } else if (event.endTime) {
                timeDisplay = ` ~ ${event.endTime}`;
            }
            date.textContent = event.date + timeDisplay; 

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

    renderTimeline();
});