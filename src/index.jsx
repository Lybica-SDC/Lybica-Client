import React from 'react';
import './styles.css';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { ProductProvider } from './contexts/ProductContext';

const container = document.createElement('div');
container.setAttribute('id', 'root');
document.body.appendChild(container);
const root = createRoot(container);

root.render(
  <ProductProvider>
    <App />
  </ProductProvider>,
);
