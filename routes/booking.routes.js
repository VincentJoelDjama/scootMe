const express = require('express');
const router = express.Router();

const bookingController = require("../controllers/booking.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const checkUser = authMiddleware.checkUser;


router.post('/newbooking', checkUser, bookingController.newBooking);
router.get('/', checkUser, bookingController.getAllBookings);
router.get("/:id", checkUser, bookingController.getAllBookingsFromOneCustomer);
router.get("/:custId/:bkgId", checkUser, bookingController.getOneBookingFromOneCustomer);
router.put('/addDrv/:drvId/:bkgId', checkUser, bookingController.addDriverToBooking)
router.put('/:drvId?/:bkgId/:sttId', checkUser, bookingController.modifyBooking)


module.exports = router;