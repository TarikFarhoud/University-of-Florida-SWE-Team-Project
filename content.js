import { registerUser, loginUser, isLoggedIn } from "./firebase.js";

document.addEventListener('DOMContentLoaded', (event) => {
    switchPage('home.html').then(() => { getNav(); });
});

function getNav() {
    document.getElementById('buttonNavHome').onclick = function () {
        switchPage('home.html');
    };
    document.getElementById('buttonNavHome').onmouseover = function () {
        document.getElementById('buttonNavHome').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavHome').onmouseout = function () {
        document.getElementById('buttonNavHome').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavPointBank').onclick = function () {
        switchPage('point_bank.html');
    };
    document.getElementById('buttonNavPointBank').onmouseover = function () {
        document.getElementById('buttonNavPointBank').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavPointBank').onmouseout = function () {
        document.getElementById('buttonNavPointBank').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavShop').onclick = function () {
        switchPage('shop.html');
    };
    document.getElementById('buttonNavShop').onmouseover = function () {
        document.getElementById('buttonNavShop').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavShop').onmouseout = function () {
        document.getElementById('buttonNavShop').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavInfo').onclick = function () {
        switchPage('rec_info.html');
    };
    document.getElementById('buttonNavInfo').onmouseover = function () {
        document.getElementById('buttonNavInfo').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavInfo').onmouseout = function () {
        document.getElementById('buttonNavInfo').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavLeaderboard').onclick = function () {
        switchPage('leaderboard.html');
    };
    document.getElementById('buttonNavLeaderboard').onmouseover = function () {
        document.getElementById('buttonNavLeaderboard').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavLeaderboard').onmouseout = function () {
        document.getElementById('buttonNavLeaderboard').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavProfile').onclick = function () {
        switchPage('profile.html').then(() => {
            if (!isLoggedIn()) {
                document.querySelector('.profile-container').style.display = 'none';
            }
        });
    };
    document.getElementById('buttonNavProfile').onmouseover = function () {
        document.getElementById('buttonNavProfile').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavProfile').onmouseout = function () {
        document.getElementById('buttonNavProfile').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavLogin').onclick = function () {
        switchPage('login.html').then(() => {
            document.getElementById('buttonSignInLogin').onclick = function () {
                const email = document.getElementById('inputEmail').value;
                const password = document.getElementById('inputPassword').value;
                loginUser(email, password).then((message) => {
                    document.getElementById('responseText').textContent = message;
                    console.log('Response shown:', message);
                });
            };

            document.getElementById('buttonNewRegister').onclick = function () {
                switchPage('register.html').then(() => {
                    document.getElementById('buttonSignUpRegister').onclick = function () {
                        const username = document.getElementById('inputUsername').value;
                        const email = document.getElementById('inputEmail').value;
                        const password = document.getElementById('inputPassword').value;
                        registerUser(username, email, password).then((message) => {
                            document.getElementById('responseText').textContent = message;
                            console.log('Response shown:', message);
                        });;
                    };

                    document.getElementById('buttonNavLogin2').onclick = function () {
                        switchPage('login.html').then(() => {
                            document.getElementById('buttonNavLogin').click();
                        });
                    }
                });
            };
        });
    }
    document.getElementById('buttonNavLogin').onmouseover = function () {
        document.getElementById('buttonNavLogin').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavLogin').onmouseout = function () {
        document.getElementById('buttonNavLogin').style.backgroundColor = '#A8A9AD';
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