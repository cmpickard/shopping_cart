import React, { createContext, useState } from "react";

interface CurrencyContextType {
  currency: string
  toggleCurrency: (() => void) | null
}

const defaultContext: CurrencyContextType = { currency: 'USD',
                                              toggleCurrency: null };

export const CurrencyContext = createContext<CurrencyContextType>(defaultContext);

function CurrencyProvider({children}: {children: React.ReactNode}) {
  const [currency, setCurrency] = useState('USD');

  function toggleCurrency() {
    setCurrency((prev) => {
      if (prev === 'USD') {
        return 'EUR'
      } else {
        return 'USD'
      }
    });
  }

  return (
  <CurrencyContext.Provider value={{currency, toggleCurrency}}>
    {children}
  </CurrencyContext.Provider>)
}

export default CurrencyProvider;