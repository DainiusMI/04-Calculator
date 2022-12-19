import React from 'react'
import data from './data'

import buttonData from "./data"

export default function App() {

  const [displayScreen, setDisplayScreen] = React.useState({
    fullLine: "",
    currentValue: ""
  })
  console.log(buttonData.numeric)
  return (
    <div className="App">
    
      <section id="display" className="screen-container"> 
        <p className="fullLine">{displayScreen.fullLine}</p>
        <p className="currentValue">{displayScreen.currentValue}</p>
      </section>

      <section className="button-container">
        {
          buttonData.numeric.map(button => {
            return <button  
                      key={button.id}
                      id={button.id}
                      className="" 
                    >{button.value}</button>
          }).concat(
            buttonData.functional.map(button => {
              return <button
                        key={button.id}
                        id={button.id}
                        className
                      >{button.value}</button>
            })
          )  
        }
      </section>
    </div>
  )
}

