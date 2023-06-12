import React, { Component } from 'react'

export class APIView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/albums/1/photos";
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ posts: json }))
  }
  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Posts from our API call</h1>
        </div>
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-header" style={{ color: 'black'}}>
              ID #{post.id} {post.title}
            </div>
            <div className="card-body">
              <img src={post.thumbnailUrl} alt={post.title}></img>
            </div>
          </div>
        ))}
      </div>
    );
  }
}