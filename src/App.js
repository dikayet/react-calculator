import React, { Component } from 'react';

import ResultField from './components/ResultField/ResultField';
import Buttons from './containers/Buttons/Buttons';

class App extends Component {

  state = {
    output: '0',
    command: '',
    buffer: null,
    rewrite: true,
    mistakeCom: false
  }

  btnClickHandle = sym => {
    if (typeof sym === 'string' && sym !== '.' && sym !== '0') {
      this.commandHandle(sym);
      return;
    }
    const prevOutput = this.state.output;
    this.setState({ output: (prevOutput === '0' || this.state.rewrite) ? sym.toString() : prevOutput.toString() + sym, mistakeCom: false });
    if (this.state.rewrite) {
      this.setState({ rewrite: false });
    }
  }

  commandHandle = sym => {

    const output = this.state.output;
    const prevCommand = this.state.command;

    // If wrong command was chosen just change prev command
    if (this.state.mistakeCom) {
      if (sym === 'C') {
        this.clearInput();
      } else if (sym !== '=') {
        this.setState({ command: sym });
      }
      return;
    }

    // Remove character or clear input
    if (sym === 'C') {
      this.clearInput();
      return;
    }

    // Equel
    if (sym === '=') {
      this.equel();
      return;
    }

    // Change sign
    if (sym === '+/-' && output !== '0') {
      this.setState({ output: (-parseFloat(output)).toString() });
      return;
    }

    // If it's a first command issued
    if (prevCommand === '') {
      this.setState({ command: sym, buffer: output, rewrite: true });
      return;
    }

    const result = this.getResult(prevCommand);
    this.setState({ output: result, command: sym, buffer: result, rewrite: true, mistakeCom: true });
  }

  equel = () => {
    const result = this.getResult(this.state.command);
    this.setState({
      output: result,
      command: '',
      buffer: 0,
      rewrite: true
    });
  }

  clearInput = () => {
    const output = this.state.output;
    if (output.length > 1 && !this.state.rewrite) {
      this.setState({
        output: output.slice(0, -1)
      });
      return;
    }
    if (output.length === 1 && output !== '0' && !this.state.rewrite) {
      this.setState({ output: '0' });
      return;
    }
    this.setState({
      output: '0',
      command: '',
      buffer: null,
      rewrite: true
    });
  }

  getResult = command => {
    const output = this.state.output;
    const buffer = this.state.buffer;
    if (command !== '' && buffer) {
      switch (command) {
        case '-':
          return (parseFloat(buffer) - parseFloat(output)).toString();

        case '+':
          return (parseFloat(buffer) + parseFloat(output)).toString();

        case '*':
          return (parseFloat(buffer) * parseFloat(output)).toString();

        case '/':
          return (parseFloat(buffer) / parseFloat(output)).toString();

        case '%':
          // Get a percentage (first number) of a number (second number)
          if (output !== '0') {
            return ((parseFloat(buffer) / 100) * parseFloat(output)).toString();
          } else {
            return '0';
          }

        default:
          return '0';
      }
    } else {
      return '0';
    }
  }

  render() {
    return (
      <div className="App">
        <ResultField output={this.state.output} />
        <Buttons btnClicked={this.btnClickHandle} />
      </div>
    );
  }
}

export default App;
