import React, { Component } from 'react'
import App from '../App.css'

export default class NewsItem extends Component {
  render() {
    let {title, description, urlToImage, url, author, publishedAt, source} = this.props;
    return (
      <div>
        <div className="card">
        <div style = {{position: 'absolute',right: '0'}}><span className=" badge rounded-pill bg-danger">{source.name}</span></div>
          <img src={urlToImage} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={url} target = "_blank" className="btn btn-primary">Read More</a>
            <p className="card-text my-2"><small className="text-muted">By '{author}' on '{new Date(publishedAt).toGMTString()}'</small></p>
          </div>
        </div>
      </div>
    )
  }
}
