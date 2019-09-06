import * as React from 'react';

import {
  injectIntl, FormattedDate,
} from 'react-intl';

import {
  Link,
} from 'react-router-dom';

import {
  StaticRoutes,
} from '../../../model';

class AccountDetails extends React.Component {

  get avatarImage() {
    const { imageUrl, profile = null } = this.props.account;

    if (profile && profile.image) {
      return `data:${profile.imageMimeType};base64,${profile.image}`;
    }

    return imageUrl || '/images/svg/avatar-white.svg';
  }

  render() {
    const { account: { profile } } = this.props;
    const _t = this.props.intl.formatMessage;

    return (

      <div className="account-item">
        <div>
          <img className="account-picture" src={this.avatarImage} alt={_t({ id: 'profile.form.image' })} />
        </div>

        <div className="account-username">
          {profile.name}
        </div>

        <div className="account-resume">
          {profile.resume}
        </div>

        <div className="account-details">

          <div className="account-details-item">
            <i className="fa fa-users account-details-item-icon"></i><span>{profile.company}</span>
          </div>

          <div className="account-details-item">
            <i className="fa fa-map-marker account-details-item-icon"></i><span>{profile.location}</span>
          </div>

          <div className="account-details-item">
            <i className="fa fa-envelope-o account-details-item-icon"></i><span>{profile.email}</span>
          </div>

          <div className="account-details-item">
            <i className="fa fa-code account-details-item-icon"></i><span>{profile.url}</span>
          </div>

          <div className="account-details-item">
            <i className="fa fa-clock-o account-details-item-icon"></i>
            <span>Joined on </span>
            <FormattedDate value={profile.createdOn} day='numeric' month='short' year='numeric' />
          </div>

          <div>
            <Link to={StaticRoutes.PROFILE}>
              <button
                type="button"
                name="update-profile-button"
                className="update-profile-button"
                disabled={false}>
                <span>{_t({ id: 'profile.action.edit' })}</span>
              </button>
            </Link>
          </div>

        </div>

      </div>
    );
  }
}

export default injectIntl(AccountDetails);
