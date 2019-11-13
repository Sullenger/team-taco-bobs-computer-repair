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

const roleBank = require("../models/roleBank");

// Create User Role
router.post("/role", function(req, res, next) {
  roleBank.create({ role: req.body.role }, function(err, roles) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(roles);
      res.json(roles);
    }
  });
});

// Find all User Roles
router.get("/role", function(req, res, next) {
  roleBank.find({}, function(err, roles) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(roles);
      res.json(roles);
    }
  });
});

// Find User Role by id
router.get("/role/:id", function(req, res, next) {
  roleBank.findOne({ _id: req.params.id }, function(err, role) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(role);
      res.json(role);
    }
  });
});

// Update User Role by id
router.put("/role/:id", function(req, res, next) {
  roleBank.findOne({ _id: req.params.id }, function(err, role) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(role);
      role.set({ role: req.body.role });
      role.save(function(err, updatedRoleBank) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(updatedRoleBank + 'from server');
          res.send({
            message: 'update success'
          });
        }
      });
    }
  });
});

// delete user role by id
router.delete("/role/:id", function(req, res, next) {
  roleBank.findByIdAndDelete({ _id: req.params.id }, function(err, role) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(role);
      res.json(role);
    }
  });
});

module.exports = router;
