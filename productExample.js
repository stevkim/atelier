product = {
  product_id: Number,
  title: String,
  category: String,
  reviews: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  },
  overview: {
    slogan: String,
    features: [
      feature: String,
      value: String,
    ], // ...
  },
  styles: [
    {
      style_id: Number,
      name: String,
      original_price: Number,
      sale_price: Number,
      default?: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        }, ...
      ]
      skus: { // WHY would we do it this way? This should be an array!
        Number: {
          quantity: Number,
          size: String,
        }, // ...
      }
    }, // ...
  ]
}