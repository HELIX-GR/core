import * as React from 'react';

import {
  toast,
} from 'react-toastify';

import {
  FormattedMessage,
} from 'react-intl';

import {
  ServerError,
} from '../../../model';

import { default as CollectionCard } from './collection-card';
import { default as CollectionEditModal } from './collection-edit-modal';

class CollectionList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selected: null,
    };
  }

  handleAction(action, collection = null) {
    switch (action) {
      case 'create':
        this.showModal();
        break;
      case 'edit':
        this.showModal(collection);
        break;
      case 'delete':
        this.deleteCollection(collection);
        break;
    }
  }

  showModal(selected = null) {
    this.setState({
      showModal: true,
      selected,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
      selected: null,
    });
  }

  deleteCollection(collection) {
    this.props.removeCollection(collection.id)
      .then(() => {
        toast.success(
          <FormattedMessage
            id="collections.delete.success"
            values={{ title: collection.title }}
          />
        );
      })
      .catch(err => {
        if (err instanceof ServerError) {
          toast.error(
            <div>
              {err.errors.map((e) => (
                <FormattedMessage key={e.code} id={e.code} />
              ))}
            </div>
          );
        } else {
          toast.error(
            <FormattedMessage id={'collections.delete.failure'} />
          );
        }
      });
  }

  render() {
    const { collections } = this.props;
    const { showModal, selected = null } = this.state;

    return (
      <>
        {showModal &&
          <CollectionEditModal
            collection={selected}
            addCollection={this.props.addCollection}
            updateCollection={this.props.updateCollection}
            toggle={() => this.hideModal()}
            visible={showModal}>
          </CollectionEditModal>
        }
        <div className="collection-list">
          <CollectionCard
            collection={null}
            handleAction={(action) => this.handleAction(action)}
          ></CollectionCard>
          {collections.map(c => (
            <CollectionCard
              key={c.id}
              collection={c}
              handleAction={(action, collection) => this.handleAction(action, collection)}>
            </CollectionCard>
          ))}
        </div>
      </>
    );
  }

}

export default CollectionList;
