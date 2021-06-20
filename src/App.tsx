import "./App.css";
import Phases from "./components/phases/phases";
import Product from "./components/product/product";
import Payment from "./components/payment/payment";
import Summary from "./components/summary/summary";
import Confirmation from "./components/confirmation/confirmation";

import { useState } from "react";

const App = () => {
  const [phase, setPhase] = useState<number>(1);
  const [configPrices, setConfigPrices] = useState();
  const [totalprice, setTotalPrice] = useState<number>(100);

  return (
    <div className="card mt-50 mb-50">
      <Phases phaseNumber={phase} />
      <Summary totalPrice={totalprice} config={configPrices} />
      {phase === 1 && (
        <Product
          nextPhase={() => {
            setPhase(2);
          }}
          priceCalculation={(totalprice) => {
            setTotalPrice(totalprice);
          }}
          changeConfig={(values) => {
            setConfigPrices(values);
          }}
        ></Product>
      )}
      {phase === 2 && (
        <Payment
          nextPhase={() => {
            setPhase(3);
          }}
          previousPhase={() => {
            setPhase(1);
          }}
        />
      )}
      {phase === 3 && (
        <Confirmation
          previousPhase={() => {
            setPhase(2);
          }}
        />
      )}
    </div>
  );
};

export default App;
