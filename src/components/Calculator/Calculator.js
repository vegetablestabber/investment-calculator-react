import { useState } from "react";

import styles from "./Calculator.module.css";

const Calculator = (props) => {
  const [userInput, setUserInput] = useState({
    "current-savings": "",
    "yearly-contribution": "",
    "expected-return": "",
    duration: ""
  });

  const currentSavingsChangeHandler = (event) => {
    setUserInput((prevInput) => {
      return { ...prevInput, "current-savings": event.target.value };
    });
  };

  const yearlyContributionChangeHandler = (event) => {
    setUserInput((prevInput) => {
      return { ...prevInput, "yearly-contribution": event.target.value };
    });
  };

  const expectedReturnChangeHandler = (event) => {
    setUserInput((prevInput) => {
      return { ...prevInput, "expected-return": event.target.value };
    });
  };

  const durationChangeHandler = (event) => {
    setUserInput((prevInput) => {
      return { ...prevInput, duration: event.target.value };
    });
  };

  const calculate = (input) => {
    const data = [];
    let totalSavings = input.currentSavings;
    let totalInterest = 0;
    let totalContribution = 0;

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < input.duration; i++) {
      const yearlyInterest = input.currentSavings * input.expectedReturn;
      totalInterest += yearlyInterest;
      totalSavings += yearlyInterest + input.yearlyContribution;
      totalContribution += input.yearlyContribution;

      data.push({
        // feel free to change the shape of the data pushed to the array!
        key: i + 1,
        year: i + 1,
        yearlyInterest: yearlyInterest,
        totalInterest: totalInterest,
        savingsEndOfYear: totalSavings,
        yearlyContribution: input.yearlyContribution,
        totalContribution: totalContribution
      });
    }

    return data;
  };

  // Should be triggered when form is submitted
  const submitHandler = (event) => {
    event.preventDefault();

    // per-year results
    const yearlyData = calculate({
      duration: +userInput["duration"],
      yearlyContribution: +userInput["yearly-contribution"],
      expectedReturn: +userInput["expected-return"] / 100,
      currentSavings: +userInput["current-savings"]
    });

    // do something with yearlyData ...
    props.onSubmit(yearlyData);
  };

  const resetHandler = (event) => {
    event.preventDefault();

    setUserInput({
      "current-savings": "",
      "yearly-contribution": "",
      "expected-return": "",
      duration: ""
    });

    props.onSubmit([]);
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitHandler}
      onReset={resetHandler}
    >
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            value={userInput["current-savings"]}
            onChange={currentSavingsChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={userInput["yearly-contribution"]}
            onChange={yearlyContributionChangeHandler}
          />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            value={userInput["expected-return"]}
            onChange={expectedReturnChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={userInput["duration"]}
            onChange={durationChangeHandler}
          />
        </p>
      </div>
      <p className={styles.actions}>
        <button type="reset" className={styles.buttonAlt}>
          Reset
        </button>
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default Calculator;
