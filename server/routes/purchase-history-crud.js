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
const bcrypt = require("bcrypt");

const purchaseHistory = require("../models/purchaseHistory");

// Create purchase history
router.post("/records", function(req, res, next) {
  purchaseHistory.create(
    {
      items: req.body.items
    },
    function(err, records) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(records);
        res.json(records);
      }
    }
  );
});

// Find purchase history records
router.get("/records", function(req, res, next) {
  purchaseHistory.find({}, function(err, records) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(records);
      res.json(records);
    }
  });
});

// Update purchase history records
router.put("/records/:id", function(req, res, next) {
  purchaseHistory.findOne({ _id: req.params.id }, function(err, records) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(records);
      records.set({
        items: req.body.items
      });
      records.save(function(err, updatedRecords) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(updatedRecords);
          res.json(updatedRecords);
        }
      });
    }
  });
});

// Delete purchase history records
// Not actually deleting. set values to 0
router.put("/records/delete/:id", function(req, res, next) {
  purchaseHistory.findOne({ _id: req.params.id }, function(err, records) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(records);
      records.set({
        items: req.body.items
      });
      records.save(function(err, deletedRecords) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(deletedRecords);
          res.json(deletedRecords);
        }
      });
    }
  });
});

module.exports = router;
