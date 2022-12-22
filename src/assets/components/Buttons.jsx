import React from "react";

export default function Buttons(props) {

    const {initialScreenState, displayScreen, setDisplayScreen, initialResultData, resultData, setResultData} = props

    const lastOfDisplayLine = displayScreen.displayLine[displayScreen.displayLine.length -1]
    const secondToLastOfDisplayLine = displayScreen.displayLine[displayScreen.displayLine.length -2]
    

    function handleNumbers(event) {
        const value = event.target.value

        if (displayScreen.displayLine.includes("=")) {
            setDisplayScreen({
                displayLine: value,
                displayValue: value
            })
            setResultData(initialResultData)
        }
        else {

            if (/\+|\-|\*|\//.test(lastOfDisplayLine)) {
                setDisplayScreen(prevData => ({
                    displayLine: value === "." ? 
                        prevData.displayLine + "0" + value :
                        prevData.displayLine + value,
    
                    displayValue: value === "." ? 
                        "0" + value :
                        value
                }))
            }
            // not decimal point was pressed
            else  if (value !== ".") { 
                setDisplayScreen(prevData => ({
                    displayLine: displayScreen.displayValue === "0" ?
                        value :
                        prevData.displayLine + value,
    
                    displayValue: displayScreen.displayValue === "0" ?
                        value : 
                        prevData.displayValue + value
                }))
            }
            // decimal point was pressed
            else if (displayScreen.displayValue.includes(".") === false) {
                setDisplayScreen(prevData => ({
                    displayLine: prevData.displayLine + value,
                    displayValue: prevData.displayValue + value
                }))
            }
        }
    }

    function handleFunctions(event) {
        const {id, value} = event.target
        
        function functionsTempalte() {
            // if function was called imediatly after getting result
            if (displayScreen.displayLine.includes("=")) {
                setDisplayScreen({
                    displayLine: resultData.result + value,
                    displayValue: value
                })
                setResultData(initialResultData)
            }
            // handle minus 
            if (value === "-") {
                // initial value set to negative
                if (displayScreen.displayLine === "0") {
                    setDisplayScreen({
                        displayLine: value,
                        displayValue: value
                    })
                }
                else if (displayScreen.displayLine.includes("-") && !/\+|\-|\*|\//.test(secondToLastOfDisplayLine)) {
                console.log("it is me")
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine + value,
                        displayValue: value
                    }))
                }
                // if last symbol is a function and second to last is not - allow to put negative sign next
                else if (/\+|\-|\*|\//.test(lastOfDisplayLine) && !/\+|\-|\*|\//.test(secondToLastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine + value,
                        displayValue: value
                    }))
                }
                else if (!/\+|\-|\*|\//.test(lastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: resultData.result !== "" ?
                            resultData.result + value :
                            prevData.displayLine === "0" ? 
                                value : 
                                prevData.displayLine + value,

                        displayValue: value                           
                    }))
                }
            }
            // handle other function signs
            else {
                // change the fucntion sign if last symbol is a function sign and secont to last is not
                // do not allowing to change negative signs at the start of displayLine
                if (displayScreen.displayLine !== "-" && /\+|\-|\*|\//.test(lastOfDisplayLine) && !/\+|\-|\*|\//.test(secondToLastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine.slice(0, -1) + value,
                        displayValue: prevData.displayValue.slice(0, -1) + value
                    }))
                }
                // just to pass "5 * - + 5 === 10" not sure why would calculator remove first two signs
                else if (lastOfDisplayLine === "-" && /\+|\-|\*|\//.test(secondToLastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine.slice(0, -2) + value,
                        displayValue: value
                    }))
                }
                else if (!/\+|\-|\*|\//.test(lastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: resultData.result !== "" ?
                            resultData.result + value :
                            prevData.displayLine === "0" ? 
                                value : 
                                prevData.displayLine + value,

                        displayValue: value                           
                    }))
                }
            }

        }

        
        switch (id) {
            case "delete":
                if (displayScreen.displayValue !== "0") {                 
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine.length === 1 ? "0" : prevData.displayLine.slice(0, -1),
                        displayValue: prevData.displayValue.length === 1 ? "0" : prevData.displayValue.slice(0, -1)
                      }))
                }
            break
            case "clear":
                setDisplayScreen(initialScreenState)
                setResultData(initialResultData)
            break;

            case "add":
                functionsTempalte()
            break;

            case "subtract":
                functionsTempalte()
            break;

            case "multiply":
                functionsTempalte()
            break;

            case "divide":
                functionsTempalte()
            break;

            case "equals": 
                function stringToMath(str) {
                    return parseFloat(Function(`return (${str})`)().toFixed(4))
                }
                setResultData(prevData => ({
                    ...prevData,
                    result: stringToMath(displayScreen.displayLine)
                }))
                setDisplayScreen(prevState => ({
                    displayLine: prevState.displayLine + `=${stringToMath(displayScreen.displayLine)}`,
                    displayValue: stringToMath(displayScreen.displayLine)
                }))
            /*
                //const url = "http://api.mathjs.org/v4/?expr=" + displayScreen.displayLine.replaceAll("+", "%2B").replaceAll("/", "%2F")
                fetch(resultData.url).then(resp => resp.json()).then(data => {
                    console.log("data: "+ data)
                    setResultData(prevData => ({
                        ...prevData,
                        result: data
                    }))
                    setDisplayScreen(prevState => ({
                        displayLine: prevState.displayLine + `=${data}`,
                        displayValue: data
                    }))
                })
            */
            break;
        }

    }
    const {buttonData} = props
    return (
        <section className="button-grid">
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
                        className={button.value === "" ? "functional-key fa-solid fa-delete-left" : "functional-key"}
                        onClick={handleFunctions}
                      >{button.value}</button>
            })
          )
        }
      </section>
    )
}
