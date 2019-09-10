import * as React from 'react';

import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import {
  toast,
} from 'react-toastify';

const Fields = {
  Company: 'company',
  Email: 'email',
  Image: 'image',
  ImageMimeType: 'imageMimeType',
  Location: 'location',
  Name: 'name',
  Resume: 'resume',
  URL: 'url',
};

const MB = 1048576;

const DEFAULT_IMAGE_URL = '/images/svg/avatar-white.svg';

class ProfileDetails extends React.Component {

  constructor(props) {
    super(props);

    const { profile } = props;

    this.state = {
      [Fields.Company]: profile[Fields.Company] || '',
      [Fields.Email]: profile[Fields.Email] || '',
      [Fields.Image]: profile[Fields.Image] || '',
      [Fields.ImageMimeType]: profile[Fields.ImageMimeType] || '',
      [Fields.Location]: profile[Fields.Location] || '',
      [Fields.Name]: profile[Fields.Name] || '',
      [Fields.Resume]: profile[Fields.Resume] || '',
      [Fields.URL]: profile[Fields.URL] || '',
    };

    // Track current object URL and dispose instance when a new image is selected
    this._objectURL = null;
  }

  onTextChanged(field, value) {
    this.setState({
      [field]: value,
    });
  }

  onFileSelect(e) {
    e.preventDefault();

    this._fileInput.click();
  }

  onImageChange(e) {
    e.preventDefault();

    toast.dismiss();

    const files = this._fileInput.files;

    if (files.length !== 1) {
      return;
    }

    const file = files[0];

    if (file.size > MB) {
      toast.error(<FormattedMessage id="filesystem.size.less-than" values={{ size: '1MB' }} />);
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error(<FormattedMessage id="filesystem.type-not-supported" />);
      return;
    }

    this.setImage(file);
  }

  setImage(file) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const base64Image = reader.result.replace(/^data:.+\/.+;base64,/, '');

      this.updateObjectUrl(file);

      this.setState({
        [Fields.Image]: base64Image,
        [Fields.ImageMimeType]: file.type,
      });
    }, false);

    reader.addEventListener("error", () => {
      toast.error(<FormattedMessage id="filesystem.read-failed" />);
    }, false);

    reader.readAsDataURL(file);
  }

  updateObjectUrl(file = null) {
    if (this._objectURL) {
      window.URL.revokeObjectURL(this._objectURL);
    }
    if (file) {
      this._objectURL = window.URL.createObjectURL(file);
      this._fileImage.src = this._objectURL;
    }
  }

  onUpdate(e) {
    e.preventDefault();

    const profile = {
      name: this.state[Fields.Name],
      email: this.state[Fields.Email],
      resume: this.state[Fields.Resume],
      url: this.state[Fields.URL],
      company: this.state[Fields.Company],
      location: this.state[Fields.Location],
      image: this.state[Fields.Image],
      imageMimeType: this.state[Fields.ImageMimeType],
    };

    this.props.updateProfile(profile)
      .then(() => {
        toast.success(<FormattedMessage id="profile.error.update.success" />);
      })
      .catch(() => {
        toast.error(<FormattedMessage id="profile.error.update.failure" />);
      });
  }

  componentDidMount() {
    // Refresh image the first time the component is loaded
    if (this.state[Fields.Image]) {
      this._fileImage.src = `data:${this.state[Fields.ImageMimeType]};base64,${this.state[Fields.Image]}`;
    }
  }

  componentWillUnmount() {
    this.updateObjectUrl();
  }

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <div>
        <div className="d-none">
          <input ref={(el) => this._fileInput = el} type="file" onChange={(e) => this.onImageChange(e)} name="picture" />
        </div>

        <form>
          <div className="text-center">
            <div className="form-field">
              <img
                className="account-picture"
                src={DEFAULT_IMAGE_URL}
                alt={_t({ id: 'profile.form.image' })}
                ref={(el) => this._fileImage = el}
              />
            </div>
            <div className="form-field">
              <button
                type="button"
                name="upload-picture-button"
                className="upload-picture-button"
                disabled={false}
                onClick={(e) => this.onFileSelect(e)}>
                {this.props.loading ? (
                  <i className="fa fa-spin fa-spinner"></i>
                ) : (
                  <span>{_t({ id: 'profile.action.upload-image' })}</span>
                )}
              </button>
            </div>
            <div className="form-field">
              <input
                type="text"
                autoComplete="off"
                className="profile-text"
                name="username-text"
                placeholder={_t({ id: 'profile.form.username' })}
                value={this.state[Fields.Name]}
                onChange={(e) => this.onTextChanged(Fields.Name, e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                type="text"
                autoComplete="off"
                className="profile-text"
                name="email-text"
                placeholder={_t({ id: 'profile.form.email' })}
                value={this.state[Fields.Email]}
                onChange={(e) => this.onTextChanged(Fields.Email, e.target.value)}
              />
            </div>
            <div className="form-field">
              <textarea
                type="text"
                autoComplete="off"
                className="profile-text"
                name="resume-text"
                placeholder={_t({ id: 'profile.form.resume' })}
                value={this.state[Fields.Resume]}
                onChange={(e) => this.onTextChanged(Fields.Resume, e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                type="text"
                autoComplete="off"
                className="profile-text"
                name="url-text"
                placeholder={_t({ id: 'profile.form.url' })}
                value={this.state[Fields.URL]}
                onChange={(e) => this.onTextChanged(Fields.URL, e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                type="text"
                autoComplete="off"
                className="profile-text"
                name="company-text"
                placeholder={_t({ id: 'profile.form.company' })}
                value={this.state[Fields.Company]}
                onChange={(e) => this.onTextChanged(Fields.Company, e.target.value)}
              />
            </div>
            <div className="form-field-last">
              <input
                type="text"
                autoComplete="off"
                className="profile-text"
                name="location-text"
                placeholder={_t({ id: 'profile.form.location' })}
                value={this.state[Fields.Location]}
                onChange={(e) => this.onTextChanged(Fields.Location, e.target.value)}
              />
            </div>

            <div className="form-notes">
              <div className="style-5 ">
                {/* {_t({ id: 'profile.notes' })} */}
              </div>
            </div>

            <section className="footer">
              <button
                type="submit"
                name="landing-search-button"
                className="landing-search-button"
                disabled={false}
                onClick={(e) => this.onUpdate(e)}>
                {this.props.loading ? (
                  <i className="fa fa-spin fa-spinner"></i>
                ) : (
                  <span>{_t({ id: 'profile.action.update' })}</span>
                )}
              </button>
            </section>

          </div>

        </form>

      </div >
    );
  }
}

export default injectIntl(ProfileDetails);

