import React from 'react'

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

      </section>
    </div>
  )
}

