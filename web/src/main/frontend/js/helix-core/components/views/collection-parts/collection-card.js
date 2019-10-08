import * as React from 'react';

import moment from '../../../moment-localized';

import {
  Link,
} from 'react-router-dom';

import {
  FormattedMessage,
} from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
  EnumCollectionAction,
} from '../../../model';

class CollectionCard extends React.Component {

  static defaultProps = {
    collection: null,
  }

  render() {
    const { collection: c = null } = this.props;

    if (c) {
      return (
        <div className="collection-card">
          <div className="title">
            <Link to={buildPath(DynamicRoutes.COLLECTION_PAGE, [c.id])}>{c.title}</Link>
          </div>
          <div className="actions">
            <div className="action" onClick={() => this.props.handleAction(EnumCollectionAction.Update, c)}>
              <i className="fa fa-pencil"></i>
            </div>
            <div className="action" onClick={() => this.props.handleAction(EnumCollectionAction.Delete, c)}>
              <i className="fa fa-trash"></i>
            </div>
          </div>
          <div className="pills">
            {c.publicationCounter !== 0 &&
              <div className="pill pill-pubs">{`${c.publicationCounter} PUBS`}</div>
            }
            {c.datasetCounter !== 0 &&
              <div className="pill pill-data">{`${c.datasetCounter} DATA`}</div>
            }
            {c.notebookCounter !== 0 &&
              <div className="pill pill-lab">{`${c.notebookCounter} LAB`}</div>
            }
          </div>
          <div className="date">
            <FormattedMessage id={'collections.last-modified'} values={{ when: moment(c.updatedOn).fromNow() }} />
          </div>

        </div>
      );
    }

    return (
      <div className="collection-card placeholder">
        <div className="title"><FormattedMessage id={'collections.create.title'} /></div>
        <div className="add-button" onClick={() => this.props.handleAction(EnumCollectionAction.Create)}>
          <i className="fa fa-plus"></i>
        </div>
      </div>
    );
  }

}

export default CollectionCard;
