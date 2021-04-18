import React, { Component } from "react";
import Container from "./component/Container";
import Modal from "./component/Modal";
import ItemCard from "./component/ItemCard";
import data from "./xbox.json";

class App extends Component {
  state = {
    orders: [],
    showModal: false,
  };
  componentDidMount() {
    localStorage.setItem("xbox", JSON.stringify(data));
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  addOrder = (newOrder) => {
    this.setState((prevState) => ({
      ...prevState,
      orders: [newOrder, ...prevState.orders],
    }));
    console.log("Submit new Order:", newOrder);

    this.toggleModal();
  };

  render() {
    const { showModal } = this.state;
    return (
      <Container>
        <button className="btn_open" type="button" onClick={this.toggleModal}>
          Otwórz
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ItemCard onSubmit={this.addOrder} onClose={this.toggleModal} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
