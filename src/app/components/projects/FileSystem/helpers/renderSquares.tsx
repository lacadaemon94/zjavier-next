import React from "react";

// Set the types for your square styles
type SquareProps = {
  className: string;
};

const FilledSquare: React.FC<SquareProps> = ({ className }) => (
  <div className={className} />
);
const EmptySquare: React.FC<SquareProps> = ({ className }) => (
  <div className={className} />
);

export const renderSquares = (
  percentageString: string,
  filledSquareClass: string,
  emptySquareClass: string
) => {
  const percentage = parseInt(percentageString, 10); // Parse the percentage from string to number
  const totalSquares = 5; // 100% / 20% = 5 squares
  const filledSquares = Math.round(percentage / 20); // Number of filled squares
  const emptySquares = totalSquares - filledSquares; // Number of empty squares

  // Generate filled squares
  const filled = Array(filledSquares).fill(null).map(
    (_, index) => <FilledSquare className={filledSquareClass} key={`filled-${index}`} />);

  // Generate empty squares
  const empty = Array(emptySquares).fill(null).map(
    (_, index) => <EmptySquare className={emptySquareClass} key={`empty-${index}`} />
  );

  // Combine and return them
  return [...filled, ...empty];
};
