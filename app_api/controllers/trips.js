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



module.exports = {
    tripsList,
    tripsFindByCode
};
