document.addEventListener('DOMContentLoaded', function () {
    const surveyId = getSurveyIdFromURL();
    fetchSurveyData(surveyId).then(renderSurvey);
});

function getSurveyIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('survey');
}

function fetchSurveyData(surveyId) {
    return fetch(`/Data/${surveyId}`)
        .then(response => response.json())
        .catch(error => console.error("Error fetching survey data: ", error));
}

function renderSurvey(data) {
    document.getElementById('survey-title').innerText = data.title;
    document.getElementById('survey-description').innerText = data.description;

    const form = document.getElementById('survey-form');

    data.questions.forEach(question => {
        let field;
        switch (question.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'date':
                field = `<label>${question.label}</label><input type="${question.type}" id="${question.id}" required="${question.required}">`;
                break;
            case 'radio':
                field = `<label>${question.label}</label>`;
                question.options.forEach(option => {
                    field += `<input type="radio" name="${question.id}" value="${option}">${option}`;
                });
                break;
            case 'checkbox':
                field = `<label>${question.label}</label>`;
                question.options.forEach(option => {
                    field += `<input type="checkbox" name="${question.id}" value="${option}">${option}`;
                });
                break;
            case 'dropdown':
                field = `<label>${question.label}</label><select id="${question.id}">`;
                question.options.forEach(option => {
                    field += `<option value="${option}">${option}</option>`;
                });
                field += `</select>`;
                break;
            case 'range':
                field = `<label>${question.label} (${question.min}-${question.max})</label><input type="range" id="${question.id}" min="${question.min}" max="${question.max}">`;
                break;
        }
        form.innerHTML += `<div class="form-group">${field}</div>`;
    });
}

function submitSurvey() {
    const form = document.getElementById('survey-form');
    const formData = new FormData(form);

    console.log([...formData.entries()]);
    alert('Survey submitted successfully!');
}
