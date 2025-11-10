import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const defaultTheme = 'light';

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || defaultTheme
    });




  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))    
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)

    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])

  const value ={
    theme,
    toggleTheme
  }

  return <ThemeContext.Provider value ={ value }>{ children }</ThemeContext.Provider>

}

export const useTheme = () => {
    return useContext(ThemeContext)
}