import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  buildPath,
  DynamicRoutes,
} from '../../../model';

class Result extends React.Component {

  constructor(props) {
    super(props);

    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  static propTypes = {
    hide: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    result: PropTypes.object,
    searchCatalog: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    document.getElementById('root').addEventListener('click', this.onDocumentClick, false);
  }

  componentWillUnmount() {
    document.getElementById('root').removeEventListener('click', this.onDocumentClick, false);
  }

  onDocumentClick(e) {
    const elements = document.getElementsByClassName('main-form-content');
    if (elements.length === 0) {
      return;
    }
    const container = elements[0];
    if (!container.contains(e.target)) {
      this.props.hide();
    }
  }

  handleLink(e, id) {
    e.preventDefault();

    if (id === null) {
      this.props.searchCatalog();
    } else {
      this.props.navigate(buildPath(DynamicRoutes.PUBLICATION_PAGE, [id]));
    }
  }

  render() {
    const { result: data } = this.props;

    const visible = this.props.visible && data && data.results.length !== 0;

    return (
      <div
        className={
          classnames({
            'landing-live-search-container': true,
            'visible': visible,
          })
        }
      >
        {data &&
          <div className="landing-live-search-group pubs">
            <div className="results-header">
              <div className="results-title">
                Pubs
              </div>
              <a className="all-link" onClick={(e) => this.handleLink(e, null)}>
                all Pubs
              </a>
            </div>
            <div className="search-results">
              {this.renderPublications(data.results)}
            </div>
          </div>
        }
      </div>
    );
  }

  renderPublications(publications) {
    return publications.map((p, index) => {
      return (
        <a
          key={`publication-${index}`}
          onClick={(e) => this.handleLink(e, p.objectIdentifier)}
          className="result-entry" target="_blank"
        >
          {p.title}
        </a>
      );
    });
  }

}

export default Result;
