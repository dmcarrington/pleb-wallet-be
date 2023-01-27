const LndGrpc = require("lnd-grpc");
const dotenv = require("dotenv");
const { on } = require("nodemon");

dotenv.config();

const options = {
  host: process.env.HOST,
  cert: process.env.CERT,
  macaroon: process.env.MACAROON,
};

const grpc = new LndGrpc(options);

const connect = async () => {
  await grpc.connect();
  invoiceEventStream();
};

const getBalance = async () => {
  const balance = await grpc.services.Lightning.walletBalance();
  return balance;
};

const getChannelBalance = async () => {
  const balance = await grpc.services.Lightning.channelBalance();
  return balance;
};

const createInvoice = async ({ value, memo }) => {
  const invoice = await grpc.services.Lightning.addInvoice({
    value: value,
    memo: memo,
  });
  return invoice;
};

const payInvoice = async ({ payment_request }) => {
  const payment = await grpc.services.Lightning.sendPaymentSync({
    payment_request: payment_request,
  });
  return payment;
};

const invoiceEventStream = async () => {
  await grpc.services.Lightning.subscribeInvoices({
    add_index: 0,
    settle_index: 0,
  })
    .on("data", (data) => {
      console.log("onData: ", data);
      if (data.settled) {
        // log tx to database
      }
    })
    .on("error", (err) => {
      console.log(err);
    });
};

module.exports = {
  connect,
  grpc,
  getBalance,
  getChannelBalance,
  createInvoice,
  payInvoice,
};
