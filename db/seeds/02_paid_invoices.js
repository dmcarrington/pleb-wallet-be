exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("paid_invoices")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("paid_invoices").insert([
        {
          payment_request:
            "lnbcrt1u1p3lz0vqpp5s9vtdntpcsdh4a0vdtw69hyyhyqtfrp808xmv5m823f32am86hkqdqqcqzpgxqyz5vqsp5rl6q8tqnntqlvleeh9ahd00tfx8lp0xys3n4y43tas4kaw3s7jts9qyyssqtncjzx6w6u9pw7q74fsxxxqnng2qap7jqfjs5mmund0lwp477s85zvg2z46dax3pmwmtyrys2y88h6g65qnza5u4twgxg6pe686rxcsqrrp6rw",
          value: 100,
        },
      ]);
    });
};
