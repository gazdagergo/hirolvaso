import { printLine } from './modules/print';
import $ from 'jquery'
import SpeechSynthesis from '../../services/SpeechSynthesis'

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.2');

printLine("Using the 'printLine' function from the Print Module");

const getText = () => {
  const articleText = $('.article-html-content').text()
  return articleText
}

const speech = (text = 'Jónapot') => {
  const speechSynthesis = new SpeechSynthesis({
    lang: 'hu-HU',
    text
  })
  speechSynthesis.speak()
}

const tellTheArticle = () => {
  const text = getText()
  speech(text)
}

let lastUrl = window.location.href; 
new MutationObserver(() => {
  const url = window.location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});

const onUrlChange = () => {
  setTimeout(() => {
    $('.article_content-left').append(`
    <button class="hang-button">
      Hallgasd meg
    </button>`)
    .on('click', 'button', tellTheArticle)
  }, 1500)
}

$(() => {
  $('head').append(`
    <style type="text/css">

      @media (max-width: 1200px) {
        .article_content-left {
          display: flex;
        }
      }

      .hang-button {
        cursor: pointer;
        padding: 4px 20px;
        height: 51px;
        margin: 0 12px;
        border-radius: 5px;
      }

      @media (min-width: 1200px) {
        .hang-button {
          position: absolute;
          margin-top: 12px;
          margin-left: -2px;
          width: 90px;
          font-size: 14px;
          padding: 5px;
        }
      }
    </style>
  `);
})