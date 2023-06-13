const axios = require("axios");
const { Country, Activity } = require("../db");

async function setCountriesDB() {
  try {
    const infoDB = await Country.findAll({ include: Activity });

    if (infoDB.length) return infoDB;

    let resApi = await axios.get("https://restcountries.com/v3.1/all");

    let result = resApi.data.map((ctry) => {
      // Creo array con datos necesarios por cada pais, traidos de la api..
      return {
        id: ctry.cca3,
        name: ctry.name.common,
        image: ctry.flags.png,
        continent: ctry.continents.toString(),
        capital: ctry.capital ? String(ctry.capital) : "Without capital",
        subregion: ctry.subregion ? ctry.subregion : "Without subregion",
        area: ctry.area,
        population: ctry.population,
      };
    });

    result.forEach(async (c) => {
      await Country.findOrCreate({
        where: {
          id: c.id,
        },
        defaults: {
          name: c.name,
          image: c.image,
          continent: c.continent,
          capital: c.capital,
          subregion: c.subregion,
          area: c.area,
          population: c.population,
        },
      });
    });

    const countries = await Country.findAll({ include: Activity });
    return countries;
  } catch (error) {
    throw new Error("Not found data in DB");
  }
}
module.exports = { setCountriesDB };
