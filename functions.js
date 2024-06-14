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
    loadHTML('menu.html', 'menu')
});

function toRaid() {
    window.location.href = 'raid.html';
}

function toInfo() {
    window.location.href = 'alliance_info.html';
}

function toGuide() {
    window.location.href = 'https://docs.google.com/spreadsheets/d/1L6DyBnbm97NNwsBlPwCpFf_W9XxKSMnqZJ8G4Ul7t6Q/edit?usp=sharing';
}

function toMSF() {
    window.location.href = 'https://www.msf.gg';
}

function toHome() {
    window.location.href = 'index.html';
}

function toDisc() {
    window.location.href = 'https://discordapp.com/channels/754682954378248203/1246197723087241508';
}