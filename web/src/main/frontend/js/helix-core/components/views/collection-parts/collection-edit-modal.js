import * as React from 'react';
import * as PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import {
  toast,
} from 'react-toastify';

import {
  Modal,
} from 'reactstrap';

import {
  FormattedMessage,
} from 'react-intl';

import {
  EnumCollectionAction,
  ServerError,
} from '../../../model';

class CollectionEditModal extends React.Component {

  constructor(props) {
    super(props);

    const { collection } = this.props;

    this.state = {
      loading: false,
      text: collection ? collection.title : '',
    };

    this.textInput = React.createRef();
  }

  static propTypes = {
    action: PropTypes.string.isRequired,
    addCollection: PropTypes.func.isRequired,
    collection: PropTypes.object,
    toggle: PropTypes.func.isRequired,
    updateCollection: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  onTextChanged(text) {
    this.setState({
      text,
    });
  }

  onAccept(e) {
    e.preventDefault();
    toast.dismiss();

    const { action, collection } = this.props;
    const { text: title } = this.state;

    switch (action) {
      case EnumCollectionAction.Create:
        if (title) {
          this.props.addCollection(title)
            .then(() => this.onSuccess())
            .catch((err) => this.onError(err));
        }
        break;

      case EnumCollectionAction.Update:
        if (title && collection.title !== title) {
          this.props.updateCollection(collection.id, title)
            .then(() => this.onSuccess())
            .catch((err) => this.onError(err));
        }
        break;

      case EnumCollectionAction.Delete:
        this.props.removeCollection(collection.id)
          .then(() => this.onSuccess())
          .catch((err) => this.onError(err));
        break;
    }
  }

  onCancel(e) {
    e.preventDefault();

    this.props.toggle();
  }

  onSuccess() {
    const { text: title } = this.state;
    const { action } = this.props;

    toast.success(
      <FormattedMessage id={`collections.${action}.success`} values={{ title }}
      />
    );

    this.props.toggle();
  }

  onError(err) {
    const { action } = this.props;

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
        <FormattedMessage id={`collections.${action}.failure`} />
      );
    }
  }

  resolveTitle() {
    const { action } = this.props;

    switch (action) {
      case EnumCollectionAction.Create:
        return (
          <FormattedMessage id={'collections.create.title'} />
        );
      case EnumCollectionAction.Update:
        return (
          <FormattedMessage id={'collections.update.title'} />
        );
      case EnumCollectionAction.Delete:
        return (
          <FormattedMessage id={'collections.delete.title'} />
        );
      default:
        return null;
    }
  }

  resolvePlaceHolder() {
    const { action, collection, intl: { formatMessage: _t } } = this.props;

    switch (action) {
      case EnumCollectionAction.Create:
        return _t({ id: 'collections.create.text.placeholder' });
      case EnumCollectionAction.Update:
        return _t({ id: 'collections.update.text.placeholder' });
      case EnumCollectionAction.Delete:
        return _t({ id: 'collections.delete.text.placeholder' }, { title: collection.title });
      default:
        return '';
    }
  }

  render() {
    const { text, loading } = this.state;
    const { action } = this.props;

    return (
      <Modal
        centered={true}
        isOpen={this.props.visible}
        keyboard={false}
        onOpened={() => {
          if (this.textInput.current) {
            this.textInput.current.focus();
          }
        }}
        style={{ maxWidth: '500px' }}
        toggle={this.props.toggle}>

        <div className="collection-create-modal">
          <a href="" className="close" onClick={(e) => this.onCancel(e)}></a>

          <div className="form-title">
            {this.resolveTitle()}
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {action === EnumCollectionAction.Delete &&
              <div className="form-content">
                {this.resolvePlaceHolder()}
              </div>
            }

            {action !== EnumCollectionAction.Delete &&
              <div className="text-center">
                <input
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  className="search-text"
                  name="search-text"
                  placeholder={this.resolvePlaceHolder()}
                  value={text}
                  onChange={(e) => this.onTextChanged(e.target.value)}
                  ref={this.textInput}
                />
              </div>
            }

            <section className="footer">
              <button
                type="button"
                name="action-create"
                className={`action action-create mr-4 ${text ? '' : 'action-disabled'}`}
                disabled={false}
                onClick={(e) => this.onAccept(e)}>
                <i className={loading ? 'fa fa-spin fa-spinner' : action === EnumCollectionAction.Delete ? 'fa fa-trash' : 'fa fa-check'}></i>
              </button>
              <button
                type="button"
                name="action-cancel"
                className="action action-cancel"
                disabled={false}
                onClick={(e) => this.onCancel(e)}>
                <i className="fa fa-times"></i>
              </button>
            </section>
          </form>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(CollectionEditModal);
