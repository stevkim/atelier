import React from 'react';
import Overview from './components/overview/Overview.jsx';
import product from './components/overview/product-example.js';

const App = () => {
  return (
    <div>
      <Overview product={product} />
    </div>
  )
}

export default App;