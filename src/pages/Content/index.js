import $ from 'jquery'
import SpeechSynthesis from '../../services/SpeechSynthesis'
import TelexHandler from '../../services/TelexHandler'
import Hvg360Handler from '../../services/Hvg360Handler'

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

if (window.location.hostname === 'hvg.hu' && window.location.pathname.match('360')) {
  pageHandler = new Hvg360Handler({
    onStartSpeaking: speech
  });
}

pageHandler.init()

$(() => {
  pageHandler.onPageLoad()
})
