/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/
const express = require("express");
const router = express.Router();

const Invoices = require("../models/invoice");
const Services = require("../models/services");

router.post("/invoice", (req, res, next) => {
  const invoice = new Invoices({
    date: req.body.date,
    user_id: req.body.user_id,
    services_ordered: req.body.services_ordered,
    order_snapshot: req.body.order_snapshot,
    total: req.body.total
  });
  invoice.save();
  res.status(201).json({
    message: "Invoice successfully posted to the database."
  });
  console.log(invoice);
});

// router.post('/service', (req, res, next) => {
//     const service = new Services({
//         service: req.body.service,
//         service_number: req.body.service_number,
//         service_price: req.body.service_price
//     })
//     service.save();
//     res.status(201).json({
//         message: "Service successfully save to the database."
//     })
// })

router.get("/all-services", (req, res, next) => {
  Services.find({}, (err, services) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "no services found!"
      });
    } else {
      res.status(201).json({
        services: services,
        message: "Sending services."
      });
    }
  });
});

module.exports = router;
