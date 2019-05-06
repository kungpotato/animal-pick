import React, { Component } from "react"

class MyAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };

    this.hadleRemove = this.hadleRemove.bind(this);
  }

  hadleRemove(data, i) {
    this.props.removeAnimal(data, i);
  }

  render() {
    let { myAnimals } = this.props;

    return (
      <div>
        {myAnimals !== undefined &&
          myAnimals.map((val, i) => (
            <div key={i} className="card" style={{width:"600px"}}>
              <div className="container-card">
                <div
                  className=""
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div style={{ width: "50%" }}>
                    <img
                      alt=""
                      style={{ width: "100%",height: "120px" }}
                      src={val.largeImageURL}
                    />
                  </div>
                  <div style={{ padding: "10px 15px" }}>
                    <b>{val.user}</b>
                    <p>{val.tags}</p>
                    <button
                      type="button"
                      onClick={() => this.hadleRemove(val, i)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default MyAnimal;
