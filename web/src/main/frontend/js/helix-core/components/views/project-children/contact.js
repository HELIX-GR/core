import * as React from 'react';

class Contact extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href="#">
          <h4 className="about-details-header">
            Contact
          </h4>
        </a>

        {/* TODO: Add Anti-spam for mail address */}
        <p>For any inquiry or question regarding HELIX, please feel free to contact us at hello@hellenicdataservice.gr.</p>
      </div >

    );
  }
}

export default Contact;
