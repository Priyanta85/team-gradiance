import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { getTokenOrRefresh } from '../token_util';
import '../custom.css';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';

const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

function SpeechToText() {
  const [isLooping, setIsLooping] = useState(false);
  const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');

  useEffect(() => {
    async function fetchData() {
      const tokenRes = await getTokenOrRefresh();
      if (tokenRes.authToken === null) {
        setDisplayText('FATAL_ERROR: ' + tokenRes.error);
      }
    }

    fetchData();
  }, []);

  async function sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    setDisplayText('speak into your microphone...');

    recognizer.recognizeOnceAsync((result) => {
      let newDisplayText;
      if (result.reason === ResultReason.RecognizedSpeech) {
        newDisplayText = `RECOGNIZED: Text=${result.text}`;
      } else {
        newDisplayText =
          'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
      }

      setDisplayText(newDisplayText);
    });
  }

  return (
    <Container className="app-container">
      <h1 className="display-4 mb-3">Speech sample app</h1>

      <div className="row main-container">
        <div className="col-6">
          <button onClick={() => sttFromMic()}>{isLooping ? 'stop' : 'start'}</button>
        </div>
        <div className="col-6 output-display rounded">
          <code>{displayText}</code>
        </div>
      </div>
    </Container>
  );
}

export default SpeechToText;
