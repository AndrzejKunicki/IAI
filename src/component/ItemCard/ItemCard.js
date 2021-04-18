import React, { Component } from "react";
import Slideshow from "../SlideShow/SlideShow";
import "./ItemCard.scss";
import card from "../../xbox.json";

import black from "../../img/black.jpg";
import silver from "../../img/silver.jpg";
import white from "../../img/white.jpg";

const imgSilver = [silver, silver, silver];
const imgBlack = [black, black, black];
const imgWhite = [white, white, white];

const startPrice = Object.values(card.sizes.items)[0].price;
const startAvailable = Object.values(card.sizes.items)[0].status;
const startAmount = Object.values(card.sizes.items)[0].amount;
const startColor = card.multiversions
  .map(({ items }) =>
    Object.values(items).map((i) =>
      Object.values(i.values).map(({ name }) => name)
    )
  )
  .map((item, i) => item[0])
  .join("");

// const priceDifference = card.multiversions
//   .map(({ items }) =>
//     Object.values(items).map(({ products }) => Object.values(products))
//   )
//   .map((item) =>
//     item.map((i) => i.map(({ price_difference }) => price_difference))
// );

const startClickedButton = Object.values(card.sizes.items)[0].name;

class ItemCard extends Component {
  state = {
    name: card.product.name,
    items: Object.values(card.sizes.items),
    price: startPrice,
    color: startColor,
    available: startAvailable,
    quantity: 1,
    amount: startAmount,
    clickedButton: startClickedButton,
    images: imgSilver,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, color, price, quantity } = this.state;
    const newOrder = {
      name,
      color,
      price,
      quantity,
    };
    this.props.onSubmit(newOrder);
  };

  changeSize = (size) => {
    const currentSize = this.state.items.filter(({ type }) => type === size);
    this.setState({
      price: currentSize[0].price,
      available: currentSize[0].status,
      quantity: 1,
      amount: currentSize[0].amount,
    });
  };

  activeSizeBtn = (name) => {
    this.setState({ clickedButton: name });
  };

  increment = () => {
    if (this.state.quantity < this.state.amount) {
      this.setState((prevState) => ({
        ...prevState,
        quantity: prevState.quantity + 1,
      }));
      this.setState((prevState) => ({
        ...prevState,
        price: startPrice * prevState.quantity,
      }));
    }
  };

  decrement = () => {
    if (this.state.quantity > 1) {
      this.setState((prevState) => ({
        ...prevState,
        quantity: prevState.quantity - 1,
        price: startPrice * prevState.quantity,
      }));
      this.setState((prevState) => ({
        ...prevState,
        price: startPrice * prevState.quantity,
      }));
    }
  };

  currentColor = (e) => {
    this.setState({ color: e.currentTarget.value });

    if (e.currentTarget.value === "Srebrny") {
      this.setState({ images: imgSilver });
      return;
    }
    if (e.currentTarget.value === "Czarny") {
      this.setState({ images: imgBlack });
      return;
    }
    if (e.currentTarget.value === "Biały") {
      this.setState({ images: imgWhite });
      return;
    }
  };

  render() {
    const { price, available, quantity, color, amount, images } = this.state;
    const { onClose } = this.props;
    return (
      <>
        <>
          <Slideshow images={images} />
        </>
        <div className="content_box">
          <form onSubmit={this.handleSubmit}>
            <button
              type="button"
              className="btn_close"
              onClick={onClose}
            ></button>
            <h2 className="item_title">{card.product.name}</h2>
            <p
              className="price"
              style={{
                color: amount === 0 ? "#bbb0b0" : "#0090f6",
              }}
            >
              {price},00 zł
            </p>

            <div>
              <p className="size">Rozmiar:</p>
              <div className="size_box">
                {Object.values(card.sizes.items).map(({ name, type }) => (
                  <button
                    key={name}
                    type="button"
                    data-value="name"
                    className={
                      name === this.state.clickedButton
                        ? "btn_size currentBtn"
                        : "btn_size"
                    }
                    onClick={(e) => {
                      this.changeSize(type);
                      this.activeSizeBtn(name);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <p className="size">Wariant:</p>

            <input
              type="text"
              list="examplelist"
              className="input-color"
              value={color}
              onChange={this.currentColor}
            />

            <datalist id="examplelist">
              {card.multiversions.map(({ items }) =>
                Object.values(items).map((i) =>
                  Object.values(i.values).map(({ name }) => (
                    <option value={name} key={name} />
                  ))
                )
              )}
            </datalist>
            <div className="available">
              <div className="icon_ok-box">
                {amount !== 0 && <div className="icon_ok"></div>}
              </div>
              <p>{available}</p>

              <div className="icon_time"></div>
              <p>
                Możemy wysłać już dzisiaj!
                <a href="#"> Sprawdź czasy i koszty wysyłki</a>
              </p>
            </div>

            <div className="quantity">
              <div className="quantity_button">
                {amount > 0 && (
                  <div className="counter">
                    <button type="button" onClick={this.decrement}>
                      -
                    </button>
                    <div className="counter-value">{quantity}</div>
                    <button type="button" onClick={this.increment}>
                      +
                    </button>
                  </div>
                )}
              </div>
              <button className="submit" type="submit" disabled={amount === 0}>
                Dodaj do koszyka
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default ItemCard;
