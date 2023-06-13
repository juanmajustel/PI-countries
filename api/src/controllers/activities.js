const { Country, Activity } = require('../db');



//Recibo info por Post desde el front, para crear una actividad...
async function createActivity(req, res){

let { name, difficulty, duration, season, countries } = req.body;  

try {

if(name && difficulty && duration && season && countries){

  name = name.charAt(0).toUpperCase()+name.slice(1).toLowerCase();
  
    const validAct = await Activity.findOne({                  //Compruebo si ya existe dicha actividad...
      where: {
        name,
        difficulty,
        duration,
        season
      },
      attributes: {exclude: ['updatedAt', 'createdAt']} 
    });
  
    if (!validAct) {
  
      const addAct = await Activity.create({                //Creo la actividad y luego busco su pais para conectarlos...
        name,
        difficulty,
        duration,
        season
      });
      
      const matchCountry = await Country.findAll({
        where: {
          name: countries,
        }
      });
  
      const result = await addAct.addCountries(matchCountry);
  
      return res.status(200).send(result);
    };
  
  
    //Busco pais que coincida para conectar la actividad existente..
  
    const countryMatch = await Country.findAll({
      where: {
        name: countries,
      },
    });
   
  
    const result = await validAct.addCountries(countryMatch);
  
    return res.status(200).send(result);
  
    
  }
} catch (error) {
    res.status(400).send('No info in Data Base');
  }
};





//Peticion de las actividades con sus paises desde la DB...
async function getActivities(req, res){
  
  let activities = await Activity.findAll({ include: Country });

try {
  if(activities.length) { 

    activities = activities.map(act => {
      return {
        id: act.id,
        name: act.name,
        difficulty: act.difficulty,
        duration: act.duration,
        season: act.season,
        countries: act.countries.length ? act.countries.map(el => {return {name: el.name, image: el.image}}) : 'Not country matched'
      }
    });
  };
    
  return res.status(200).send(activities);
  
    
  } catch (error) {
    res.status(400).send('No info in Data Base');  
  }
};


//Borrar una actividad por medio de su ID recibido por params en Post desde el front...
async function deleteActivity(req, res){
  const {id} = req.params;
  try {
    if(id) {
      await Activity.destroy({where: {id :`${id}`}})

      return res.status(200).send({message: 'Activity destroyed successfully'})
    
    };
  
    return res.status(400).send({message: 'Ups!, check your parameters'});
  
  
    
  } catch (error) {
  res.status(400).send('No found for delete'); 
  }
};

module.exports = {createActivity, getActivities, deleteActivity};