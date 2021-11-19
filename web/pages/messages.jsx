import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

class Messages extends Component {
  constructor() {
    super();
    this.state = { msg: '', chat: [], nickname: '' };
  }

  componentDidMount() {
    socket.on('chat message', ({ nickname, msg }) => {
      this.setState({
        chat: [...this.state.chat, { nickname, msg }]
      });
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = () => {
    const { nickname, msg } = this.state;
    socket.emit('chat message', { nickname, msg });
    this.setState({ msg: '' });
  };

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ nickname, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: 'green' }}>{nickname}: </span>

        <span>{msg}</span>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div>{this.renderChat()}</div>

        {/* <span>Nickname</span>
        <input name="nickname" onChange={e => this.onTextChange(e)} value={this.state.nickname} />
        <span>Message</span>
        <input name="msg" onChange={e => this.onTextChange(e)} value={this.state.msg} /> */}
        <div>
          <label for="nickname" class="ml-2 mt-10 block text-sm font-medium text-gray-700">
            Nickname
          </label>
          <div class="mt-1">
            <input
              type="text"
              onChange={e => this.onTextChange(e)}
              value={this.state.nickname}
              autocomplete="off"
              name="nickname"
              id="nickname"
              class="shadow-sm max-w-xs	 ml-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 mx-2 "
              placeholder="Max"
            />
          </div>
        </div>

        <label for="msg" class="ml-2 mt-4 block text-sm font-medium text-gray-700">
          Message
        </label>
        <input
          onChange={e => this.onTextChange(e)}
          value={this.state.msg}
          type="text"
          name="msg"
          id="msg"
          class="shadow-sm border-gray-300 rounded-lg  sm:text-sm m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          placeholder="Enter some text..."></input>

        <br />

        <button
          type="button"
          onClick={this.onMessageSubmit}
          class="inline-flex items-center px-4 py-2 border border-transparent mt-3 ml-2 text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Send
        </button>
      </div>
    );
  }
}

export default Messages;
