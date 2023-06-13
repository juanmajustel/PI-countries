import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../Redux/actions/actions";
import deleteAct from "../../Redux/actions/deleteAct";
import { Link } from "react-router-dom";
import "./ListActivities.css";

export default function ListActivities() {
  const activities = useSelector((state) => state.activities);

  const dispatch = useDispatch();

  const [activs, setActivs] = useState(activities);

  useEffect(() => {
    dispatch(getActivities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activs]);

  function handleDeleteActivity(idAct) {
    dispatch(deleteAct(idAct));
    setActivs(activities);
  }

  return (
    <div>
      <div className="tableList">
        <table>
          <tbody>
            <tr className="tr">
              <th>Name</th>
              <th>Difficulty</th>
              <th>Duration</th>
              <th>Season</th>
              <th>Country</th>
              <th>Delete</th>
            </tr>
            {activities?.map((el) => {
              const country = el.countries.map((e) => {
                return (
                  <ul key={e.name}>
                    <li>{e.name}</li>
                  </ul>
                );
              });

              return (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.difficulty}</td>
                  <td>{el.duration}</td>
                  <td>{el.season}</td>
                  <td>{country}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleDeleteActivity(el.id)}
                    >
                      <svg
                        viewBox="0 0 15 17.5"
                        height="17.5"
                        width="15"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                      >
                        <path
                          transform="translate(-2.5 -1.25)"
                          d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                          id="Fill"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/home">
          <button className="buttonHome">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}
