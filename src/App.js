import "./App.css";
// import "antd/dist/antd.css";
import PostingForm from "./components/PostingForm/PostingForm";
import { useState } from "react";
import Ads from "./components/Ads/Ads";
import config from "./config";

function App() {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "test",
      price: 1.99,
      description: "some description",
      ad_image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F5e7f4209-3445-4dbd-9a75-cdef79be964d_1.ad1eb253c94c17caed62c3f033a6300f.jpeg&f=1&nofb=1",
    },
    {
      id: 2,
      title: "test fsdfds ",
      price: 1.22,
      description: "some description usgdjakhsdgkhjasdg",
      ad_image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F5e7f4209-3445-4dbd-9a75-cdef79be964d_1.ad1eb253c94c17caed62c3f033a6300f.jpeg&f=1&nofb=1",
    },
  ]);

  const fetchAllAds = () => {
    fetch(config.api_base)
      .then((res) => res.json())
      .then((response) => setAds(response))
      .catch((err) => console.error(err));
  };

  const handleOnPostAd = () => {
    fetchAllAds();
  };

  const handleOnDelete = (adId) => {
    if (!adId) {
      return;
    }
    fetch(`${config.api_base}/${adId}`, { method: "DELETE" })
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
        <PostingForm onPostAdd={handleOnPostAd} />
        <hr />
        <Ads ads={ads} onDeleteAd={handleOnDelete} />
      </main>
    </div>
  );
}

export default App;
