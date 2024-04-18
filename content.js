import { registerUser, loginUser, isLoggedIn, logoutUser, getUserInfo } from "./firebase.js";

import Award from "./awards.js";

const monthConvert = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.addEventListener('DOMContentLoaded', () => {
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
        navPointBank();        
    };
    document.getElementById('buttonNavPointBank').onmouseover = function () {
        document.getElementById('buttonNavPointBank').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavPointBank').onmouseout = function () {
        document.getElementById('buttonNavPointBank').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavShop').onclick = function () {
        navShop();
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
        navProfile();
    };
    document.getElementById('buttonNavProfile').onmouseover = function () {
        document.getElementById('buttonNavProfile').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavProfile').onmouseout = function () {
        document.getElementById('buttonNavProfile').style.backgroundColor = '#A8A9AD';
    };

    document.getElementById('buttonNavLogin').onclick = function () {
        navLogin();
    }
    document.getElementById('buttonNavLogin').onmouseover = function () {
        document.getElementById('buttonNavLogin').style.backgroundColor = '#848482';
    };
    document.getElementById('buttonNavLogin').onmouseout = function () {
        document.getElementById('buttonNavLogin').style.backgroundColor = '#A8A9AD';
    };
}

function navPointBank() {
    switchPage('point_bank.html').then(() => {
        document.getElementById('point_submit').onclick = function () {
            let plasticSize = document.getElementById('plastic_size').value;
            let plasticType = document.getElementById('plastic_type').value;

            // If plastic type is not known by user, grab object type and it will give
            // the most common plastic type for that object
            if (plasticType == "unknown") {
                plasticType = document.getElementById('object_type').value;
            }

            // Grab plastic multiplier
            let plasticMultiplier = 0;
            if ((plasticType == "pet") || (plasticType == "hdpe")) {
                plasticMultiplier = 3;
            } else if ((plasticType == "pvc") || (plasticType == "ldpe") || (plasticType == "pp")) {
                plasticMultiplier = 2;
            } else { plasticMultiplier = 1; }

            // Tally up points
            let points = (plasticMultiplier * plasticSize);

            // TESTING
            document.getElementById('point-tester').innerHTML = points;
        }
    });
}

// Shop Content Script
function navShop() {
    switchPage('shop.html').then(() => {
        document.getElementById('dolphin_award').innerHTML = Award.dolphinAward;
        document.getElementById('treasure_award').innerHTML = Award.treasureAward;
        document.getElementById('shell_award').innerHTML = Award.shell;
        document.getElementById('lighthouse_award').innerHTML = Award.lighthouse;
        document.getElementById('diver_award').innerHTML = Award.diver;
        document.getElementById('turtle_award').innerHTML = Award.turtle;
        document.getElementById('shark_award').innerHTML = Award.shark;
        document.getElementById('flipflops_award').innerHTML = Award.flipflops;
        document.getElementById('sunglasses_award').innerHTML = Award.sunglasses;
        document.getElementById('crab_award').innerHTML = Award.crab;
        document.getElementById('lobster_award').innerHTML = Award.lobster;
        document.getElementById('mermaid_award').innerHTML = Award.mermaid;
        document.getElementById('seahorse_award').innerHTML = Award.seahorse;
        document.getElementById('surfboard_award').innerHTML = Award.surfboard;
        document.getElementById('starfish_award').innerHTML = Award.starfish;
        document.getElementById('snorkel_award').innerHTML = Award.snorkel;
        document.getElementById('pearl_award').innerHTML = Award.pearl;

        
        /*
        // Confirm if user has enough points to purchase award
        // TODO

        // Confirm if user actually want to purchase TODO
        let confirmMessage;
        document.getElementById('shell_award').onclick = function () {
            if (confirm("Are you sure you want to buy a \"Shell Award\"")) {
                confirmMessage = "Congratulations, you bought a \"Shell Award\"";
            }
            else {
                confirmMessage = "Purchase Cancelled"
            }
        }*/
    });
}

// Profile Content Script
function navProfile() {
    switchPage('profile.html').then(async () => {
        if (!isLoggedIn()) {
            document.querySelector('.account-container').style.display = 'none';
            document.getElementById('login_button').onclick = function () {
                navLogin();
            }
        } else {
            document.querySelector('.logged-out-container').style.display = 'none';
            document.getElementById('logout_button').onclick = function () {
                logoutUser();
                navLogin();
            }
            const userInfo = await getUserInfo();

            document.getElementById('username_placeholder').textContent = userInfo.username;
            document.getElementById('joined_placeholder').textContent = monthConvert[userInfo.joinDate.getMonth()] + " " + userInfo.joinDate.getDate() + " " + userInfo.joinDate.getFullYear();
            document.getElementById('points_placeholder').textContent = userInfo.points;
            document.getElementById('items_placeholder').textContent = userInfo.items;
        }
    });
}

// Login Content Script
function navLogin() {
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
                    });
                };

                document.getElementById('buttonNavLogin2').onclick = function () {
                    navLogin();
                }
            });
        };
    });
}

function switchPage(page) {
    return new Promise((resolve) => {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
                resolve("Page loaded");
            });
    })
}