import { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";
const axios = require("axios");

function App() {
  const [myData, setMyData] = useState([]);
  const [pageCounter, setPageCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIntro(false);
      setPageCounter(1);
    }, 8500);
  }, []);

  //  useEffect(() => {
  //  	fetch(`http://localhost:5000/`)
  //  		.then((response) => {
  //  			response.text()
  //  		})
  //  		.then((data) =>
  //  		)
  //  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/?page=${pageCounter}`, {
        withCredentials: true,
      })
      .then((response) => {
        return setMyData([...myData, ...response.data]);
      });
  }, [pageCounter]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return function cleanup() {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [pageCounter]);

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setLoading(true);

      setTimeout(() => {
        let newPage = pageCounter;
        newPage++;
        setLoading(false);
        setPageCounter(newPage);
      }, 3000);
    }
  };

  return (
    <div className="App">
      <nav className="nav-container">
        <h1>🦡BADGER NEWS</h1>
      </nav>
      {intro === true && <Loading />}
      <div className="container">
        {myData.length !== 0
          ? myData.map((article, i) => (
              <div className="card" key={i}>
                <div className="card-content">
                  <h5>{article.author}</h5>
                  <h2>{article.title}</h2>
                  <img className="images" src={article.urlToImage} alt="IMG" />
                  <p>{article.description}</p>
                  <p>{article.publishedAt.slice(0, 10)}</p>

                  <a className="link" href={article.url} target="_blank">
                    Link to article
                  </a>
                </div>
              </div>
            ))
          : ""}
      </div>
      {loading === true && pageCounter > 1 && <Loading />}
    </div>
  );
}

export default App;
