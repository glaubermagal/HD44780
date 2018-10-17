import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Prism from 'prismjs';
import './style.scss';
import './prism_arduino.css';

class Code extends React.Component {

    constructor() {
        super();
        this.state = {
            rs: 12,
            en: 11,
            d4: 4,
            d5: 5,
            d6: 6,
            d7: 7,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let charLines = '';

        this.props.squares.map((value, index) => {
            if ((index + 1) % 5 === 1) {
                charLines += '    0b';
            }
            charLines += '' + value;
            if ((index + 1) % 5 === 0 && index < 39) {
                charLines += ',\n';
            }
        });

        let codeOutput = `#include <LiquidCrystal.h>

// initialize the library
LiquidCrystal lcd(${this.state.rs}, ${this.state.en}, ${this.state.d4}, ${this.state.d5}, ${this.state.d6}, ${this.state.d7});

byte customChar[8] = {
${charLines}
};
void setup()
{
    // create a new custom character
    lcd.createChar(0, customChar);

    // set up number of columns and rows
    lcd.begin(16, 2);

    // print the custom char to the lcd
    lcd.write((uint8_t)0);
}

void loop()
{

}`;

        return (
            <div>

                <table className="liquid-crystal-settings">
                    <tbody>
                    <tr>
                        <td>
                            <strong>
                                LCD Module
                            </strong>
                        </td>
                        <td>RS</td>
                        <td>RW</td>
                        <td>En</td>
                        <td>D4</td>
                        <td>D5</td>
                        <td>D6</td>
                        <td>D7</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>
                                Arduino Pin
                            </strong>
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                max="13"
                                value={this.state.rs}
                                name="rs"
                                onChange={this.handleInputChange}/>
                        </td>
                        <td>GND</td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                max="13"
                                value={this.state.en}
                                name="en"
                                onChange={this.handleInputChange}/>
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                max="13"
                                value={this.state.d4}
                                name="d4"
                                onChange={this.handleInputChange}/>
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                max="13"
                                value={this.state.d5}
                                name="d5"
                                onChange={this.handleInputChange}/>
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                max="13"
                                value={this.state.d6}
                                name="d6"
                                onChange={this.handleInputChange}/>
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                max="13"
                                value={this.state.d7}
                                name="d7"
                                required="true"
                                onChange={this.handleInputChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <h2>Arduino Sketch</h2>
                <pre>
                    <code className="language-javascript">
                        {codeOutput}
                    </code>
                </pre>
                <a href="https://www.arduino.cc/en/Reference/LiquidCrystal" target="_blank">LiquidCrystal library reference</a>
            </div>
        );
    }
}

function Square(props) {
    const classes = classNames("square", {
        'selected': props.value
    });

    return (
        <button className={classes} onClick={props.onClick}></button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="display">
                {this.props.squares.map((square, index) =>
                    this.renderSquare(index)
                )}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(40).fill(0),
        };

        this.invert = this.invert.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleClick(i) {
        const squares = this.state.squares;
        squares[i] = squares[i] === 1 ? 0 : 1;

        this.setState({
            squares: squares
        });
    }

    invert() {
        const squares = this.state.squares.map((value, index) => {
            return value === 1 ? 0 : 1;
        });

        this.setState({
            squares: squares
        });
    }

    clear() {
        const squares = this.state.squares.map((value, index) => {
            return 0;
        });

        this.setState({
            squares: squares
        });
    }

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <div className="board">
                        <Board
                            squares={this.state.squares}
                            onClick={i => this.handleClick(i)}
                        />
                        <button
                            className="btn"
                            onClick={() => this.clear()}>
                            clear
                        </button>
                        <button className="btn"
                            onClick={() => this.invert()}>
                            invert
                        </button>
                    </div>
                    <div className="output-code">
                        <div className="border">
                            <h1 className="game-title">Character Generator for HD44780 LCD Modules</h1>
                            <Code
                                squares={this.state.squares}
                            />
                        </div>
                        <div className="credits">
                            made with ♥ by <a href="https://github.com/glaubermagal" target="_blank">glaubermagal</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<Game />, document.getElementById("root"));
