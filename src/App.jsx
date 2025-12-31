import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ProductionPortfolio from './PortfolioWebsite';

function App() {
  return (
    <ErrorBoundary>
      <ProductionPortfolio />
    </ErrorBoundary>
  );
}

export default App;