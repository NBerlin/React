import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ls from 'local-storage';


function Square(props) {
    return (
      <button
      className = {props.className + " square"} 
      onClick = { props.onClick }> 
      <div className="deleteButton" onClick={ props.deleteOnClick }>
        X
      </div>
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
      <div className="submitForm">
        <form  onSubmit={this.handleSubmit}>
          <input className="submitFormPart" type="text" value={this.state.value[0]} onChange={this.handleChangeFront} />
          <br />
          <input className="submitFormPart" type="text" value={this.state.value[1]} onChange={this.handleChangeBack} />
          <br />
          <input className="submitFormPartbutton" type="submit" value="Submit" />
          </form>
          
          <button className="submitFormPartbutton" onClick={this.props.callBackClear}> Clear all notes</button>
        </div>
      
    );
  }

}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      squaresFrontside: ls.get('squareFrontside') || [],
      squaresBackside: ls.get('squaresBackside') || [],
      squaresFacingFront: ls.get('squaresFacingFront') || []
    }
  }

  onClick(i){
    const squaresFacingFrontCopy = this.state.squaresFacingFront;
    squaresFacingFrontCopy[i] = !squaresFacingFrontCopy[i];
    this.setState({
      squaresFacingFront: squaresFacingFrontCopy,
    });
    ls.set("squaresFacingFront", squaresFacingFrontCopy );
  }

  deleteOnClick(i){

    const squaresFrontsideCopy = this.state.squaresFrontside;
    const squaresBacksideCopy = this.state.squaresBackside;
    const squaresFacingFrontCopy = this.state.squaresFacingFront;

    squaresFrontsideCopy.splice(i,1);
    squaresBacksideCopy.splice(i,1);
    squaresFacingFrontCopy.splice(i,1);
    
    this.setState({
      squaresFacingFront: squaresFacingFrontCopy,
      squaresBackside: squaresBacksideCopy,
      squaresFrontside: squaresFrontsideCopy
    });
    ls.set('squaresFacingFront', squaresFacingFrontCopy);
    ls.set('squaresBackside', squaresBacksideCopy);
    ls.set('squareFrontside', squaresFrontsideCopy);
    console.log(squaresFrontsideCopy,squaresBacksideCopy,squaresFacingFrontCopy)
  }

  clearAll = () =>{
    this.setState({
      squaresFrontside: [],
      squaresBackside: [],
      squaresFacingFront: []
    })

    ls.set('squaresFacingFront', []);
    ls.set('squaresBackside', []);
    ls.set('squareFrontside', []);
  }

  renderSquare(i) {
    return (
    <Square 
        className={this.state.squaresFacingFront[i] ? 'squareFront' : 'squareBack'}
        text={this.state.squaresFacingFront[i] ? this.state.squaresFrontside[i] : this.state.squaresBackside[i]}
        onClick={() => this.onClick(i)}
        deleteOnClick={() => this.deleteOnClick(i)}
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

    ls.set('squaresFacingFront', squaresFacingFrontCopy);
    ls.set('squaresBackside', squaresBacksideCopy);
    ls.set('squareFrontside', squaresFrontsideCopy);
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
    <SubmitForm callBackClear={this.clearAll} callBack={this.callBack}/>
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
