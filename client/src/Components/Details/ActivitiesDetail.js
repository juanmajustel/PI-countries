import React from 'react'

export default function ActivitiesDetail({actsDetail, country}) {

  return (
    <div>
  
        <h3>Activities for {country}</h3>
        
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Difficulty</th>
              <th>Duration</th>
              <th>Season</th>
            </tr>
            {
              actsDetail?.map(el =>  (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.difficulty}</td>
                  <td>{el.duration}</td>
                  <td>{el.season}</td>
                </tr>
              ))
            }
          </tbody> 
        </table>
    
    </div>
  )

};

