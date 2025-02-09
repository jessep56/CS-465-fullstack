const tripsEndpoint = 'http://localhost:3000/api/trips';

const travelList = async (req, res) => {
    try {
        console.log("TRAVEL CONTROLLER BEGIN");

        // Fetch trips from the API
        const response = await fetch(tripsEndpoint);
        let trips = await response.json();

        console.log("Trips fetched:", trips);

        // Handle cases where the response is not an array
        let message = null;
        if (!Array.isArray(trips)) {
            console.log("API response is not an array, setting to empty.");
            message = "API lookup error";
            trips = [];
        } else if (trips.length === 0) {
            console.log("No trips found in the database.");
            message = "No trips exist in our database!";
        }

        // Render the travel view with trips data
        res.render('travel', { title: 'Travlr Getaways', trips, message });
    } catch (err) {
        console.error("Error retrieving trips:", err);
        res.status(500).render('error', { message: 'Error retrieving trips', error: err });
    }
};

module.exports = { travelList };
