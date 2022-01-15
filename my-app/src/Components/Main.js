import React, {useState, useEffect, useRef} from "react";
import {nanoid} from "nanoid";
import {Plane} from "react-loader-spinner";
import { PlanetsList } from "./PlanetsList/PlanetsList";

export function Main() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("initial");
  const dataRef = useRef(setData);
  const errorRef = useRef(setError);
  const statusRef = useRef(setStatus);
  const arrayWithPages = [];
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const renderLinkToPages = (maxPage) => {
    for (let i = 1; i <= maxPage; i++) {
      arrayWithPages.push(i);
    }

    const allPages = arrayWithPages.map(page => {
    return <button className="Palnets__page"
                   key={nanoid()}
                   value={page}
                   onClick={(e)=> handleGoToPage(e)}
          >{page}
    </button>
    })

    return allPages;
  }
  
  const handleGoToPage = (e) => {
    setCurrentPage(e.target.value);
  }

  useEffect(()=> {
    dataRef.current = setData;
    errorRef.current = setError;
    statusRef.current = setStatus;
  },[setStatus, setError, setData]);

  useEffect(()=> {

    fetch("https://www.swapi.tech/api/planets")
      .then((res)=> {
        dataRef.current(null);
        errorRef.current(null);
        statusRef.current("loading");
        return res.json();
      })

      .then((dataJSON)=> {
        dataRef.current(dataJSON);
        errorRef.current(null);
        statusRef.current("success");
        setTotalPages(dataJSON.total_pages);
      })

      .catch((err) => {
        dataRef.current(null);
        errorRef.current(err.message);
        statusRef.current("error");
      });
  },[])

  useEffect(()=> {
    fetch(`https://www.swapi.tech/api/planets?page=${currentPage}&limit=10`)
      .then((res)=> {
        return res.json();
      })

      .then((dataJSON)=> {
        dataRef.current(dataJSON);
      })

      .catch((err) => {
        dataRef.current(null);
        errorRef.current(err.message);
        statusRef.current("error");
      });
  }, [currentPage])

  return <>
    <header className="header" style={{fontSize: '30px', fontWeight: 'bold'}}>PLANETS LIST:</header>

    <main style={{marginBottom: '20px'}}>
      <div className="planets" style={{ textAlign: "center", margin: '0 auto' }}>
        {status === "initial" || status === "loading" ? (
          <div className="planets__loading" style={{ color: "blue", textAlign: "center", marginLeft: '450px' }}>
            <Plane arialLabel="loading-indicator" />
          </div>
        ) : status === "success" ? (
          <div className="planets__list" style={{ textAlign: "center", margin: '0 auto',  marginTop: '60px'}}>
            <PlanetsList data={data}/>
          </div>
        ) : (
          <p className="planets__error" style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        )}
      </div>
    </main>

    <footer className="footer">
      {status === 'success' && renderLinkToPages(totalPages)}
    </footer>
  </>
}