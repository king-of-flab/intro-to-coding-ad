const Enquiry = require('../models/enquiry.js')

function sendEnquiry (req, res) {

  var newEnquiry = new Enquiry ({
  name: req.body.name,
  contact: req.body.contact,
  enquiry: req.body.enquiry
})

newEnquiry.save(function (err, newEnquiry) {
  if (err) {
    if (err.errors.name) req.flash('msg', err.errors.name.message)
    if (err.errors.contact) req.flash('msg', err.errors.contact.message)
    if (err.errors.enquiry) req.flash('msg', err.errors.enquiry.message)

    return res.redirect('contact');
  }

  req.flash('msg', 'Message sent!')
  res.redirect('contact')
})

}

module.exports = sendEnquiry
