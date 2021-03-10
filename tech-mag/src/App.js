import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [myData, setMyData] = useState(undefined);
  const [dataNeeded, setDataNeeded] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  console.log(apiKey);

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
      <div>
        {myData !== undefined ? (
          myData.articles.map((article, i) => (
            <ul key={i}>
              <li>{article.author}</li>
              <li>{article.title}</li>
              <li>{article.content}</li>
              <li>------------------------------</li>
            </ul>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
