const House = require('../models/house')
const methods = {}

methods.getAllHouse = (req, res) => {
  House.find({}, (error, response) => {
    if (error) res.json({msg: `Opp, something happened: ${error}`, success:false})
    console.log('Get All House success');
    console.log(response);
    res.send(response)
  })
}

methods.getDetailHouse = (req, res) => {
  House.findById(req.params.id, (error, response) => {
    if (error) res.json({msg: `Opp, something happened: ${error}`, success:false})
    console.log('Get Detail House success');
    console.log(response);
    res.send(response)
  })
}

methods.createHouse = (req, res) => {
  let newHouse = new House({
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner,
    phone: req.body.phone,
    size: req.body.size,
    price: req.body.price,
    image: req.body.image,
    location: req.body.location,
    latlong: req.body.latlong,
    city: req.body.city,
    state: req.body.state
  })

  newHouse.save((err, response) => {
    if (err) res.json({msg: `Opp, something happened: ${error}`, success:false})
    console.log('Create new house success');
    console.log(response);
    res.send(response)
  })
}

methods.editHouse = (req, res) => {
  House.findById(req.params.id, (error, house) => {
    if (error) res.json({msg: `Opp, something happened: ${error}`, success:false})
    console.log('Get Detail House success');
    console.log(house);

    House.findByIdAndUpdate({
      '_id': house._id
    }, {
      $set: {
        'title': req.body.title || house.title,
        'description': req.body.description || house.description,
        'owner': req.body.owner || house.owner,
        'phone': req.body.phone || house.phone,
        'size': req.body.size || house.size,
        'price': req.body.price || house.price,
        'image': req.body.image || house.image,
        'location': req.body.location || house.location,
        'latlong': req.body.latlong || house.latlong,
        'city': req.body.city || house.city,
        'state': req.body.state || house.state,
      }
    }, {
      new: true
    })
    .exec((err, result) => {
      if (err) res.json({msg: `Opp, something happened: ${error}`, success:false})
      console.log('Edit house success');
      console.log(result);
      res.send(result)
    })
  })
}

methods.deleteHouse = (req, res) => {
  House.findByIdAndRemove(req.params.id, (error, response) => {
    if (error) res.json({msg: `Opp, something happened: ${error}`, success:false})
    console.log('Delete house success');
    console.log(response);
    res.send(response)
  })
}

module.exports = methods