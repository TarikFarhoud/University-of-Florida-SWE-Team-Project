document.addEventListener('DOMContentLoaded', (event) => {
    fetch('home.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app-content').innerHTML = html;
        })

        getNav();
});

function getNav() {
    // Homepage Button:
    document.getElementById('buttonNavHome').onclick = function () {
        fetch('home.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById('buttonNavHome').onmouseover = function () {
        document.getElementById('buttonNavHome').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavHome').onmouseout = function () {
        document.getElementById('buttonNavHome').style.backgroundColor = '#A8A9AD';
    };

    // Point Bank Button:
    document.getElementById('buttonNavPointBank').onclick = function () {
        fetch('point_bank.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById('buttonNavPointBank').onmouseover = function () {
        document.getElementById('buttonNavPointBank').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavPointBank').onmouseout = function () {
        document.getElementById('buttonNavPointBank').style.backgroundColor = '#A8A9AD';
    };

    // Shop Button:
    document.getElementById('buttonNavShop').onclick = function () {
        fetch('shop.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById('buttonNavShop').onmouseover = function () {
        document.getElementById('buttonNavShop').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavShop').onmouseout = function () {
        document.getElementById('buttonNavShop').style.backgroundColor = '#A8A9AD';
    };

    // Info Button:
    document.getElementById('buttonNavInfo').onclick = function () {
        fetch('rec_info.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById('buttonNavInfo').onmouseover = function () {
        document.getElementById('buttonNavInfo').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavInfo').onmouseout = function () {
        document.getElementById('buttonNavInfo').style.backgroundColor = '#A8A9AD';
    };

    // Leaderboard Button:
    document.getElementById('buttonNavLeaderboard').onclick = function () {
        fetch('leaderboard.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById('buttonNavLeaderboard').onmouseover = function () {
        document.getElementById('buttonNavLeaderboard').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavLeaderboard').onmouseout = function () {
        document.getElementById('buttonNavLeaderboard').style.backgroundColor = '#A8A9AD';
    };

    // Profile Button:
    document.getElementById('buttonNavProfile').onclick = function () {
        fetch('profile.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById('buttonNavProfile').onmouseover = function () {
        document.getElementById('buttonNavProfile').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavProfile').onmouseout = function () {
        document.getElementById('buttonNavProfile').style.backgroundColor = '#A8A9AD';
    };

    // Login Button:
    document.getElementById('buttonNavLogin').onclick = function () {
        fetch('login.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;

                //getNav();

                document.getElementById('buttonNewRegister').onclick = function () {
                    fetch('register.html')
                        .then(response => response.text())
                        .then(html => {
                            document.getElementById('app-content').innerHTML = html;
                        })
                };
            })
    };

    document.getElementById('buttonNavLogin').onmouseover = function () {
        document.getElementById('buttonNavLogin').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavLogin').onmouseout = function () {
        document.getElementById('buttonNavLogin').style.backgroundColor = '#A8A9AD';
    };

    /*
    // Register Nav. Button:
    document.getElementById('buttonNavRegister').onclick = function () {
        fetch('register.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;

                getNav();

                document.getElementById('buttonNavLogin2').onclick = function () {
                    fetch('login.html')
                        .then(response => response.text())
                        .then(html => {
                            document.getElementById('app-content').innerHTML = html;
            
                            
                        })
                };
            })
    };

    document.getElementById('buttonNavRegister').onmouseover = function () {
        document.getElementById('buttonNavRegister').style.backgroundColor = '#848482';
    };

    document.getElementById('buttonNavRegister').onmouseout = function () {
        document.getElementById('buttonNavRegister').style.backgroundColor = '#A8A9AD';
    };
    */
}