import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
      <button 
      className = "square" 
      onClick = { props.onClick }> 
        {props.text}
      </button>
    );
}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      squaresFrontside: ["test","Nikzquita"],
      squaresBackside: ["hue", "nue"],
      squaresFacingFront:[true, true]
    }
  }

  onClick(i){
    const squaresFacingFrontCopy = this.state.squaresFacingFront;
    squaresFacingFrontCopy[i] = !squaresFacingFrontCopy[i];
    this.setState({
      squaresFacingFront: squaresFacingFrontCopy,
    });
  }

  renderSquare(i) {
    return (
    <Square 
        text={this.state.squaresFacingFront[i] ? this.state.squaresFrontside[i] : this.state.squaresBackside[i]}
        onClick={() => this.onClick(i)}
    />
    );
  }  


  render() {
  const items = []

  for (const[index, value] of this.state.squaresFrontside.entries()){
    items.push(this.renderSquare(index))
  }
    return (
  <div>
    {items}
  </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
