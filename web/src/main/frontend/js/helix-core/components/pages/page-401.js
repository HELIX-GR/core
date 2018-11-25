import * as React from 'react';

import {
  toast,
} from 'react-toastify';

import {
  FormattedMessage,
} from 'react-intl';

import { StaticRoutes } from '../../model/routes';

export default class Page401 extends React.Component {

  componentDidMount() {
    toast.dismiss();
    toast.error(<FormattedMessage id="login.failure" />);

    this.props.history.push(StaticRoutes.MAIN);
  }

  render() {
    return null;
  }
}
