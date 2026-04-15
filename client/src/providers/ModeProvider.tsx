import React, { createContext, useState } from "react";

interface ThemeContextType {
  theme: string,
  toggleTheme: null | (() => void)
}

const defaultContext: ThemeContextType = { theme: 'light', toggleTheme: null }
export const ThemeContext = createContext<ThemeContextType>(defaultContext);


function ModeProvider({ children }: { children: React.ReactNode }) {
  const [currTheme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => {
      if (prev === 'light') {
        return 'dark'
      } else {
        return 'light'
      }
    })
  }

  return <ThemeContext.Provider value={{theme: currTheme, toggleTheme}}>
    <div id="app" className={ currTheme === 'dark' ? 'dark' : ''}>
      {children}
    </div>
  </ThemeContext.Provider>
}

export default ModeProvider;