document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        const eventNameInput = document.getElementById('eventName');
        const eventDateInput = document.getElementById('eventDate');
        const startTimeInput = document.getElementById('startTime'); 
        const endTimeInput = document.getElementById('endTime');     
        const eventUrlInput = document.getElementById('eventUrl');
        const eventDetailsInput = document.getElementById('eventDetails');
        const tagButtonsContainer = document.getElementById('tagButtons'); 

        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

            let eventType = 'other';
            if (eventDetailsInput.value.includes('[企業説明会]')) {
                eventType = 'briefing';
            } else if (eventDetailsInput.value.includes('[インターン]')) {
                eventType = 'intern'; 
            } else if (eventDetailsInput.value.includes('[面接]')) {
                eventType = 'interview';
            } else if (eventDetailsInput.value.includes('[Web試験]')) {
                eventType = 'deadline';
            }

            const newEvent = {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
                name: eventNameInput.value,
                date: eventDateInput.value,
                startTime: startTimeInput.value, 
                endTime: endTimeInput.value,    
                url: eventUrlInput.value,
                details: eventDetailsInput.value,
                type: eventType 
            };

            storedEvents.push(newEvent);
            localStorage.setItem('events', JSON.stringify(storedEvents));

            clearForm(eventNameInput, eventDateInput, startTimeInput, endTimeInput, eventUrlInput, eventDetailsInput);
            alert('予定が登録されました！');
        });

        function clearForm(nameInput, dateInput, startTimeInput, endTimeInput, urlInput, detailsInput) {
            nameInput.value = '';
            dateInput.value = '';
            startTimeInput.value = '';
            endTimeInput.value = '';
            urlInput.value = '';
            detailsInput.value = '';
        }
    }
});