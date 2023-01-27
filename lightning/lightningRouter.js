const router = require("express").Router();
const {
  getBalance,
  getChannelBalance,
  createInvoice,
  payInvoice,
} = require("../lnd.js");

router.get("/balance", (req, res) => {
  getBalance()
    .then((balance) => {
      res.status(200).json(balance);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/channelbalance", (req, res) => {
  getChannelBalance()
    .then((balance) => {
      res.status(200).json(balance);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/invoice", (req, res) => {
  const { value, memo } = req.body;
  createInvoice({ value, memo })
    .then((invoice) => {
      res.status(200).json(invoice);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/payinvoice", (req, res) => {
  const { payment_request } = req.body;
  payInvoice({ payment_request })
    .then((paidInvoice) => {
      if (paidInvoice.payment_error) {
        res.status(500).json(paidInvoice.payment_error);
      } else {
        // save tx to database
        res.status(200).json(paidInvoice);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
