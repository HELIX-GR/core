import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  injectIntl,
} from 'react-intl';

import {
  bindActionCreators,
} from 'redux';

import {
  updateProfile,
} from '../../ducks/user';

import {
  Menu,
  ProfileDetails,
} from './profile-parts';

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <div>
        <section>
          <div className="landing-section header">
          </div>
        </section>

        <section className="profile-landing-page-content">

          <div className="profile-container container-fluid">
            <div className="row">

              <div className="col-md-3 col-xs-12">
                <h4 className="profile-header">
                  {_t({ id: 'header.menu.login.items.account' })}
                </h4>
              </div>

              <div className="col-md-9 col-xs-12">
                <h4 className="profile-header">
                  {_t({ id: 'profile.title' })}
                </h4>
              </div>

              <div className="col-md-3 col-xs-12">
                <Menu />
              </div>

              <div className="col-md-9 col-xs-12">
                <div className="profile-item">
                  <ProfileDetails
                    profile={this.props.profile}
                    updateProfile={this.props.updateProfile}
                  />
                </div>
              </div>

            </div>
          </div>

        </section>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.user.profile.account.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateProfile,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Profile));
