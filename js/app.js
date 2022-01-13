// ----------------- Toogle Menue Section ----------------------//

function openNav() {
    document.getElementById("myNav").style.top = "0";
}

function closeNav() {
    document.getElementById("myNav").style.top = "-500px";
}

// ----------------- Themming Section ----------------------//
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


// ----------------- validation Section ----------------------//

const disapleAll = () => {
    var elements = document.getElementsByClassName("input");
    for (const item of elements) {
        item.disabled = true;
    }
}

const disapleAllExcept = name => {
    var elements = document.getElementsByClassName("input");
    for (const item of elements) {
        if (item.id != name.id)
            item.disabled = true;
    }
}

const enableItem = id => document.getElementById(id).disabled = false;

const enableItems = ids => {
    for (const id of ids) {
        enableItem(id);
    }
}

const validateName = name => {
    if (name.value.length > 5 && name.value.length < 10) {
        name.classList.add('inputSuccessLightThem');
        enableItem('email');
    } else {
        name.classList.remove('inputSuccessLightThem');
        disapleAllExcept(name);
    }
}



const validateEmail = (email) => {
    if (String(email.value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
        email.classList.add('inputSuccessLightThem');

        enableItem('service');
        enableItem('subject');
        document.getElementById('service').classList.add('inputSuccessLightThem');

    } else {
        email.classList.remove('inputSuccessLightThem');
        document.getElementById('service').style.classList.remove('inputSuccessLightThem');
        disapleAllExcept(email);
        enableItems(['fname', 'service', 'subject']);
    }
}


const validateMSG = msg => {
    if (msg.value.length > 20) {
        msg.classList.add('inputSuccessLightThem');
        enableItem('submit');
    } else {
        msg.classList.remove('inputSuccessLightThem');
        disapleAllExcept(msg);
        enableItems(['fname', 'email', 'service']);
    }
}