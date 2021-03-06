const stripe = require("../constants/stripe");

const paymentApi = (app) => {
  app.get("/", (req, res) => {
    res.send({
      message: "Stripe checkout server!",
      timestamp: new Date().toISOString(),
    });
  });

  app.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
      const { total, token, description } = req.body;

      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const idempotencyKey = Math.random() * 100;
      const charge = await stripe.charges.create(
        {
          amount: total * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased for ${total}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        {
          idempotencyKey,
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }

    res.json({ error, status });
  });

  return app;
};

module.exports = paymentApi;
