import React from "react";

interface ConditionalFormatterProps {
  value: number;
}

const ConditionalFormatter: React.FC<ConditionalFormatterProps> = ({ value }) => {
  let backgroundColor = "";

  if (value >= 40) {
    backgroundColor = "green";
  } else if (value >= 10) {
    backgroundColor = "yellow";
  } else if (value > 5) {
    backgroundColor = "orange";
  } else {
    backgroundColor = "red";
  }

  return (
    <div style={{ backgroundColor, padding: "5px", textAlign: "center" }}>
      {value.toFixed(2)}%
    </div>
  );
};

export default ConditionalFormatter;
