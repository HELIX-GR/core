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
    toggle: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  onTextChanged(text) {
    this.setState({
      text,
    });
  }

  onSave(e) {
    e.preventDefault();
    toast.dismiss();

    const { collection } = this.props;
    const { text: title } = this.state;

    if (title && (!collection || collection.title !== title)) {
      (collection ? this.props.updateCollection(collection.id, title) : this.props.addCollection(title))
        .then(() => {
          toast.success(
            <FormattedMessage
              id={collection ? 'collections.update.success' : 'collections.create.success'}
              values={{ title }}
            />
          );
          this.props.toggle();
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
              <FormattedMessage id={collection ? 'collections.update.failure' : 'collections.update.failure'} />
            );
          }
        });
    }
  }

  render() {
    const { text, loading } = this.state;
    const _t = this.props.intl.formatMessage;

    return (
      <Modal
        centered={true}
        isOpen={this.props.visible}
        keyboard={false}
        style={{ maxWidth: '500px' }}
        toggle={this.props.toggle}>

        <div className="collection-create-modal">
          <a href="" className="close" onClick={(e) => { e.preventDefault(); this.props.toggle(); }}></a>

          <div className="form-title">
            <FormattedMessage id="collections.create.title" defaultMessage="Create Collection" />
          </div>

          <form>
            <div className="text-center">
              <input
                type="text"
                autoComplete="off"
                autoFocus={true}
                className="search-text"
                name="search-text"
                placeholder={_t({ id: 'collections.create.text.placeholder' })}
                value={text}
                onChange={(e) => this.onTextChanged(e.target.value)}
                ref={this.textInput}
              />
            </div>

            <section className="footer">
              <button
                type="submit"
                name="landing-search-button"
                className="landing-search-button"
                disabled={false}
                onClick={(e) => this.onSave(e)}>
                <i className={loading ? 'fa fa-spin fa-spinner' : 'fa fa-check'}></i>
              </button>
            </section>
          </form>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(CollectionEditModal);
