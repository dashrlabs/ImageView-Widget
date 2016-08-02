/** Do not rename this file **/
import React from 'react';

export default class WeatherWidget extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    settings: React.PropTypes.object.isRequired,
  };

  static id = 'imageshow';
  static widgetName = 'Image Show';
  static sizes = [[2, 2]];

  imgError() {
    /* Super ghetto dank janky dirty grimy disgusting hacky code. */
    this.props.settings.set('image', 'https://api.icons8.com/download/7360cb827f64f1c4795b9e1f61d87ec9a4810f15/Color/PNG/256/Very_Basic/cancel-256.png');
    return true;
  }

  editImage = () => {
    this.refs.file.value = '';
    this.props.settings.set('image', '');
  }

  handleClick = () => {
    const urlField = this.refs.url.value;

    if (urlField !== '') {
      this.props.settings.set('image', urlField);
    } else {
      const fileField = this.refs.file.files[0];

      if (fileField !== '') {
        const reader = new FileReader();
        reader.readAsDataURL(fileField);

        reader.addEventListener('load', () => {
          const file64 = reader.result;
          this.props.settings.set('image', file64);
        }, false);
      }
    }
  }

  render() {
    /* The image we need to show depending on file. */
    const imageShow = this.props.settings.get('image', false);

    return (
      <div className="uk-container" style={{ position: 'relative', height: '100%' }}>
        {
          imageShow ?
          (
            <a onClick={this.editImage}>
              <div className="image" style={{ backgroundImage: `url('${imageShow}')` }} draggable="false" />
            </a>
          )
          : null
        }

        <div id="upload-drop" className="uk-placeholder uk-margin-large-top uk-text-center">
          <a className="uk-form-file">
            Please select a file
            <input ref="file" type="file" onChange={this.handleClick} />
          </a>
        </div>
        <p className="uk-text-center uk-margin uk-text-small">or (noting that URL overrides file)</p>
        <div className="uk-text-center uk-form">
          <input
            type="text" placeholder="Paste a valid URL here"
            className="uk-form-width-large uk-text-center"
            ref="url"
          />
          <button className="uk-button uk-margin-large-top" onClick={this.handleClick}>
              Get image
          </button>
        </div>
      </div>
    );
  }
}
