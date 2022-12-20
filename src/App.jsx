import React from 'react'
//import data from './data'
import "./assets/styles/css/index.css"
import buttonData from "./data"

export default function App() {

  const [displayScreen, setDisplayScreen] = React.useState({
    displayLine: "",
    displayValue: ""
  })

  function handleNumbers(event) {
    const value = event.target.value

    if (value === "." && displayScreen.displayValue.length === 0) {
      setDisplayScreen(prevState => ({
        displayLine: prevState.displayLine + 0 + value,
        displayValue: prevState.displayValue + 0 + value
      }))
    }
    else {
      setDisplayScreen(prevState => ({
        displayLine: prevState.displayLine + value,
        displayValue: prevState.displayValue + value
      }))
    }
  }

  function handleFunctions(event) {
    const value = event.target.value

    function setTemplate() {
      const lastSymbol = displayScreen.displayLine[displayScreen.displayLine.length-1];

      if (/\d/.test(lastSymbol)) {

        setDisplayScreen(prevState => ({
          displayLine: prevState.displayLine + value,
          displayValue: ""
        }))

      }

    }
    switch (value) {
      case "-":
        setDisplayScreen(prevState => ({
          displayLine: prevState.displayLine + value,
          displayValue: prevState.displayValue.length > 0 ? "" : value
        }))
        break;
      case "+":
        setTemplate()
        break;
      case "/":
        setTemplate()
        break;
      case "*":
        setTemplate()
        break;
      case "=":

        break;
    }
  }




  return (
    <div className="App">
    
      <section id="display" className="screen-container"> 
        <p 
          className="displayLine"

        >{displayScreen.displayLine}</p>

        <p 
          className="displayValue"
        >{displayScreen.displayValue}</p>
      </section>

      <section className="button-container">
        {
          buttonData.numeric.map(button => {
            return <button  
                      key={button.id}
                      id={button.id}
                      value={button.value}
                      className="numeric-key" 
                      onClick={handleNumbers}
                    >{button.value}</button>
          }).concat(
            buttonData.functional.map(button => {
              return <button
                        key={button.id}
                        id={button.id}
                        value={button.value}
                        className="functional-key"
                        onClick={handleFunctions}
                      >{button.value}</button>
            })
          )
        }
      </section>
    </div>
  )
}

