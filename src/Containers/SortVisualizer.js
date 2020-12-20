import React, { Component } from "react";
import Bar from "../Components/Bar";
import Input from "../Components/Input";
import Button from "../Components/Button";

var timeOutID

class SortVisualizer extends Component {

    state = {
        strNums: 0,
        arrayOfNumbers: [],
        nums: [],
        interval: 50,
        color: 'limegreen'
    }
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    insertionSort = (event) => {
        event.target.disabled = true
        // An array of integers to sort.
        let copy = this.state.strNums

        for (let i = 1; i <= copy.length; i++) {
            timeOutID = setTimeout(() => {
                for (let j = i - 1; j => 0; j--) {
                    if (Number(copy[j + 1]) < Number(copy[j])) {
                        const temp = copy[j]
                        copy[j] = copy[j + 1]
                        copy[j + 1] = temp
                        this.setState({ strNums: copy, color: 'green' })
                    }
                    else {
                        break
                    }
                }
            }, Number(this.state.interval))
        }
        this.sleep(Number(this.state.interval) + 1001).then(() => {
            this.setState({ strNums: copy, color: 'limegreen' })
            alert("success")
        }
        );

    }

    handleInputChange = (numbers) => {
        for (let i in numbers) {
            if (!(/^[a-zA-Z]+$/.test(numbers[i]))) {
                let array = numbers.split(' ')
                this.setState({ arrayOfNumbers: array })
                console.log(this.state.arrayOfNumbers)

                var str = array[0].split(',')
                console.log(str)
                this.setState({ strNums: str })

            }
            else {
                alert("Must input numbers");
                return false
            }
        }
    }

    intervalHandler = (interval) => {
        this.setState({ interval: interval })
    }
    clearHandler = (event) => {
        clearTimeout(timeOutID)
        document.querySelector("#array").value = ''
        document.querySelector("#start").disabled = false
        this.setState({ arrayOfNumbers: [], strNums: 0, interval: 50 })
    }

    render() {

        return (
            <div className="visualizer-container">
                <div className="array-container">
                    {this.state.strNums !== 0 ?
                        this.state.strNums.map((item, index) => {
                            return <Bar
                                className='array-bar'
                                key={index}
                                height={item}
                                backgroundColor={this.state.color}
                            />
                        }) : null
                    }
                </div>
                <div className="input-container">
                    <div>
                        <Input
                            elementId="interval"
                            type="text"
                            width="300px"
                            placeholder="Interval(ms) - default is 50ms"
                            value={this.state.interval}
                            onChange={(event) => this.intervalHandler(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            elementId="array"
                            type="text"
                            width="600px"
                            placeholder="Numbers"
                            value={this.state.arrayOfNumbers}
                            onChange={(event) => this.handleInputChange(event.target.value)}
                        />
                    </div>
                </div>
                <footer className="app-footer">
                    <Button elementId="start" text="Insertion Sort" onClick={(event) => this.insertionSort(event)} />
                    <Button elementId="clean" text="Clear" onClick={(event) => this.clearHandler(event)} />
                </footer>
            </div>
        );
    }
}

export default SortVisualizer;
