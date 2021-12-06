import axios from "axios";
import React, { Component } from "react";

import { BASE_URL } from '../env'

class Wav extends Component {
  constructor(props) {
    super(props);
    this.state = { playing: false };
  }

  async componentDidMount() {
    var fileId = this.props.props.fileId;
    var url = await (await axios.get(BASE_URL + 'files/' + fileId)).data.fileId;
    var container = '#waveform' + this.props.props.id
    import('wavesurfer.js')
    .then(obj => {
      this.waveform = obj.default.create({
        container: container,
        fillParent: true,
        progressColor: "#064E3B",
        cursorColor: "#FF69B4",
      });
      this.waveform.load(url);
    });
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    var id = this.props.props.id;
    return (
      <div>
        <div id={"waveform" + id} />
        <div className="controls">
          <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500" onClick={this.handlePlayPause}>
            {this.state.playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    );
  }
}

export default Wav;
