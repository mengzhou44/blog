import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';

class BlogShow extends Component {

  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage(imageUrl) {
    const imageBaseUrl = process.env.REACT_APP_S3_BUCKET_BLOG_BASE_URL;
    if (imageUrl !== undefined) {
      return <img src={`${imageBaseUrl}/${imageUrl}`} alt='blog image' />
    }
  }

  render() {
    if (!this.props.blog) {
      return '';
    }

    const { title, content, imageUrl } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage(imageUrl)}
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
