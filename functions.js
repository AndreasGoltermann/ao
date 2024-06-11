function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        });
}
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header.html', 'header');
    loadHTML('footer.html', 'footer');
    loadHTML('raid_teams.html', 'raid_teams');
});

function toRaid() {
    window.location.href = 'raid.html';
}

function toGuide() {
    window.location.href = 'https://docs.google.com/spreadsheets/d/1L6DyBnbm97NNwsBlPwCpFf_W9XxKSMnqZJ8G4Ul7t6Q/edit?usp=sharing';
}