import * as React from 'react';

import {
  EnumCollectionAction,
} from '../../../model';

import { default as CollectionCard } from './collection-card';
import { default as CollectionEditModal } from './collection-edit-modal';

class CollectionList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      action: null,
      selected: null,
      showModal: false,
    };
  }

  handleAction(action, collection = null) {
    switch (action) {
      case EnumCollectionAction.Create:
        this.showModal(action);
        break;
      case EnumCollectionAction.Update:
        this.showModal(action, collection);
        break;
      case EnumCollectionAction.Delete:
        this.showModal(action, collection);
        break;
    }
  }

  showModal(action, selected = null) {
    this.setState({
      action,
      selected,
      showModal: true,
    });
  }

  hideModal() {
    this.setState({
      action: null,
      selected: null,
      showModal: false,
    });
  }

  render() {
    const { collections } = this.props;
    const { action, selected = null, showModal } = this.state;

    return (
      <>
        {showModal &&
          <CollectionEditModal
            action={action}
            addCollection={this.props.addCollection}
            collection={selected}
            removeCollection={this.props.removeCollection}
            toggle={() => this.hideModal()}
            updateCollection={this.props.updateCollection}
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
