import * as React from 'react';

import {
  FormattedMessage,
} from 'react-intl';

class ClimateClock extends React.Component {

  render() {
    const { countdown, minimal = false } = this.props;

    const height = '30px';

    const labelStyle = { height };

    if (!countdown) {
      return null;
    }

    if (minimal) {
      return (
        <div className="climate-clock climate-clock--minimal">
          <span id="climateYear" className="climate-clock__digit">
            {countdown.years < 10 ? `0${countdown.years}` : countdown.years}
          </span>
          <span id="climateDays" className="climate-clock__digit">
            {countdown.days < 10 ? `0${countdown.days}` : countdown.days}
          </span>
          <span id="climateHours" className="climate-clock__digit">
            {countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}
          </span>
          <span id="climateMinutes" className="climate-clock__digit">
            {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}
          </span>
          <span id="climateSeconds" className="climate-clock__digit">
            {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
          </span>
        </div>
      );
    }

    const style = { minWidth: '269px' };

    return (
      <div className="climate-clock">
        <div className="climate-clock__wrapper">
          <div className="climate-clock__title"><FormattedMessage id="text.countdown.header" /></div>
          <div className="climate-clock__data">
            <div className="climate-clock__data__item">
              <div className="climate-clock__data__item__value" id="climateYear">
                {countdown.years < 10 ? `0${countdown.years}` : countdown.years}
              </div>
              <div className="climate-clock__data__item__label" style={labelStyle}><span><FormattedMessage id="text.countdown.years" /></span></div>
            </div>
            <div className="climate-clock__data__item">
              <div className="climate-clock__data__item__value" id="climateDays">
                {countdown.days < 10 ? `0${countdown.days}` : countdown.days}
              </div>
              <div className="climate-clock__data__item__label" style={labelStyle}><span><FormattedMessage id="text.countdown.days" /></span></div>
            </div>
            <div className="climate-clock__data__item">
              <div className="climate-clock__data__item__value" id="climateHours">
                {countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}
              </div>
              <div className="climate-clock__data__item__label" style={labelStyle}><span><FormattedMessage id="text.countdown.hours" /></span></div>
            </div>
            <div className="climate-clock__data__item">
              <div className="climate-clock__data__item__value" id="climateMinutes">
                {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}
              </div>
              <div className="climate-clock__data__item__label" style={labelStyle}><span><FormattedMessage id="text.countdown.minutes" /></span></div>
            </div>
            <div className="climate-clock__data__item">
              <div className="climate-clock__data__item__value" id="climateSeconds" style={style}>
                {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}
              </div>
              <div className="climate-clock__data__item__label" style={labelStyle}><span><FormattedMessage id="text.countdown.seconds" /></span></div>
            </div>
          </div>
          <div className="climate-clock__title"><FormattedMessage id="text.countdown.footer" /></div>
        </div>

        <div className="climate-clock__image"><img src="/images/clock.png" alt="" /></div>
      </div>
    );
  }

}

export default ClimateClock;
