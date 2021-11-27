import React, { Component } from 'react';

class Wav extends Component {
  constructor(props) {
    super(props);
    this.state = {playing: false};
  }

  componentDidMount() {
    var url = this.props.props.fileUrl;
    var container = '#waveform' + this.props.props.id
    import('wavesurfer.js')
    .then(obj => {
      this.waveform = obj.default.create({
      container: container,
      fillParent: false,
    })
    this.waveform.load(url);
  });
};
  
  handlePlayPause = () => {
    this.setState({playing: !this.state.playing})
    this.waveform.playPause();
  };
  
  render() {
    var id = this.props.props.id;
    return (
      <div>
        <div id={"waveform" + id} />
        <div className="controls">
          <div onClick={this.handlePlayPause}>{this.state.playing ? "Pause" : "Play"}</div>
        </div>
      </div>
    );
  }
};

export default Wav;