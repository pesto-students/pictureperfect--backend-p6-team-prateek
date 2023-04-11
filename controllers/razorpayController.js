const shortid = require("shortid");
const Razorpay = require("razorpay");

const handleRazorpayPayment = async (req, res) => {
  const payment_capture = 1;
  const amount = Number(req.body.amount * 100); // amount captures is in paise
  const currency = "INR";

  const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleRazorpayPayment };
