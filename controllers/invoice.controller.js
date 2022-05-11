const req = require("express/lib/request");
const res = require("express/lib/response");
const models = require("../models");
const { options } = require("../routes/invoice.routes");
module.exports.createInvoice = (req, res) => {
//create invoice
const bookingId = req.body.bookingId;
console.log(bookingId);
models.Booking.findOne({
    where:{
        id:req.body.bookingId
    }
})
.then((booking)=> {
    if(!booking){
        console.log(booking);
        return res.status(404).json('booking not found');
    }
    else
    {
        console.log(booking);
        models.Invoice.create({
            billingDate:req.body.billingDate,
            amount:req.body.amount,
            bookingId: booking.id
        })
        .then((invoice) => {
            return res.status(201).json(invoice)
        } )
        .catch (error => {return res.status(400).json({error:'An error occured'})})
        }
})
.catch(error => {return res.status(500).json({error})}
)
};

//we find one invoice

module.exports.getInvoice = (req , res) => {
    models.Invoice.findOne({
        where: {
            id: req.params.id
        },})
       .then((invoice) => {
           if(invoice) return res.status(201).json(invoice);
           else return res.status(401).json({
               error: "invoice not found"
           });

       })
       .catch(() => res.status(501).json({
           error: "cannot fech invoice"
       }) )
}


//we find all invoice
module.exports.getAllInvoice = (req , res , next) => {
    const options = {
        limit: 10
    }
models.Invoice.findAll(options)
    .then(invoice => {
        res.status(200).json(invoice)
    } )

    .catch(error => {
        console.log(error)
        res.status(400).json({
            error
        })
    })
}

//drop the invoice
module.exports.dropInvoice = (req , res) => {
    models.invoice.findOne({
        where: {
            id: req.params.id
        },
    })
    .then((invoice) => {
    if(!invoice) {
        return res.status(401).json({
            error: "invoice not found"
        });
    }
    models.invoice.destroy({
        where: {
            id: res.params.id
        }
    });
})
    
}