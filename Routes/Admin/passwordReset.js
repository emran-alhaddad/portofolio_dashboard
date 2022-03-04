const userAuth = require('../../model/userAuth');
const Token = require("../../model/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
var formidable = require('formidable');


router.post("/", async(req, res) => {
    var form = new formidable.IncomingForm();

    try {
        form.parse(req, async function(err, fields, files) {

            if (fields) {
                const schema = Joi.object({ email: Joi.string().email().required() });
                const { error } = schema.validate(fields);
                if (error) return res.status(400).send(error.details[0].message);

                const user = await userAuth.findOne({ email: fields.email });
                if (!user)
                    return res.status(400).send(`
                    <script>
                        alert("user with given email doesn't exist");
                        window.location.href = "/dashboard/login";
                    </script>
                    `);

                let token = await Token.findOne({ userId: user._id });
                if (!token) {
                    token = await new Token({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString("hex"),
                    }).save();
                }

                const link = `${req.headers.origin}/dashboard/password-reset/${user._id}/${token.token}`;
                await sendEmail(user.email, "Password reset", link);

                res.send(`
                            <script>
                                alert("password reset link sent to your email account");
                                window.location.href = "/dashboard/login";
                            </script>
                        `);
            }
        });
    } catch (error) {
        res.send(`
                            <script>
                                alert("An error occured: ${error}");
                                window.location.href = "/dashboard/login";
                            </script>
                        `);
    }
});

router.get("/:userId/:token", async(req, res) => {
    console.log(req.params)
    try {


        let recivedToken = await Token.findOne({ userId: req.params.userId, token: req.params.token });
        if (!recivedToken) {
            res.send(`
                            <script>
                                alert("Invalid Token...You are not authorised to access this page");
                                window.location.href = "/dashboard/login";
                            </script>
                        `);

        } else
            res.render('./dashboardView/changePassword');
    } catch (error) {
        res.send(error)
    }


});
router.post("/:userId/:token", async(req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await userAuth.findById(req.params.userId);
        if (!user)
            return res.status(400).send(`
                            <script>
                                alert("Invalid link or expired");
                                window.location.href = "/dashboard/login";
                            </script>
                        `);

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token)
            return res.status(400).send(`
                            <script>
                                alert("Invalid link or expired");
                                window.location.href = "/dashboard/login";
                            </script>
                        `);

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send(`
                            <script>
                                alert("password reset sucessfully");
                                window.location.href = "/dashboard/login";
                            </script>
                        `);
    } catch (error) {
        res.status(400).send(`
                            <script>
                                alert("Error: ${error}");
                                window.location.href = "/dashboard/login";
                            </script>
                        `);
        console.log(error);
    }
});

module.exports = router;