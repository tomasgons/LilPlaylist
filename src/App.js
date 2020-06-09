import React, { Component } from "react";
import firebase from "./firebase.js";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      songName: "",
      artistName: "",
      genre: "",
      rating: "",
      items: [],
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.songName,
      artist: this.state.artistName,
      genre: this.state.genre,
      rating: this.state.rating,
    };
    itemsRef.push(item);
    this.setState({
      songName: "",
      artistName: "",
      genre: "",
      rating: "",
      item: [],
    });
  };
  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          songName: items[item].title,
          genre: items[item].genre,
          artistName: items[item].artist,
          rating: items[item].rating,
        });
      }
      this.setState({
        items: newState,
      });
    });
  }
  removeItem(itemId) {
    const songRef = firebase.database().ref(`/items/${itemId}`);
    songRef.remove();
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="header">
            <h1>List of Fire</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="songName"
                placeholder="Song"
                onChange={this.handleChange}
                value={this.state.songName}
              />
              <input
                type="text"
                name="artistName"
                placeholder="Artist"
                onChange={this.handleChange}
                value={this.state.artistName}
              />

              <select
                type="text"
                name="genre"
                placeholder="Genre"
                onChange={this.handleChange}
                value={this.state.genre}
              >
                <option value="">Genre</option>
                <option value="Rock">Rock</option>
                <option value="Blues">Blues</option>
                <option value="Jazz">Jazz</option>
                <option value="HipHop">HipHop</option>
                <option value="Pop">Pop</option>
              </select>
              <select
                type="text"
                name="rating"
                placeholder="Rating"
                onChange={this.handleChange}
                value={this.state.rating}
              >
                <option value="">Rating</option>
                <option value="★★★★★">★★★★★</option>
                <option value="★★★★☆">★★★★☆</option>
                <option value="★★★☆☆">★★★☆☆</option>
                <option value="★★☆☆☆">★★☆☆☆</option>
                <option value="★☆☆☆☆">★☆☆☆☆</option>
              </select>
              <button>Add Song</button>
            </form>
          </section>

          <section className="display-item">
            <div className="wrapper">
              <ul>
                <ul>
                  {this.state.items.map(item => {
                    return (
                      <li key={item.id}>
                        <p>Song: {item.songName}</p>
                        <p>Artist: {item.artistName}</p>
                        <p>Genre: {item.genre}</p>
                        <p>Rating: {item.rating}</p>
                        <p>
                          <button onClick={() => this.removeItem(item.id)}>
                            Delete Song
                          </button>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
