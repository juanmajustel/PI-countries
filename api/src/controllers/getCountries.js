const { Country, Activity } = require("../db");
const { setCountriesDB } = require("../chargeDB/setCountriesDB");

// GET DE TODOS LOS PAISES O FILTRADOS POR QUERY
async function getCountries(req, res) {
  try {
    let allCountries = await setCountriesDB();

    const { name } = req.query;

    if (name) {
      let countryName = allCountries.filter((c) =>
        c.name.toLowerCase().startsWith(name.toLowerCase())
      );

      if (countryName.length) {
        return res.status(200).send(countryName);
      } else {
        return res.status(400).send({ message: `No data for ${name}` });
      }
    } else {
      return res.status(200).send(allCountries);
    }
  } catch (error) {
    return res.status(400).send({ message: "No related data" });
  }
}

// GET DE UN PAIS POR ID
async function getById(req, res) {
  try {
    let { id } = req.params;
    id = id.toUpperCase();

    if (id.length) {
      let matchId = await Country.findByPk(id, { include: Activity });

      if (matchId) {
        matchId = {
          id: matchId.id,
          name: matchId.name,
          image: matchId.image,
          continent: matchId.continent,
          capital: matchId.capital,
          subregion: matchId.subregion,
          area: matchId.area,
          population: matchId.population,
          activities: matchId.activities.map((e) => ({
            id: e.id,
            name: e.name,
            difficulty: e.difficulty,
            duration: e.duration,
            season: e.season,
          })),
        };

        return res.status(200).send(matchId);
      } else {
        return res.status(400).send({ message: "No related data" });
      }
    }
  } catch (error) {
    return res.status(400).send({ message: "Not matched by ID" });
  }
}

module.exports = { getCountries, getById };
