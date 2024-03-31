import { registerUser } from "./firebase.js";

document.addEventListener('DOMContentLoaded', (event) => {
    switchPage('home.html').then(() => { getNav(); });
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
        switchPage('login.html').then(() => {
            document.getElementById("buttonNewRegister").onclick = function () {
                switchPage('register.html').then(() => {
                    document.getElementById('buttonSignUpRegister').onclick = function () {
                        const username = document.getElementById('inputUsername').value;
                        const email = document.getElementById('inputEmail').value;
                        const password = document.getElementById('inputPassword').value;
                        registerUser(username, email, password);
                    };
                });
            };
        });
    }
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