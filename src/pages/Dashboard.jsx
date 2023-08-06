import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const filteredOrders = mockData.results.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectOrder = (orderId, orderDetails, orderTimestamps) => {
    setSelectedOrderDetails(orderDetails);
    setSelectedOrderTimeStamps(orderTimestamps);
  };

  const rowsWithSubmittedDate = filteredOrders.map((row) => {
    const matchingTimestamp = timestamps.results.find(
      (timestamp) => timestamp["&id"] === row["&id"]
    );
    const orderSubmitted = matchingTimestamp
      ? matchingTimestamp.timestamps.orderSubmitted
      : "N/A";

    return {
      ...row,
      orderSubmitted,
    };
  });

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={mockData.results.length}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          rows={rowsWithSubmittedDate}
          selectedCurrency={currency}
          onOrderSelect={handleSelectOrder}
        />
      </div>
    </div>
  );
};

export default Dashboard;
