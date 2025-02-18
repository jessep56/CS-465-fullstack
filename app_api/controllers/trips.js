const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// Retrieve all trips
const tripsList = async (req, res) => {
    console.log("tripsList function was called");
    try {
        const trips = await Trip.find({});
        console.log("Trips found:", trips);
        res.status(200).json(trips);
    } catch (err) {
        console.error("Error retrieving trips:", err);
        res.status(500).json({ message: "Error retrieving trips", error: err });
    }
};

// Retrieve a single trip by tripCode
const tripsFindByCode = async (req, res) => {
    const tripCode = req.params.tripCode.trim(); // Remove leading/trailing spaces
    console.log(`Searching for trip with cleaned code: "${tripCode}"`);

    try {
        const trip = await Trip.findOne({ code: { $regex: `^${tripCode}$`, $options: "i" } }); // Case-insensitive search
        
        if (!trip) {
            console.log(`Trip not found for cleaned code: "${tripCode}"`);
            return res.status(404).json({ message: "Trip not found" });
        }

        console.log("Trip found:", trip);
        res.status(200).json(trip);
    } catch (err) {
        console.error("Error retrieving trip:", err);
        res.status(500).json({ message: "Error retrieving trip", error: err });
    }
};

// Add a new trip
const tripsAddTrip = async (req, res) => {
    console.log("tripsAddTrip function was called");

    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const savedTrip = await newTrip.save();

        if (!savedTrip) {
            return res.status(400).json({ message: "Error saving new trip" });
        }

        console.log("New trip added:", savedTrip);
        res.status(201).json(savedTrip);
    } catch (err) {
        console.error("Error adding trip:", err);
        res.status(500).json({ message: "Error adding trip", error: err });
    }
};

// Update an existing trip
const tripsUpdateTrip = async (req, res) => {
    console.log("tripsUpdateTrip function was called");
    console.log(req.params);
    console.log(req.body);

    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },  // Find trip by tripCode
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true } // Return updated document
        ).exec();

        if (!updatedTrip) {
            return res.status(400).json({ message: "Error updating trip" });
        }

        console.log("Trip updated:", updatedTrip);
        res.status(201).json(updatedTrip);
    } catch (err) {
        console.error("Error updating trip:", err);
        res.status(500).json({ message: "Error updating trip", error: err });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
