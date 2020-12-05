import $ from 'jquery'

class Hvg360Handler {
  constructor({ onStartSpeaking }){
    this.onStartSpeaking = onStartSpeaking
  }

  getText() {
    const leadText = $('div.lead.column.mb-5').text()
    let articleText = '';
    
    $('.raw-html > p').each(function(){
      articleText += $(this).text()
    })

    return leadText + articleText
  }

  tellTheArticle(that) {
    const text = that.getText()
    that.onStartSpeaking(text)
  }

  init() {
    let lastUrl = window.location.href; 
    new MutationObserver(() => {
      const url = window.location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        this.addListenButton();
      }
    }).observe(document, {subtree: true, childList: true});
  }

  addListenButton() {
    const that = this
    setTimeout(() => {
      $('div.author').append(`
        <button class="hang-button">
          Hallgasd meg
        </button>`
      ).on('click', 'button', () => this.tellTheArticle(that))
    }, 1500)
  }

  addStyles() {
    $('head').append(`
      <style type="text/css">
        .hang-button {
          cursor: pointer;
          width: 90px;
          font-size: 14px;
          padding: 5px;
          margin: 0;
          background: lightgray !important;
          border-radius: 5px;
        }

        @media (min-width: 1201px) {
          position: absolute;
          bottom: -95px;
          left: 0;          
        }        

        @media (max-width: 1200px) {
          .hang-button {
            position: absolute;
            left: 572px;         
          }
        }

        @media (max-width: 767px) {
          .hang-button {
            position: static;
            margin-bottom: 13px;          
          }
        }        
      </style>
    `);
  }

  onPageLoad() {
    this.addListenButton();
    this.addStyles()
  }
}

export default Hvg360Handler
