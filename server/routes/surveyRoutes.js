const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const verifyCredits = require("../middlewares/verifyCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
    app.get("/api/surveys/done", (req, res) => {
        res.send("Thank you for your response!");
    });

    app.post("/api/surveys", requireLogin, verifyCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email =>  ({ email: email.trim() })),
            _owner: req.user.id,
            createdDate: Date.now()
        });

        // compose mailer obj
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            // send email
            await mailer.send();
            await survey.save();

            // deduct credit from user
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
