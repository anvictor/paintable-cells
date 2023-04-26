import React from "react";

const ResultStatus = ({ data }) => {
  const reduce = (array) => {
    let result = "";
    let chainStart = null;
    let sumOfDots = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== null) {
        sumOfDots++;

        if (chainStart === null) {
          chainStart = array[i];
        }

        if (i === array.length - 1 || array[i + 1] === null) {
          if (chainStart !== array[i]) {
            result += `from ${chainStart} to ${array[i]}; `;
          } else {
            result += `${chainStart}; `;
          }
          chainStart = null;
        }
      }
    }

    result += `total = ${sumOfDots} hours`;

    return result;
  };

  return (
    <>
      {data && (
        <div id="adStatus">
          {data.map((day) => {
            const title = day[0];
            const time = day.slice(1);
            const reducedTime = reduce(time);
            // day.shift();
            return (
              <p key={title}>
                {title}
                {": "}
                {reducedTime}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ResultStatus;
