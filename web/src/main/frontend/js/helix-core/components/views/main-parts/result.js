import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  buildPath,
  DynamicRoutes,
  EnumCatalog,
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

  handleLink(e, catalog, id) {
    e.preventDefault();

    if (id === null) {
      this.props.searchCatalog(catalog);
    } else {
      switch (catalog) {
        case EnumCatalog.LAB:
          this.props.navigate(buildPath(DynamicRoutes.NOTEBOOK_PAGE, [id]));
          break;
      }
    }
  }

  render() {
    const {
      pills,
      result: {
        [EnumCatalog.CKAN]: packages,
        [EnumCatalog.LAB]: notebooks,
      },
    } = this.props;

    const showPackages = (pills.data && packages && packages.results && packages.results.length !== 0);
    const showNotebooks = (pills.lab && notebooks && notebooks.results && notebooks.results.length !== 0);

    const visible = this.props.visible && (showPackages || showNotebooks);

    return (
      <div
        className={
          classnames({
            'landing-live-search-container': true,
            'visible': visible,
          })
        }
      >

        {showPackages &&
          <div className="landing-live-search-group data">
            <div className="results-header">
              <div className="results-title">
                Data
              </div>
              <a className="all-link" onClick={(e) => this.handleLink(e, EnumCatalog.CKAN, null)}>
                all Data
              </a>
            </div>
            <div className="search-results">
              {this.renderPackages(packages.results)}
            </div>
          </div>
        }

        {showNotebooks &&
          <div className="landing-live-search-group lab">
            <div className="results-header">
              <div className="results-title">
                Lab
              </div>
              <a className="all-link" onClick={(e) => this.handleLink(e, EnumCatalog.LAB, null)}>
                all Notebooks
              </a>
            </div>
            <div className="search-results">
              {this.renderNotebooks(notebooks.results)}
            </div>
          </div>
        }

      </div>
    );
  }

  renderPackages(packages) {
    const { host } = this.props.data;

    return packages.map((p, index) => {
      return (
        <a
          key={`package-${index}`}
          href={`${host}/dataset/${p.id}`}
          className="result-entry"
          target="_blank"
        >
          {p.title}
        </a>
      );
    });
  }

  renderNotebooks(notebooks) {
    return notebooks.map((n, index) => {
      return (
        <a
          key={`notebook-${index}`}
          onClick={(e) => this.handleLink(e, EnumCatalog.LAB, n.id)}
          className="result-entry"
          target="_blank"
        >
          {n.title}
        </a>
      );
    });
  }

}

export default Result;
