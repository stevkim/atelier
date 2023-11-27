const countStarsAndReviews = (product) => {
  let stars = 0;
  let reviews = 0;
  const reviewData = Object.entries(product.reviews); // [1, x1], [2, x2], ...

  for (let i = 0; i < reviewData.length; i += 1) {
    stars += Number(reviewData[i][0]) * Number(reviewData[i][1]);
    reviews += Number(reviewData[i][1]);
  }

  return {
    stars,
    reviews,
  };
};

export default countStarsAndReviews;
