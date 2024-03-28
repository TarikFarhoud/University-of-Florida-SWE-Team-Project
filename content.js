document.addEventListener('DOMContentLoaded', (event) => {
    fetch('home.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app-content').innerHTML = html;
        })

    document.getElementById("buttonNavHome").onclick = function () {
        fetch('home.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById("buttonNavPointBank").onclick = function () {
        fetch('point_bank.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById("buttonNavShop").onclick = function () {
        fetch('shop.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById("buttonNavInfo").onclick = function () {
        fetch('rec_info.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById("buttonNavLeaderboard").onclick = function () {
        fetch('leaderboard.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById("buttonNavProfile").onclick = function () {
        fetch('profile.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;
            })
    };

    document.getElementById("buttonNavLogin").onclick = function () {
        fetch('login.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;

                document.getElementById("buttonSignUpLogin").onclick = function(){
                    location.href = "register.html";
                };
            })
    };

    document.getElementById("buttonNavRegister").onclick = function () {
        fetch('register.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-content').innerHTML = html;

                document.getElementById("buttonSignInRegister").onclick = function(){
                    location.href = "login.html";
                };
            })
    };

    fetch('point_bank.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app-content').innerHTML = html;
        })

});