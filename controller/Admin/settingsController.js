var formidable = require('formidable');
const settings = require('../../model/userAuth');
const userInfo = require('../../model/userInfoModel');
const userThem = require('../../model/systemUtils')
const sendEmail = require("../../utils/sendNotificationEmail");


const showSettings = async(req, res) => {

    let user = await userInfo.find();
    settings.findOne({}, (err, data) => {
        if (err) console.log(err);
        userThem.find({}, (themErr, themData) => {
            res.render('./dashboardView/settings', { userInfo: user, settings: data, adminThem: themData[0].adminThem });
        });
    })

};

const editSettings = async(req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if (fields) {
            settings.find({})
                .then(data => {
                    console.log(data);
                    let message = "<h3 style='color:red'>We detect changes of your portofolio !!</h3><br><br></br>";
                    if (data[0].username != fields.username) {
                        message += `<br>Username: ${data[0].username}  --- To ---> ${fields.username}`;
                    }
                    if (data[0].password != fields.password) {
                        message += `<br>Password: ${data[0].password}  --- To ---> ${fields.password}`;
                    }
                    if (data[0].email != fields.email) {
                        message += `<br>Email: ${data[0].email}  --- To ---> ${fields.email}
                                    <br>
                                    <i style="font-size:medium; color:red; text-shadow: 0 0 23px yellow; line-height: 7;">
                                         all notifications will be sent to new email !!!
                                    </i>`;

                        sendEmail(fields.email, "Your Portofolio Settings", `
                        <div style="font-size: large; font-family: cursive; text-align: left; direction:ltr;">
                            <h3 style='color:green'>Congratulations !!</h3> 
                                <br>
                                <br>
                            <p> 
                                Your Email is now the default email of your portofolio
                                <br>
                                <br> 
                                <i>the previous email was: ${data[0].email} </i>
                                <br> 
                                <i> Open Your Dashboard  <br>
                                <a href="${req.headers.origin}/dashboard/"> from here </a>
                                </i>
                            </p>
                        </div>`);
                    }



                    if (message != "<h3 style='color:red'>We detect changes of your portofolio !!</h3><br><br></br>") {
                        message += `<br> <i> Check this link please: <a href="${req.headers.origin}/dashboard/  </i>">
                        ${req.headers.origin}/dashboard/  </a>`;
                        sendEmail(data[0].email, "Your Portofolio Changes", message);
                    }

                    settings.updateOne({ id: fields._id.toString() }, fields, { returnDocument: 'after' }, function(err) {
                        if (err) return handleError(err);
                        console.log(new Date().toLocaleString(), "Settings Updated Success")
                    });
                })
                .catch(err => console.log(err))

        }

    });

    // 
}



module.exports = {
    showSettings,
    editSettings,
};