const router = require('express').Router();
    const invoiceController = require("../controllers/invoice.controller.js");

    // Create a new invoice
    router.post("/create", invoiceController.createInvoice);

    //route to fine one invoice
    router.get("/find/:id", invoiceController.getInvoice)

    //route to find all the invoices
    router.get("/get", invoiceController.getAllInvoice)

    //drop the 

    module.exports = router;