document.addEventListener('DOMContentLoaded', function () {
    fetchSurveyList();
});

function fetchSurveyList() {
    fetch('/Data/surveys.json')
        .then(response => response.json())
        .then(surveys => {
            surveys.forEach(survey => {
                renderSurveyItem(survey);
            });
        })
        .catch(error => console.error("Error fetching survey list: ", error));
}

function renderSurveyItem(survey) {
    const surveyList = document.getElementById('survey-list');

    const surveyItem = document.createElement('div');
    surveyItem.classList.add('survey-item');

    surveyItem.innerHTML = `
      <h3>${survey.title}</h3>
      <p>${survey.description}</p>
      <a href="survey.html?survey=${survey.file}">Take Survey</a>
    `;

    surveyList.appendChild(surveyItem);
}

function filterSurveys() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const surveyItems = document.querySelectorAll('.survey-item');

    surveyItems.forEach(item => {
        const title = item.querySelector('h3').innerText.toLowerCase();
        const description = item.querySelector('p').innerText.toLowerCase();
        if (title.includes(searchInput) || description.includes(searchInput)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
