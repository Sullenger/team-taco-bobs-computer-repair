/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

const mongoose = require("mongoose");

let servicesSchema = mongoose.Schema({
    service: String,
    service_number: String,
    service_price: String
});

module.exports = mongoose.model("Service", servicesSchema);
