const countStarsAndReviews = (reviewsMetaData) => {
  if (!reviewsMetaData) {
    return {
      stars: 0,
      reviews: 0,
    };
  }
  let stars = 0;
  let reviews = 0;
  const reviewData = Object.entries(reviewsMetaData); // [1, x1], [2, x2], ...
  for (let i = 0; i < reviewData.length; i += 1) {
    stars += Number(reviewData[i][0]) * reviewData[i][1];
    reviews += Number(reviewData[i][1]);
  }
  return {
    stars,
    reviews,
  };
};

export default countStarsAndReviews;
