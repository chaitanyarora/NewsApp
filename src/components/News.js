import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();
  }

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: true,
      totalResults: 0,
      page: 1,
    }
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1
    });
    this.updateNews();
  }

  fetchMoreData = async () => {

    this.setState({
      page: this.state.page + 1
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false
    })
  };


  render() {
    return (
      <>
        <h2 className='text-center' style={{ margin: "40px 0px" }}>NewsMonkey  Top Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">


            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url} >
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                  />
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>

      </>
    )
  }
}

export default News