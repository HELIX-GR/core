import React from 'react';

import classnames from 'classnames';

import WordPressPage from '../pages/word-press-page';

class ProfileModal extends React.Component {

  render() {
    const { open, closeModal, page } = this.props;

    return (
      <div className={
        classnames({
          'people_modal': true,
          'show-modal': open,
        })
      }>
        <div className="people_modal__wrapper">
          <a href="" className="people_modal__close" onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}>
            <img src="/images/icons/close_icon.svg" alt="" />
          </a>
          <WordPressPage className="people_modal__inner" name={page} />
        </div>
      </div>
    );
  }

}

export default ProfileModal;
