const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const verifyCredits = require("../middlewares/verifyCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
    app.post("/api/surveys", requireLogin, verifyCredits, (req, res) => {
        const { title, subject, body, response } = req.body;

        const survey = Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email =>  ({ email: email.trim() })),
            _owner: req.user.id,
            createdDate: Date.now()
        });

        // send email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
};
