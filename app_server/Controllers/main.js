// GET Homepage
const index = function (req, res) {
    res.render('index', { title: "Travlr Getaways" });
};

module.exports = {
    index
};
