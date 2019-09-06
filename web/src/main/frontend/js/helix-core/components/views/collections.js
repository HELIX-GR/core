import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  injectIntl,
} from 'react-intl';

import {
  bindActionCreators,
} from 'redux';

import {
  addCollection,
  updateCollection,
  removeCollection,
} from '../../ducks/user';

import {
  AccountDetails,
  CollectionList,
} from './collection-parts';



class Collections extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { profile = null } = this.props;
    if (!profile) {
      return null;
    }

    return (
      <div>
        <section>
          <div className="landing-section header">
          </div>
        </section>

        <section className="collection-landing-page-content">

          <div className="collection-helix-container container-fluid">
            <div className="row">

              <div className="col-md-3 col-xs-12">
                <AccountDetails
                  account={profile.account}
                />
              </div>

              <div className="col-md-9 col-xs-12">
                <CollectionList
                  addCollection={this.props.addCollection}
                  updateCollection={this.props.updateCollection}
                  removeCollection={this.props.removeCollection}
                  collections={profile.collections}
                />
              </div>

            </div>
          </div>

        </section>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addCollection,
  updateCollection,
  removeCollection,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Collections));
