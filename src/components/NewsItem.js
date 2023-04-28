import React from 'react'

const NewsItem = (props) => {


    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div className='my-3'>
        <div className="card">
          <span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{ left: "90%", zIndex: '1' }}>{source}</span>
          <img src={imageUrl ? imageUrl : "https://media.istockphoto.com/id/1176012574/photo/clear-blurred-background-with-warm-colors-blend-clean-defocused-backdrop.jpg?s=612x612&w=0&k=20&c=Am3Gqo31N0amVFObfGb2bit_06UiTMHz0W6Ccj0C4IY="} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark text-center">Read More</a>
            <p className="card-text my-2"><small className="text-muted">By {author ? author : "Unknown"} on {date ? new Date(date).toGMTString() : "Unspecified"}</small></p>
          </div>
        </div>
      </div>
    )
}

export default NewsItem