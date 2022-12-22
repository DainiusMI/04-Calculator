import React from "react";

export default function Buttons(props) {

    const {initialScreenState, displayScreen, setDisplayScreen, initialResultData, resultData, setResultData} = props
    const {displayValue} = displayScreen;
    const firstSymbol = displayScreen.displayValue[0];
    const secondSymbol = displayScreen.displayValue[1];
    const lastSymbol = displayScreen.displayLine[displayScreen.displayLine.length-1];
    const secondToLastSymbol = displayScreen.displayLine[displayScreen.displayLine.length-2];

    const lastOfDisplayLine = displayScreen.displayLine[displayScreen.displayLine.length -1]
    const secondToLastOfDisplayLine = displayScreen.displayLine[displayScreen.displayLine.length -2]
    
    const [displaySymbols, setDisplaySymbols] = React.useState()
    React.useEffect(() => {
        setDisplaySymbols({
            first: displayScreen.displayValue[0] || "",
            second: displayScreen.displayValue[1] || "",
            secondToLast: displayScreen.displayValue[displayScreen.displayValue.length -2] || "",
            last: displayScreen.displayValue[displayScreen.displayValue.length -1] || ""
        })
    }, [displayScreen.displayValue])



    function handleNumbers(event) {
        const value = event.target.value

        function setTemplate() {
            setDisplayScreen(prevData => ({
                displayLine: prevData.displayLine + value,
                displayValue: prevData.displayValue + value
            }))
        }

        if (/\+|\-|\*|\//.test(lastOfDisplayLine)) {
                setDisplayScreen(prevData => ({
                    displayLine: prevData.displayLine + value,
                    displayValue: value
                }))
        }
        /*
        if ( /\+|\-|\*|\//.test(displayScreen.displayValue)) {
            console.log("tic")
            setDisplayScreen(prevData => ({
                displayLine: displayScreen.displayLine === "0" ? value : prevData.displayLine + value,
                displayValue: value
            }))
        }
        */
        // not decimal point was pressed
        else  if (value !== ".") { 
            if (displayScreen.displayValue === "0") {
                setDisplayScreen({
                    displayLine: value,
                    displayValue: value
                })
            }
            else {
                setTemplate()
            }
        }
        // decimal point was pressed
        else {
            if (displayScreen.displayValue.includes(".") === false) {
                setTemplate()
            }
        }

    }



    function handleFunctions(event) {
        const {id, value} = event.target

        function setTemplate() {
            setDisplayScreen(prevData => ({
                displayLine: prevData.displayLine + value,
                displayValue: prevData.displayValue + value
            }))
        }
        
        function functionsTempalte() {

            // handle minus 
            if (value === "-") {
                if (displayScreen.displayLine === "0") {
                    setDisplayScreen({
                        displayLine: value,
                        displayValue: value
                    })
                }
                // if last symbol is a function and second to last is not allow to put negative sign next
                else if (/\+|\-|\*|\//.test(lastOfDisplayLine) && !/\+|\-|\*|\//.test(secondToLastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine + value,
                        displayValue: prevData.displayValue + value
                    }))
                }
                else if (!/\+|\-|\*|\//.test(lastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine === "0" ? 
                           // prevData.displayValue + value : 
                            value : 
                            prevData.displayLine + value,
                        displayValue: value
                    }))
                }
            }
            // handle other function signs
            else {
                // change the fucntion sign if last symbol is a function sign and secont to last is not
                // do not allowing to change negative signs in front of displayLine
                if (displayScreen.displayLine !== "-" && /\+|\-|\*|\//.test(lastOfDisplayLine) && !/\+|\-|\*|\//.test(secondToLastOfDisplayLine)) {
                    setDisplayScreen(prevData => ({
                        displayLine: prevData.displayLine.slice(0, -1) + value,
                        displayValue: prevData.displayValue.slice(0, -1) + value
                    }))
                }

                else if (!/\+|\-|\*|\//.test(lastOfDisplayLine)) {
                    if (resultData.result === "") {
                        setDisplayScreen(prevData => ({
                            displayLine: prevData.displayLine === "0" ? 
                               // prevData.displayValue + value : 
                                value : 
                                prevData.displayLine + value,
                            displayValue: value
                        }))

                    }
                    else {
                        setDisplayScreen({
                            displayLine: resultData.result + value,
                            displayValue: value
                        })
                    }

                }
            }


        }

        
        switch (id) {

            // #7 At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display.
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
                //const url = "http://api.mathjs.org/v4/?expr=" + displayScreen.displayLine.replaceAll("+", "%2B").replaceAll("/", "%2F")
                fetch(resultData.url).then(resp => resp.json()).then(data => {
                    console.log("data: "+ data)
                    setResultData(prevData => ({
                        ...prevData,
                        reset: true,
                        result: data
                    }))
                    setDisplayScreen(prevState => ({
                        displayLine: prevState.displayLine + `=${data}`,
                        displayValue: data
                    }))
                })
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
                        className="functional-key"
                        onClick={handleFunctions}
                      >{button.value}</button>
            })
          )
        }
      </section>
    )
}