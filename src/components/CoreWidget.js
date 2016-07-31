/** Do not rename this file **/
import React from 'react';

const defaultImage = false; // hacky, remove instantly fucker

export default class weatherWidget extends React.Component {
    static propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        settings: React.PropTypes.object.isRequired,
    };

    static id = "imageshow";
    static widgetName = "Image Show";
    static sizes = [
        [2, 2]
    ]

    imgError() {
        /* Super ghetto dank janky dirty grimy disgusting hacky code. */
        this.props.settings.set("image", "https://api.icons8.com/download/7360cb827f64f1c4795b9e1f61d87ec9a4810f15/Color/PNG/256/Very_Basic/cancel-256.png");
        return true;
    }

    editImage() {
        $('input[type="file"]').val(null);
        this.props.settings.set("image", "");
    }

    handleClick() {
        /* File is a binary. */
        // this.props.settings.set("image", "test"); // will fail, replace soon

        /* URL overrides file upload, do that first if it's possible. */
        const urlField = document.getElementById("urlField").value;

        if (urlField != "") {
            this.props.settings.set("image", urlField);
        } else {
            var fileField = document.querySelector('input[type=file]').files[0];

            if (fileField != "") {
                var reader = new FileReader();
                var fileName = reader.readAsDataURL(fileField);

                reader.addEventListener("load", () => {
                    var file64 = reader.result;
                    this.props.settings.set("image", file64);
                }, false);
            }

        }
    }

    render() {
        /* The image we need to show depending on file. */
        const imageShow = this.props.settings.get("image", false);

        return (
            <div className = "uk-container" style={{ position: "relative", height: "100%" }}>

            { imageShow?
            <a onClick={this.editImage.bind(this)}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%",
                          height: "100%", zIndex: 2, backgroundColor: "white",
                          backgroundImage: `url('${imageShow}')`,
                          backgroundRepeat: "none", backgroundSize: "cover ",
                          backgroundPosition: "center" }}
                 draggable="false"/></a>: null }

                <div id="upload-drop"
                     className="uk-placeholder uk-margin-large-top
                                uk-text-center" style={{ zIndex: 1}}>
                    <a className="uk-form-file">Please select a file
                    <input id="upload-select" type="file" onChange={this.handleClick.bind(this)}  /></a>.
                </div>

                <p className="uk-text-center uk-margin uk-text-small">
                    or (noting that URL overrides file)
                </p>
                    <div className="uk-text-center uk-form">
                        <input type="text" placeholder="Paste a valid URL here"
                               className="uk-form-width-large uk-text-center"
                               id="urlField"/>
                        <button className="uk-button uk-margin-large-top"
                                onClick={this.handleClick.bind(this)}>
                            Get image
                        </button>
                    </div>
            </div>
        );
    }
}
