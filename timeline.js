document.addEventListener('DOMContentLoaded', () => {
    
    const timelineDiv = document.getElementById('timeline');

    const originalRenderEvents = window.renderEvents;

    window.renderEvents = function () {
        if (typeof originalRenderEvents === 'function') {
            originalRenderEvents(); 
        }
        renderTimeline();
    };

    function renderTimeline() {
        timelineDiv.innerHTML = ''; 

        if (!window.events || window.events.length === 0) {
            timelineDiv.innerHTML = '<p>まだ予定は登録されていません。</p>';
            return;
        }

        const sortedEvents = [...window.events].sort((a, b) => new Date(a.date) - new Date(b.date));

        const timelineList = document.createElement('ul');
        timelineList.style.listStyle = 'none';
        timelineList.style.paddingLeft = '0';

        sortedEvents.forEach(event => {
            const item = document.createElement('li');
            item.style.marginBottom = '20px';
            item.style.borderLeft = '4px solid #007bff';
            item.style.paddingLeft = '10px';

            const date = document.createElement('div');
            date.style.fontWeight = 'bold';
            date.textContent = event.date;

            const name = document.createElement('div');
            name.textContent = `イベント: ${event.name}`;

            const details = document.createElement('div');
            details.textContent = `詳細: ${event.details || 'なし'}`;

            item.appendChild(date);
            item.appendChild(name);
            item.appendChild(details);

            timelineList.appendChild(item);
        });

        timelineDiv.appendChild(timelineList);
    }

    renderTimeline();
});
