// require the database configuration module
const db = require("../dbConfig");

module.exports = {
  // a function to find a user by id
  findById: (id) => {
    // query the 'invoices' table for the invoice with the given id
    return db("paid_invoices").where({ id }).first();
  },
  // a function to create a new invoice
  create: (paid_invoice) => {
    // insert the invoice object into the 'invoices' table and return the inserted invoice object
    return db("paid_invoices").insert(paid_invoice).returning("*");
  },
  // a function to update an existing invoice with the given id
  update: (payment_request, paid_invoice) => {
    // update the user object in the 'invoices' table where the id matches and return the updated invoice object
    return db("paid_invoices")
      .where({ payment_request })
      .update(paid_invoice)
      .returning("*");
  },
  // a function to delete an existing invoice with the given id
  delete: (id) => {
    // delete the user from the 'invoices' table where the id matches
    return db("paid_invoices").where({ id }).del();
  },
};
