// Maps a 1-5 rating onto a roast-degree gradient, light (cinnamon) to dark
// (French roast) - the signature visual cue that runs down the left edge
// of every brew card.
const ROAST_STOPS = {
  1: ["#e8c98a", "#c9a35f"],
  2: ["#d9ac6b", "#b1793a"],
  3: ["#c08a4a", "#8f5a2a"],
  4: ["#9c6234", "#63391b"],
  5: ["#6b3c1f", "#2e1a0d"],
};

export function getRoastGradient(rating) {
  const stops = ROAST_STOPS[rating] || ROAST_STOPS[3];
  return { "--roast-a": stops[0], "--roast-b": stops[1] };
}

export function ratingLabel(rating) {
  const labels = {
    1: "Rough cup",
    2: "Drinkable",
    3: "Solid",
    4: "Great cup",
    5: "Best yet",
  };
  return labels[rating] || "";
}
