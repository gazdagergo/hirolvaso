import $ from 'jquery'
import SpeechSynthesis from '../../services/SpeechSynthesis'
import TelexHandler from '../../services/TelexHandler'

const speech = (text = 'Jónapot') => {
  const speechSynthesis = new SpeechSynthesis({
    lang: 'hu-HU',
    text
  })
  speechSynthesis.speak()
}

let pageHandler;

if (window.location.hostname === 'telex.hu') {
  pageHandler = new TelexHandler({
    onStartSpeaking: speech
  });
}

pageHandler.init()

$(() => {
  pageHandler.onPageLoad()
})
