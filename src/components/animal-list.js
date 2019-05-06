import React, { Component } from "react";
import { Subject } from "rxjs";
import ImageService from "../service";

const Group = new Subject();

class AnimalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._isMounted = false;
    this.group = [];
    this.addToMyList = [];

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  chunk(a, l) {
    if (a.length === 0) return [];
    else return [a.slice(0, l)].concat(this.chunk(a.slice(l), l));
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getImageDataApi();
      Group.subscribe(val => {
        this.group = this.chunk(val.hits, 4);
        this.setState({ imgs: this.group });
      });
      // this.getImageDataApi()
      // .then(data => {
      //   this.group = this.chunk(data.hits, 4);
      //   this.setState({ imgs: this.group });
      // });
    }
  }

  async getImageDataApi() {
    if (this._isMounted) {
      const res = await ImageService.getImage();
      Group.next(res);
      //return res;
    }
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.returnAnimal.key1 !== undefined) {
      this.group[nextProps.returnAnimal.key1][nextProps.returnAnimal.key2] =
        nextProps.returnAnimal;
      this.setState({ imgs: this.group });
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextState.imgs !== this.state.imgs){
  //     return true
  //   }
  //   return false
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleAddItem(i, index, val) {
    console.log(val);
    delete this.group[i][index];
    this.setState({ imgs: this.group });
    val.key1 = i;
    val.key2 = index;
    this.addToMyList.push(val);
  }

  handleClose() {
    this.props.closeModal(this.addToMyList);
  }

  render() {
    const { imgs } = this.state;
    return (
      <div>
        <span className="close" onClick={this.handleClose}>
          &times;
        </span>
        <br />
        <br />
        {imgs !== undefined &&
          imgs.map((val, i) => (
            <div key={i} className="card">
              <div className="container-card">
                {val !== undefined &&
                  val.map((value, index) => (
                    <div key={index} className="warp-item">
                      <div className="inner-warp">
                        <div style={{ width: "50%" }}>
                          <img
                            alt=""
                            style={{ width: "100%", height: "90px" }}
                            src={value.largeImageURL}
                          />
                        </div>
                        <div style={{ padding: "10px 15px" }}>
                          <b>{value.user}</b>
                          <p>{value.tags}</p>
                          <button
                            type="button"
                            onClick={() => this.handleAddItem(i, index, value)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default AnimalList;
