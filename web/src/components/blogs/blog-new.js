// BlogNew shows BlogForm and BlogFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BlogForm from './blog-form';
import BlogFormReview from './blog-form-review';

class BlogNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <BlogFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <BlogForm
        onBlogSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'blogForm'
})(BlogNew);
