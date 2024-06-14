// Define a variable for the api
let msfapi = undefined;

// Define a general-purpose error logger
function errorLogger(err) {
console.log('App Error:', err);
}

// Define a helper function to register click handlers
function registerClick(query, handler) {
document.querySelector(query).addEventListener('click', function (event) {
    handler(event);
    event.preventDefault();
});
}

// Define a helper function to get a document element
function qs(query) {
return document.querySelector(query);
}

// Define a helper function to switch between logged in/out states
function setLoggedIn(loggedIn) {
qs('#loggedIn').style.display = loggedIn ? '' : 'none';
qs('#loggedOut').style.display = loggedIn ? 'none' : '';
qs('#lang').innerText = msfapi.getPlayerLang() || 'none';
setTcp('none');
}

// Define a helper function to update tcp display
function setTcp(tcp) {
qs('#tcp').innerText = tcp;
qs('#errDisplay').innerText = '';
}

// Define a helper function to render a fetch error
async function renderFetchError(response) {
const bodyText = await response.text().catch(() => {});
const errText = `Fetch Error: HTTP Status ${response.status}:${response.statusText}\nBody: ${bodyText}`;
qs('#errDisplay').innerText = errText;
}

// This gets called when the document loads
async function onLoad() {

// Load SDK
console.log('Loading SDK');
msfapi = new App(
    " e1656301-9783-4480-9e0d-101b1fb765de",
    'm3p.f.pr.pro m3p.f.pr.act openid offline', // space-separated scope list
    "redirect.html"
);

//////////////////////////////////////
//  Define what all the buttons do  //
//////////////////////////////////////

registerClick('#login', function (event) {
    // Redirect the user to log in
    msfapi.makeAuthorizationRequest();
});

registerClick('#fetchTcp', async function (event) {
    const response = await msfapi.fetch('/player/v1/card');
    if(!response.ok) {
    setTcp('err');
    renderFetchError(response);
    return;
    }
    const json = await response.json();
    const tcp = json.data && json.data.tcp || 'missing';
    setTcp(tcp);
});

registerClick('#clearTcp', function (event) {
    setTcp('none');
});

registerClick('#expireAccessToken', function (event) {
    msfapi.debugExpireAccessToken();
});

registerClick('#logout', async function (event) {
    await msfapi.clearLocal();
    setLoggedIn(false);
});

registerClick('#logoutAll', async function (event) {
    const response = await msfapi.fetch('/player/v1/auth/consents', 'delete');
    if(!response.ok) {
    renderFetchError(response);
    return;
    }
    await msfapi.clearLocal();
    setLoggedIn(false);
});

// Check if the player is already logged in
const loggedIn = await msfapi
    .checkForAuthorizationResponse()
    .catch(errorLogger);

// Update the UI to match the logged in state
setLoggedIn(loggedIn);

}