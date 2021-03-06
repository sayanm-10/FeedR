const keys = require("../config/keys");
const stripe = require("stripe")(keys.STRIPE_SECRET_KEY);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    app.post("/api/stripe", requireLogin, async (req, res) => {
        await stripe.charges.create({
            amount: 500,
            currency: "usd",
            description: "$1 per credit",
            source: req.body.id
        });

        // passport hooks on the authenticated user to the req
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};
