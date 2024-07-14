import React from 'react';

class ProfileCard extends React.Component {

  render() {
    const { showModal } = this.props;

    return (
      <a href="#" className="profile_cards__item" onClick={(e) => {
        e.preventDefault();

        showModal();
      }}>
        <div className="profile_cards__item__upper">
          <div className="profile_cards__item__upper__img"><img src="/images/profile_image.jpg" alt="" /></div>
          <div className="profile_cards__item__upper__name"><span>Professor</span><h3>Manolis Plionis</h3></div>
        </div>
        <div className="profile_cards__item__lower">
          <p>Διευθυντής και Πρόεδρος ΔΣ Εθνικού Αστεροσκοπείου Αθηνών (ΕΑΑ) Εθνικού Αστεροσκοπείου Αθηνών (ΕΑΑ) </p>
          <p>Συντονιστής του Climpact</p>
        </div>
        <div className="profile_cards__item__button">ΒΙΟΓΡΑΦΙΚΟ</div>
      </a>
    );
  }
}

export default ProfileCard;
