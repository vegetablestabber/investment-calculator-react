import styles from "./Table.module.css";

const Table = (props) => {
  const tableContent = props.data.map((datum) => {
    return (
      <tr>
        <td>{datum.year}</td>
        <td>{datum.savingsEndOfYear.toFixed(2)}</td>
        <td>{datum.yearlyInterest.toFixed(2)}</td>
        <td>{datum.totalInterest.toFixed(2)}</td>
        <td>{datum.totalContribution}</td>
      </tr>
    );
  });

  return (
    <>
      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {props.data.length === 0 && (
        <h2 style={{ textAlign: "center" }}>No data available.</h2>
      )}
      {props.data.length > 0 && (
        <table className={styles.result}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Savings</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      )}
    </>
  );
};

export default Table;
