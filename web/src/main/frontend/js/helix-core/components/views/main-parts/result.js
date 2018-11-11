import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  EnumCatalog,
} from '../../../model';

class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    result: PropTypes.object,
  }

  render() {
    const {
      [EnumCatalog.CKAN]: packages,
      [EnumCatalog.OPENAIRE]: publications,
      [EnumCatalog.LAB]: notebooks,
    } = this.props.result;

    const showPackages = (packages && packages.results && packages.results.length !== 0);
    const showPublications = (publications && publications.results && publications.results.length !== 0);
    const showNotebooks = (notebooks && notebooks.results && notebooks.results.length !== 0);

    const visible = this.props.visible && (showPackages || showPublications || showNotebooks);

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
              <a className="all-link">
                all Data
              </a>
            </div>
            <div className="search-results">
              {this.renderPackages(packages.results)}
            </div>
          </div>
        }

        {showPublications &&
          <div className="landing-live-search-group pubs">
            <div className="results-header">
              <div className="results-title">
                Pubs
              </div>
              <a className="all-link">
                all Pubs
              </a>
            </div>
            <div className="search-results">
              {this.renderPublications(publications.results)}
            </div>
          </div>
        }

        {showNotebooks &&
          <div className="landing-live-search-group lab">
            <div className="results-header">
              <div className="results-title">
                Lab
              </div>
              <a className="all-link">
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

  renderPublications(publications) {
    const { host } = this.props.openaire;

    return publications.map((p, index) => {
      return (
        <a
          key={`publication-${index}`}
          href={`${host}/search/publication?articleId=${p.objectIdentifier}`}
          className="result-entry" target="_blank"
        >
          {p.title}
        </a>
      );
    });
  }

  renderNotebooks(notebooks) {
    const { host } = this.props.lab;

    return notebooks.map((n, index) => {
      return (
        <a
          key={`notebook-${index}`}
          href={`${host}/dataset/${n.id}`}
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
