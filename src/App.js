import "./App.css";
import PostingForm from "./components/PostingForm/PostingForm";
import { useEffect, useState } from "react";
import Ads from "./components/Ads/Ads";
import config from "./config";

function App() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAllAds();
  }, []);

  const fetchAllAds = () => {
    fetch(config.api_ads)
      .then((res) => res.json())
      .then((response) => setAds(response.data))
      .catch((err) => console.error(err));
  };

  const handleOnPostAd = () => {
    fetchAllAds();
  };

  const handleOnDelete = (adId) => {
    if (!adId) {
      return;
    }
    fetch(`${config.api_ads}/${adId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((response) => fetchAllAds())
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mini OLX</h1>
      </header>
      <main>
        <PostingForm onPostAd={handleOnPostAd} />
        <hr />
        <Ads ads={ads} onDeleteAd={handleOnDelete} />
      </main>
    </div>
  );
}

export default App;
