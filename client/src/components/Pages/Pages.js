import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPages } from "../../store/actions/pages/pages";
import Page from "./Page/Page";

class Pages extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.pages.fetched && nextProps.profile.authenticated) {
      console.log("Inside pages is called");
      console.log(nextProps.fetchPages());
      nextProps.fetchPages();
    }
    // Return null to indicate no change to state.
    return null;
  }

  renderPages = () => {
    if (this.props.pages.fetched && this.props.profile.authenticated) {
      return this.props.pages.lists.map(page => {
        console.log(page);
        return <Page title={page.title} />;
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
