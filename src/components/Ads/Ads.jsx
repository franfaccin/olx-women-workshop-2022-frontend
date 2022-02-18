import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Menu } from "antd";
import { DeleteFilled, DownOutlined } from "@ant-design/icons";
import "./Ads.css";

const { Meta } = Card;

const SORT = {
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
  TITLE_ASC: "TITLE_ASC",
  AD_ID_DESC: "AD_ID_DESC",
};

const SortButton = ({ onSortBy = () => {} }) => {
  const menu = (
    <Menu>
      <Menu.Item key={SORT.PRICE_ASC} onClick={() => onSortBy(SORT.PRICE_ASC)}>
        Price lower first
      </Menu.Item>
      <Menu.Item
        key={SORT.PRICE_DESC}
        onClick={() => onSortBy(SORT.PRICE_DESC)}
      >
        Price higher first
      </Menu.Item>
      <Menu.Item key={SORT.TITLE_ASC} onClick={() => onSortBy(SORT.TITLE_ASC)}>
        Title asc.
      </Menu.Item>
      <Menu.Item
        key={SORT.AD_ID_DESC}
        onClick={() => onSortBy(SORT.AD_ID_DESC)}
      >
        Ad id asc.
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button>
        Sort <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const Ads = (props) => {
  const { ads = [], onDeleteAd = () => {} } = props;
  // const [sortedAds, setSortedAds] = useState(ads);
  // const [sortType, setSortType] = useState(SORT.AD_ID_DESC);

  // useEffect(() => {
  //   if (!ads.length) return;

  //   switch (sortType) {
  //     case SORT.PRICE_ASC: {
  //       const copyAds = [...ads];
  //       copyAds.sort((a, b) => {
  //         if (a.price < b.price) {
  //           return -1;
  //         } else if (a.price > b.price) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //       setSortedAds(copyAds);
  //       break;
  //     }
  //     case SORT.AD_ID_DESC:
  //     default: {
  //       const copyAds = [...ads];
  //       copyAds.sort((a, b) => {
  //         if (a.id < b.id) {
  //           return -1;
  //         } else if (a.id > b.id) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //       setSortedAds(copyAds);
  //       break;
  //     }
  //   }
  // }, [sortType, ads]);

  // const handleOnSortBy = (sortType) => {
  //   setSortType(sortType);
  // };

  return (
    <>
      <h2>All Ads</h2>

      {/* <SortButton onSortBy={handleOnSortBy} /> */}

      <ul className="list__ads">
        {ads?.map((ad) => {
          // {sortedAds?.map((ad) => {
          return (
            <li key={ad.id}>
              <Card
                style={{ width: 240 }}
                cover={
                  ad.ad_image ? <img alt="example" src={ad.ad_image} /> : null
                }
                actions={[
                  <DeleteFilled
                    key={"delete-ad"}
                    onClick={() => onDeleteAd(ad.id)}
                  />,
                ]}
              >
                <Meta title={ad.title} description={ad.description} />
                <p>Price: {ad.price}</p>
                <p>ID: {ad.id}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Ads;
