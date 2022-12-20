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

    // place 0 for a lazy user
    if (value === "." && displayScreen.displayValue === "" || value === "." &&  displayScreen.displayValue === "-") {
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
    const {id, value} = event.target

    function setTemplate() {
      const lastSymbol = displayScreen.displayLine[displayScreen.displayLine.length-1];

      // if last symbol is number allow function
      if (/\d/.test(lastSymbol)) {
        setDisplayScreen(prevState => ({
          displayLine: prevState.displayLine + value,
          displayValue: ""
        }))
      }
      // if last symbol is nut a number but displayValue is empty and pressed function is "-"
      else if (displayScreen.displayValue === "" && value === "-") {
        setDisplayScreen(prevState => ({
          displayLine: prevState.displayLine + value,
          displayValue: value
        }))
      }
    }

    switch (value) {
      case "-":
        setTemplate()
      /*
        setDisplayScreen(prevState => ({
          displayLine: prevState.displayLine + value,
          displayValue: prevState.displayValue.length > 0 ? "" : value
        }))
      */

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

