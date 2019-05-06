import React, {Component} from "react";
import ReactDOM from "react-dom";
import AnimalList from './components/animal-list'
import MyAnimal from './components/my-animal'

import "./styles.css";

class App extends Component {
  constructor(){
    super()
    this.state = {
      dataToAddMyList: [],
      animalToReturn: []
    }

    this.dataInList = []

    this.handleAdd = this.handleAdd.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleRemoveAnimal = this.handleRemoveAnimal.bind(this)
    this.filterList = this.filterList.bind(this)
  }

  handleAdd(){
    this.setState({showModal: {display: "block"}})
  }

  handleCloseModal(data){
    if(data.length === 0){
      this.setState({
        showModal: {display: "none"}
      })
    }else{
      this.dataInList = data
      this.setState({
        showModal: {display: "none"},
        dataToAddMyList: this.dataInList
      })
    }
  }

  handleRemoveAnimal(data, i){
    console.log(data)
    delete this.dataInList[i]
    this.setState({
      dataToAddMyList: this.dataInList,
      animalToReturn: data})
  }

  filterList(e) {
    let {value} = e.target
    let updatedList = this.dataInList
    updatedList = updatedList.filter(item => {
      return (
        item.user.toLowerCase().search(value.toLowerCase()) !== -1
      )
    })
    this.setState({ dataToAddMyList: updatedList })
  }

  render() {
    const {showModal, dataToAddMyList, animalToReturn} = this.state
    return (
      <div className="">
        <div><button type="button" onClick={this.handleAdd}>Add animals</button></div><br/>
        <div>Fine anial: <input onChange={this.filterList} /></div>
        <MyAnimal
          myAnimals={dataToAddMyList}
          removeAnimal={this.handleRemoveAnimal}
        />
        <div id="myModal" className="modal" style={showModal}>
          <div className="modal-content">
            <AnimalList
              closeModal={this.handleCloseModal}
              returnAnimal={animalToReturn}/>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
