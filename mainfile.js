const mainText = document.getElementById('mw-content-text');

// ---> main js code
const audioButton = document.getElementById('playButton')




audioButton.addEventListener("click", function() {
    //const tabId = getTabId();
    chrome.scripting.executeScript(
    {
      // target: {tabId: tabId, allFrames: true},
      code: audioFunc
    })
  })




function audioFunc(){
    let msg = new SpeechSynthesisUtterance();
    msg.text = "hello world"
    window.speechSynthesis.speak(contentId);
}