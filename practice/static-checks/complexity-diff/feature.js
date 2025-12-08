export function richFeature(items) {
  let total = 0;
  for (const item of items) {
    if (!item || !item.value) continue;
    for (let i = 0; i < item.value; i++) {
      if (i % 2 === 0) {
        total += i * 2;
      } else if (i % 3 === 0) {
        total += i + 5;
      } else {
        for (let j = 0; j < 3; j++) {
          total += j;
        }
      }
    }
  }
  if (total > 1000) {
    return { status: 'large', total };
  }
  const result = items.map((item) => ({
    id: item?.id,
    score: total + (item.value ?? 0),
  }));
  return result;
}

export const nestedHelper = (text) => {
  const pieces = text.split(',');
  return pieces.reduce((acc, piece) => acc + piece.trim().length, 0);
};
