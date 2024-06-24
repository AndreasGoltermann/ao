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
    loadHTML('RaidTeamReader.html', 'RaidTeamReader')
    loadHTML('menu.html', 'menu')
});

//function toRaid() {
//    window.location.href = 'raid.html';
//}

function qs(query) {
    return document.querySelector(query);
}

function enable_tab(tab) {
    qs('#alliance_info').style.display = 'none';
    qs('#front_page').style.display = 'none';
    qs('#raid').style.display = 'none';
    qs(tab).style.display = '';
}

function toRaid() {
    qs('#alliance_info').style.display = 'none';
    qs('#front_page').style.display = 'none';
    qs('#raid').style.display = '';
}

function toInfo() {
    qs('#alliance_info').style.display = 'none';
    qs('#front_page').style.display = 'none';
    qs('#raid').style.display = 'none';
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

function loadClient() {
    gapi.client.setApiKey('AIzaSyAvDg01boCIHjUjEJoArD0PnwRaPdyQgig'); // Replace with your API key
    return gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4')
        .then(function() { 
            console.log('GAPI client loaded for API'); 
            getSheetData();
        },
              function(err) { console.error('Error loading GAPI client for API', err); });
}

function getSheetData() {
    return gapi.client.sheets.spreadsheets.get({
        spreadsheetId: '1W4CA0ztO0A8UzHZCjGvEwB5ExpRpAw_wXYbgxCe5Y0s', // Replace with your spreadsheet ID
        ranges: ['Data!A1:F9'], // Adjust the range as needed
        includeGridData: true,
    }).then(function(response) {
        const sheet = response.result.sheets[0];
        const rows = sheet.data[0].rowData;
        const columnMetadata = sheet.data[0].columnMetadata;
        const table = document.createElement('table');
        const colGroup = document.createElement('colgroup');
        columnMetadata.forEach((col, index) => {
            const colElement = document.createElement('col');
            if (col.pixelSize) {
                colElement.style.width = `${col.pixelSize}px`;
            }
            colGroup.appendChild(colElement);
        });

        table.appendChild(colGroup);
        for (const row of rows) {
            const tr = document.createElement('tr');
            if (row.values) {
                for (const cell of row.values) {
                    const td = document.createElement('td');
                    td.style.textAlign = 'center'; // Center the text
                    if (cell.formattedValue) {
                        td.textContent = cell.formattedValue;
                    }
                    if (cell.effectiveFormat) {
                        if (cell.effectiveFormat.backgroundColor) {
                            const color = cell.effectiveFormat.backgroundColor;
                            const red = Math.floor((color.red || 0) * 255);
                            const green = Math.floor((color.green || 0) * 255);
                            const blue = Math.floor((color.blue || 0) * 255);
                            const alpha = color.alpha !== undefined ? color.alpha : 1;
                            td.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                        }
                        if (cell.effectiveFormat.textFormat) {
                            const textFormat = cell.effectiveFormat.textFormat;
                            if (textFormat.bold) td.style.fontWeight = 'bold';
                            if (textFormat.italic) td.style.fontStyle = 'italic';
                            if (textFormat.fontSize) td.style.fontSize = `${textFormat.fontSize}px`;
                            if (textFormat.foregroundColor) {
                                const color = textFormat.foregroundColor;
                                const red = Math.floor((color.red || 0) * 255);
                                const green = Math.floor((color.green || 0) * 255);
                                const blue = Math.floor((color.blue || 0) * 255);
                                const alpha = color.alpha !== undefined ? color.alpha : 1;
                                td.style.color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                            }
                        }
                    }
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
        document.getElementById('tableContainer').appendChild(table);
    }, function(err) { console.error('Execute error', err); });
}

gapi.load('client', loadClient);