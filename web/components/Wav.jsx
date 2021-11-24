import { useEffect, useRef, useState } from "react";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#34D399",
  cursorColor: "Pink",
  barWidth: 2,
  barRadius: 2,
  responsive: true,
  height: 100,
  normalize: true,
  partialRender: true,
});

export default function Wav(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);

  const url = props.fileId;

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    try {
      wavesurfer.current.load(url);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    create();
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [useEffect]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <div onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</div>
      </div>
    </div>
  );
}
