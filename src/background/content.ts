import nullthrows from '@shared/helper';
// import { DOMMessage, DOMMessageResponse } from '../types';

// inject script in figma HTML
function injectCode(src: string) {
  const script = document.createElement('script');
  // This is why it works!
  script.src = src;
  script.onload = function() {
    console.log("🔍 script injected");
    script.remove();
  };

  nullthrows(document.head || document.documentElement).appendChild(script);
}

const isInFile = /\/file\/[A-Za-z0-9]{22}\//.test(window.location.pathname)
if (isInFile) {
  injectCode(chrome.runtime.getURL('/js/ui.js'));
}

// receive messages from UI
// const messagesFromReactAppListener = (
//   msg: DOMMessage,
//   sender: chrome.runtime.MessageSender,
//   sendResponse: (response: DOMMessageResponse) => void
// ) => {
//   console.log('[content.js]. Message received', msg);
//   injectCode(chrome.runtime.getURL('/static/js/enhancedInspector.js'));
//   //  sendResponse(response);

// }

// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

