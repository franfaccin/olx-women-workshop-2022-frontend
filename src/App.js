import "./App.css";
import PostingForm from "./components/PostingForm/PostingForm";
import { useEffect, useState } from "react";
import Ads from "./components/Ads/Ads";
import config from "./config";
import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

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
    <Layout>
      <Header>
        <Title className="header__title">Mini OLX</Title>
      </Header>
      <Content>
        <div className="App">
          <header className="App-header"></header>
          <main>
            <PostingForm onPostAd={handleOnPostAd} />
            <Divider />
            <Ads ads={ads} onDeleteAd={handleOnDelete} />
          </main>
        </div>
      </Content>
      <Footer>Franciele @ OLX Workshop ©2022</Footer>
    </Layout>
  );
}

export default App;
