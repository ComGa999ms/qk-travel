export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const duplicatePrizes = (prizes) => {
  let maxId = Math.max(...prizes.map((p) => p.id), 0);
  const cloned = prizes.map((p) => ({ ...p, id: ++maxId }));
  return [...prizes, ...cloned];
};
