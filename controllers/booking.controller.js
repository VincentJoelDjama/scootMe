const models = require("../models");
const jwt = require("jsonwebtoken");

module.exports.newBooking = async (req, res) => {
    const {
        pick_up_longitude,
        pick_up_latitude,
        drop_of_longitude,
        drop_of_latitude,

    } = req.body;


    console.log(req.token);
    models.User.findOne({
            where: {
                id: req.token.userId
            },
        })
        .then((user) => {
            console.log(user);
            models.Status.findOne({
                    where: {
                        id: 1
                    },
                })
                .then((status) => {
                    console.log(status);
                     models.Booking.create({
                            pick_up_longitude,
                            pick_up_latitude,
                            drop_of_longitude,
                            drop_of_latitude,
                            customerId: user.id,
                            statusId: status.id
                        })
                        .then((newBooking) => {
                            console.log('userId' + user.id);
                            console.log('statusId' + status.id);
                            console.log(newBooking.customerId);
                            return res.status(201).json([newBooking, user])
                        })
                        .catch(() => res.status(400).json({
                            error
                        }))
                })
                .catch(() => res.status(404).json({
                    error:'could\'nt find this status'
                }))
        })
        .catch(() => res.status(404).json({
            error:'could\'nt find this customer'
        }))
}
/* const id = req.token.userId;
        
                     if (id != req.params.id)
                       return res.status(400).json({
                         error: "wrong token"
                       }); */




module.exports.getAllBookings = (req, res) => {
    const options = {

        limit: 10
    };

    models.Booking.findAll(options)
        .then(bookings => {
            res.status(200).json(bookings)
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
}

module.exports.getAllBookingsFromOneCustomer = (req, res) => {
    const options = {
        where: {
            customerId: req.params.id
        },
        limit: 10
    };

    models.Booking.findAll(options)
        .then(bookings => {
            res.status(200).json(bookings)
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })

}

module.exports.getOneBookingFromOneCustomer = (req, res) => {
    const options = {
        where: {
            id: req.params.bkgId,
            customerId: req.params.custId,
            
        },
      
        limit: 10
    };

    models.Booking.findOne(options)
        .then(bookings => {
            res.status(200).json(bookings)
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })

}

module.exports.addDriverToBooking = (req, res) => {
    const newBooking ={
        ...req.body
    };
    console.log(newBooking); 
    models.User.findOne({where: {id: req.token.userId}})
    .then((customer) => {
        if (!customer) {
            return res.status(404).json('Customer not found');
        }
        //console.log("Customer:  "+ customer);
        models.User.findOne({where: {id: req.params.drvId}})
        .then((driver) => {
            if (!driver) {
                return res.status(404).json('Driver not found');
            }
           // console.log(driver);
            models.Status.findOne({where: {id: 2}})
            .then((status) => {
                if (!status) {
                    return res.status(404).json('Status not found');
                }
               // console.log("Status:  " + status);
                models.Booking.findOne({where: {id: req.params.bkgId, customerId:customer.id}})
                .then((booking) => {
                    if (!booking) {
                        return res.status(404).json('Booking not found');
                    }
                   // console.log(booking);
                    booking
                    .update({
                        ...newBooking,
                        statusId:status.id,
                        driverId: driver.id
                    })
                    .then((updatedBooking) => {
                        if(!updatedBooking) return res.status(400).json('no update made');
                        console.log(updatedBooking);
                        return res.status(200).json(updatedBooking);
                    })
                })
                .catch(error =>{ res.status(500).json({error})})
            })
            .catch(error =>{ res.status(500).json({error})})
        })
        .catch(error =>{ res.status(500).json({error})})
        
    })
    .catch(error =>{ res.status(500).json({error})})
}


module.exports.modifyBooking = (req, res) => {
   /*  console.log(req.token);
    const id = req.token.userId;
  
    if (id != req.params.id)
      return res.status(400).json({
        error: "wrong token"
      }); */
  /*   const {
      firstname,
      lastname,
      email,
      password,
      mobile,
      address,
    } = req.body;
    const picture = req.file ? req.file.filename : undefined; */
    const setBooking = {...req.body};
    const userId = req.token.userId;

   models.User.findOne({ where:{id: userId}})
   .then((user) => {
    models.Booking.findOne({
        where:{id:req.params.bkgId, customerId:user.id}
    })
    .then((booking) => {
        booking
        .update({
            setBooking, 
            statusId:2, 
            driverId: user.id
        })

    })
    .catch(() => {return res.status(404).json({error: 'booking not found'})})
   })
   .catch(() => {return res.status(404).json({error: 'User not found'})});
    
    
  
   
  };