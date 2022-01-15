import React from "react";
import {nanoid} from "nanoid";

export function PlanetsList(props) {

  const { data } = props;
  const planetsData = data.results;

  return <>
    {planetsData.map((item)=> {
      return <div className="planets__item"
                  key={nanoid()}
                  style={
        {border: "2px solid grey",
          borderCollapse: "collapse",
          maxWidth: '600px',
          margin: '0 auto',
          paddingBottom: '20px'
        }}>
        <p className="planets__itemTitle">{item.name}</p>
        <span>Ссылка на планету: </span><a className="planets__itemLink" href={item.url}>{item.url}</a>
      </div>
    })}
  </>
}