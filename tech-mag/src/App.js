import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [myData, setMyData] = useState(undefined);
  const [dataNeeded, setDataNeeded] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=Apple&from=2021-03-08&sortBy=popularity&apiKey=${apiKey}`
    )
      .then((response) => {
        if (response.status !== 200) return "It is still loading.";
        return response.json();
      })
      .then((data) => setMyData(data));
  }, [dataNeeded]);

  return (
    <div className="App">
      <button onClick={() => setDataNeeded(!dataNeeded)}>Data</button>
      <div className="container">
        {myData !== undefined ? (
          myData.articles.map((article, i) => (
            <div className="card" key={i}>
              <h5>{article.author}</h5>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              <p>------------------------------</p>
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
