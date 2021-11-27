import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

class Wav extends Component {
  constructor(props) {
    super(props);
    this.state = {playing: false};
  }

  componentDidMount() {
    var url = this.props.props.fileUrl;
    var container = '#waveform' + this.props.props.id
    
    this.waveform = WaveSurfer.create({
      container: container,
      waveColor: "#eee",
      progressColor: "#34D399",
      cursorColor: "Pink",
      barWidth: 2,
      barRadius: 2,
      responsive: true,
      height: 100,
      normalize: true,
      partialRender: true
    });

    this.waveform.load(url);
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