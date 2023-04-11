const City = require("../models/cityModel");

const getCities = async (req, res) => {
  const cityData = await City.find();

  res.status(200).json(cityData);
};

const addCity = async (req, res) => {
  const city = req.body.city;

  try {
    const exists = await City.findOne({ cityName: city });

    if (exists) {
      throw Error("City already exists");
    }

    const newCity = new City({
      cityName: city,
    });

    newCity.save();
    res.status(200).json(`New City added - ${newCity.cityName}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCities, addCity };
