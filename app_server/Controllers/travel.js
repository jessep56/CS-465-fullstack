const fs = require('fs');
const path = require('path');

const tripsFilePath = path.join(__dirname, '../../data/trips.json');
let trips = [];

try {
    const data = fs.readFileSync(tripsFilePath, 'utf8');
    trips = JSON.parse(data);
} catch (error) {
    console.error('Error reading trips.json:', error);
}

const travelList = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips });
};

module.exports = { travelList };
