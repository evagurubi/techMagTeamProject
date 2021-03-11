import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [myData, setMyData] = useState([]);
  const [pageCounter, setPageCounter] = useState(1);

  const apiKey = process.env.REACT_APP_API_KEY;
  let dateToday = new Date().toISOString().slice(0, 19);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=technology&to=${dateToday}&sortBy=publishedAt&pageSize=9&page=${pageCounter}&apiKey=${apiKey}`
    )
      .then((response) => {
        if (response.status !== 200) return "It is still loading.";
        return response.json();
      })
      .then((data) => setMyData([...myData, ...data.articles]));
    console.log("Mounted");
  }, [pageCounter]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return function cleanup() {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [pageCounter]);

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      let newPage = pageCounter;
      newPage++;
      setPageCounter(newPage);
    }
  };

  return (
    <div className="App">
      <nav className="nav-container">
        <button onClick={() => setPageCounter(pageCounter + 1)}>Data</button>
      </nav>
      <div className="container">
        {myData.length !== 0 ? (
          myData.map((article, i) => (
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
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
