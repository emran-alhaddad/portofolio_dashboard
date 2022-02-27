const userAuth = require('../model/userAuth');
var formidable = require('formidable');


const showPage = (req, res) => {
    userAuth.findOne({ verified: true }, (err, data) => {
        if (data) res.redirect('/')

        else
            res.render('login')
    })

}

const authenticateUser = (req, res) => {

    if (req.body) {
        userAuth.findOne({ username: req.body.username, password: req.body.password }, (err, data) => {
            if (data) {
                userAuth.findByIdAndUpdate(data._id, { verified: true }, { returnDocument: 'after' }, () => {
                    res.redirect('/');
                })

            } else
                res.write(`
                <script>
                    alert("Invalid Credentials !!!"); 
                    window.location.pathname = "/login";
                </script>`);
        })
    } else
        res.write(`
                <script>
                    alert("Not Authorise To Access "); 
                    window.location.pathname = "/login";
                </script>`);
}

const isLogedIn = (req, res, next) => {
    userAuth.findOne({ verified: true }, (err, data) => {
        if (data)
            next();
        else
            res.write(`
        <script>
            alert("You are Not Authorise To Access "); 
            window.location.pathname = "/login";
        </script>`);
    });

}

const logOut = (req, res) => {
    userAuth.updateOne({ verified: true }, { verified: false }, { returnDocument: 'after' }, () => {
        res.redirect('/login');
    })
}

module.exports = {
    showPage,
    authenticateUser,
    isLogedIn,
    logOut
};