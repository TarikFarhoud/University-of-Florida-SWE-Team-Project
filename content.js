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
        navLeaderboard();
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

            if ((plasticSize != "null") && (plasticType != "null")) { // <- Checks if required info was given
                // If plastic type is not known by user, grab object type and it will give
                // the most common plastic type for that object
                if (plasticType == "unknown") {
                    plasticType = document.getElementById('object_type').value;
                }

                if (plasticType != "null") { // <- Checks if object_type was possibly "null"
                    // Grab plastic multiplier
                    let plasticMultiplier = 0;
                    if ((plasticType == "pet") || (plasticType == "hdpe")) {
                        plasticMultiplier = 3;
                    } else if ((plasticType == "pvc") || (plasticType == "ldpe") || (plasticType == "pp")) {
                        plasticMultiplier = 2;
                    } else { plasticMultiplier = 1; }

                    // Tally up points
                    let points = (plasticMultiplier * plasticSize);

                    if (confirm("You are submitting " + points + " points, is this correct?")) {
                        // SUBMIT POINTS
                    }
                    else {
                        points = 0;
                    }
                }
                else {
                    alert("If plastic type is unknown, you MUST include the object type!")
                }
            }
            else {
                alert("You have to enter a size and type!")
            }
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

        let pointsBalance = 1000;

        // Grab user's point balance
        document.getElementById('point-balance').innerHTML = pointsBalance;

        // Watch for reward purchases
        document.getElementById('dolphin').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 1000, "The Dolphin Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('treasure').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 500, "The Treasure Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('shell').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Shell Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('lighthouse').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Lighthouse Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('diver').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Diver Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('turtle').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Turtle Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('shark').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Shark Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('flip_flops').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Flip Flops Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('sunglasses').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Sunglasses Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('crab').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Crab Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('lobster').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Lobster Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('mermaid').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Mermaid Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('seahorse').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Seahorse Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('surfboard').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Surfboard Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('starfish').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Starfish Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('snorkel').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Snorkel Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
        document.getElementById('pearl').onclick = function () {
            pointsBalance = shopPurchase(pointsBalance, 150, "Pearl Award");
            document.getElementById('point-balance').innerHTML = pointsBalance;
        };
    });
}

function shopPurchase(pointsBalance, cost, reward) {

    // Check if user can afford the reward
    if (cost > pointsBalance) {
        alert("Sorry, you don't have enough points :(");
        return pointsBalance;
    }

    // Confirm user wants to buy the reward
    let confirmMessage = "null";
    if (confirm("Are you sure you want to buy a \"" + reward + "\"?")) {
        confirmMessage = "Congratulations, you bought a \"" + reward + "\"!";
    }
    else {
        confirmMessage = "Purchase Cancelled";
        return pointsBalance;
    }

    // Update balance
    pointsBalance -= cost;

    // Provide purchase message
    alert(confirmMessage);

    // Return new balance
    return pointsBalance;
}

// Leaderboard Content Script
function navLeaderboard() {
    switchPage('leaderboard.html').then(() => {

        // Generate leaderboard cells

        // By rows = users
        for (let i = 0; i < 50; ++i) {
            // By columns
            for (let j = 0; j < 4; ++j) {

                let newCell = document.createElement('div');
                let node = "null";

                // Align content in correct cell
                if (j == 0) {
                    node = document.createTextNode("ranking");
                } else if (j == 1) {
                    node = document.createElement('img');
                    node.src = 'images/default-profile.jpg';
                    node.width = 100;
                } else if (j == 2) {
                    node = document.createTextNode("username");
                } else {
                    node = document.createTextNode("points");
                }

                // Add styling to current cell
                newCell.appendChild(node);
                newCell.style.backgroundColor = 'black';
                newCell.style.color = '#d0b63b';
                newCell.style.font = 'helvetica';
                newCell.style.height = '100px';
                newCell.style.display = 'flex';
                newCell.style.alignItems = 'center';
                newCell.style.justifyContent = 'center';

                // Add the new cell/content
                document.getElementById('leaderboard-frame').appendChild(newCell);
            }
        }
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