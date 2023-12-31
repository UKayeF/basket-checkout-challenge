import React from 'react';
import './App.css';
import ProductListView from "./components/ProductListView";
import {useAppSelector} from "./hooks";
import CheckoutView from "./components/CheckoutView";

function App() {
    const currentView = useAppSelector(
        state => state.navigation.location
    )
  return (
    <div className="App">
        {
            currentView === 'Checkout' && <CheckoutView/>
        }
        {
            currentView === 'Listing' && <ProductListView/>
        }
    </div>
  );
}

export default App;
