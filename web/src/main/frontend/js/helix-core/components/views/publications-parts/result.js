import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    result: PropTypes.object,
  }

  render() {
    const { result: data } = this.props;

    const visible = this.props.visible && data;

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
              <a className="all-link">
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

}

export default Result;
