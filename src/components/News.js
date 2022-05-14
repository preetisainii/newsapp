import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading:true,
            page: 1,
            totalResults:0
        }
       
       
    }

    componentDidMount = async () =>{
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);
        this.props.setProgress(50)
        const parseData = await data.json(); 
        this.props.setProgress(70)
        this.setState({
            articles: parseData.articles,
            loading:false,
            totalResults: parseData.totalResults    
        });
        this.props.setProgress(100)
        document.title = `NewsMoneky : ${this.props.category.charAt(0).toUpperCase().concat(this.props.category.slice(1))}`;
    }

    fetchMoreData = async () =>{
        this.setState({page: this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);
        const parseData = await data.json(); 
        
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading:false
        });
        
    }
    // handelPrevClick = async ()=>{
    //     this.setState({
    //         page: this.state.page-1,
    //     })
    //     this.update();
    // }
    // handelNextClick = async ()=>{
    //     this.setState({
    //         page: this.state.page+1,
    //     })
    //     this.update();
    // }
  render() {
    return (
        <>
          <h1 className='text-center'>NewsMonkey : Top {this.props.category.charAt(0).toUpperCase().concat(this.props.category.slice(1))} Headlines!!</h1>
          {this.state.loading &&<Spinner/>}
          <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length < this.state.totalResults}
                loader= {<Spinner/>}
            > 
            <div className="container my-4">
                <div className="row my-5">
                    {this.state.articles.map((element,index) =>{
                        return <div className="col-md-3 my-3" key = {index}>
                                    <NewsItem title = {element.title?element.title.slice(0,30): ''} description = {element.description?element.description.slice(0,80): ''} urlToImage = {element.urlToImage?element.urlToImage:'https://c.ndtvimg.com/2022-04/rjp32tug_sri-lanka-central-bank_625x300_05_April_22.jpg'} url = {element.url} author = {element.author? element.author:'Unknownx'} publishedAt = {element.publishedAt} source = {element.source}/> 
                                </div>
                    })}
                </div>
            </div>
          </InfiniteScroll> 
        
      
      </>
    )
  }
}
