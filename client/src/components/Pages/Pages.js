import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPages } from "../../store/actions/pages/pages";
import Page from "./Page/Page";

class Pages extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    //Fetched the edit page
    if (this.props.profile.authenticated && !this.props.pages.fetched) {
      this.props.fetchPages();
    }
  };

  componentDidMount = () => {
    if (this.props.profile.authenticated && !this.props.pages.fetched) {
      this.props.fetchPages();
    }
  };
  renderPages = () => {
    if (this.props.pages.fetched && this.props.profile.authenticated) {
      return this.props.pages.lists.map(page => {
        return <Page title={page.title} id={page._id} />;
      });
    }
  };
  render() {
    return (
      <div className="Pages">
        <thead>
          <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {this.renderPages()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  pages: state.pages
});

export default connect(
  mapStateToProps,
  { fetchPages }
)(Pages);
