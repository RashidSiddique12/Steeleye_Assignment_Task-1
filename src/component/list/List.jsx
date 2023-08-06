import React from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import styles from "./List.module.css";
import timestamps from "../../assets/timeStamps.json";

const List = ({ rows, selectedCurrency, onOrderSelect }) => {
  const rowsWithSubmittedDate = rows.map((row) => {
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
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {selectedCurrency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rowsWithSubmittedDate.map((row, index) => (
          <ListRow
            key={index}
            onClick={() =>
              onOrderSelect(row["&id"], row, rowsWithSubmittedDate)
            }
          >
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{row.orderSubmitted}</ListRowCell>
            <ListRowCell>
              {row.bestExecutionData.orderVolume[selectedCurrency]}
            </ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
