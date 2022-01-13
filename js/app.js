function openNav() {
    document.getElementById("myNav").style.top = "0";
}

function closeNav() {
    document.getElementById("myNav").style.top = "-500px";
}

const toggleThem = () => {
    var body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('Dark-Them')) {
        body.classList.remove('Dark-Them');
        body.classList.add('Light-Them');
    } else {
        body.classList.remove('Light-Them');
        document.getElementsByTagName('body')[0].classList.add('Dark-Them');
    }
}