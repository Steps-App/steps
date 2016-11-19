// therapistRoutes
const express = require('express')
const therapistRoutes = express()

// db models
const db = require('../../db/')
const patientModel  = db.model('patient') 
const therapistModel  = db.model('therapist') 

// -=-=-= CREATE =-=-=-

// create therapist
therapistRoutes.post('/', (req, res, next) => {
	therapistRoutes.create({
	     first_name: req.body.first_name,
	     last_name: req.body.last_name,
	     practice_name: req.body.practice_name,
	     license_id: req.body.license_id,
	     img_URL: req.body.image_URL,
	     email: req.body.email,
	     gender: req.body.gender,
	     password: req.body.password
   	})
	.then(therapist => res.send(therapist))
	.catch(next);
})

// -=-=-=-= READ =-=-=-=-

// get patients of a therapist 
therapistRoutes.get('/:id', (req, res, next) => {  // <-- CHANGE
	therapistModel.findOne({
		where: { id: req.params.id },
		include: [
			{ model: patient, as: 'patient', required: false }
		]
	})
	.then(patient => res.send(patient))
	.catch(next);
});

// -=-=-=-= UPDATE =-=-=-=-

// modify something
therapistRoutes.put('/:id', (req, res, next) => {  
	therapistModel.findById(req.params.id)
		.then(therapist => therapist.update(req.body))
		.then(updated => res.status(201).send(updated))
		.catch(next);
})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete something
therapistRoutes.delete('/:id', (req, res, next) => {  // 
	therapistModel.findById(req.params.id)
			.then(result => result.destroy())
			.then(() => res.sendStatus(204))
			.catch(next);
})

module.exports = therapistRoutes
