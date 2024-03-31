document.addEventListener('DOMContentLoaded', (event) => {
    switchPage('home.html');

    getNav();
});

function getNav() {
    document.getElementById("buttonNavHome").onclick = function () {
        switchPage('home.html');
    };

    document.getElementById("buttonNavPointBank").onclick = function () {
        switchPage('point_bank.html');
    };

    document.getElementById("buttonNavShop").onclick = function () {
        switchPage('shop.html');
    };

    document.getElementById("buttonNavInfo").onclick = function () {
        switchPage('rec_info.html');
    };

    document.getElementById("buttonNavLeaderboard").onclick = function () {
        switchPage('leaderboard.html');
    };

    document.getElementById("buttonNavProfile").onclick = function () {
        switchPage('profile.html');
    };

    document.getElementById("buttonNavLogin").onclick = function () {
        switchPage('login.html');
    };

    document.getElementById("buttonNavRegister").onclick = function () {
        switchPage('register.html').then(() => {
            document.getElementById("buttonNavLogin2").onclick = function () {
                switchPage('login.html');
            };
        })
    };
}

function switchPage(page) {
    return new Promise((resolve, reject) => {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
                resolve("Page loaded");
            });
    })
}