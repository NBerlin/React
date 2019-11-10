import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
      <button 
      className = {props.className + " square"} 
      onClick = { props.onClick }> 
        {props.text}
      </button>
    );
}

class SubmitForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:["",""],
    };
    
    this.handleChangeFront = this.handleChangeFront.bind(this);
    this.handleChangeBack = this.handleChangeBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFront(event){
    const valueCopy = this.state.value;
    valueCopy[0] = event.target.value;
    this.setState({
      value: valueCopy
    })
  }

  handleChangeBack(event){
    const valueCopy = this.state.value;
    valueCopy[1] = event.target.value;
    this.setState({
      value: valueCopy
    })
  }

  handleSubmit(event) {
    this.props.callBack(this.state.value);
    event.preventDefault();
    this.setState({
      value:["",""]
    });
    
  }

  render(){
    return (
      <form className="submitForm" onSubmit={this.handleSubmit}>
        <input className="submitFormPart" type="text" value={this.state.value[0]} onChange={this.handleChangeFront} />
        <br />
        <input className="submitFormPart" type="text" value={this.state.value[1]} onChange={this.handleChangeBack} />
        <br />
        <input className="submitFormPart" type="submit" value="Submit" />
        </form>
    );
  }

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
        className={this.state.squaresFacingFront[i] ? 'squareFront' : 'squareBack'}
        text={this.state.squaresFacingFront[i] ? this.state.squaresFrontside[i] : this.state.squaresBackside[i]}
        onClick={() => this.onClick(i)}
    />
    );
  }  

  callBack = value => {
    const squaresFrontsideCopy = this.state.squaresFrontside;
    const squaresBacksideCopy = this.state.squaresBackside;
    const squaresFacingFrontCopy = this.state.squaresFacingFront;

    squaresFrontsideCopy.push(value[0]);
    squaresBacksideCopy.push(value[1]);
    squaresFacingFrontCopy.push(true);

    this.setState({
      squaresFrontside: squaresFrontsideCopy,
      squaresBackside: squaresBacksideCopy,
      squaresFacingFront: squaresFacingFrontCopy
    })
  };


  render() {
  const items = []

  for (const[index] of this.state.squaresFrontside.entries()){
    items.push(this.renderSquare(index))
  }
    return (
  <div>
    <div className="flexBox">
    {items}
    </div>
    <div>
    <SubmitForm callBack={this.callBack}/>
    </div>
  </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
