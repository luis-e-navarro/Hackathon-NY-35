// ---> main js code
let audioSwitch = true;
// console.log(this.getVoices());
const talkingDino = document.createElement('img')
talkingDino.setAttribute('src', 'https://c.tenor.com/sXza0AE595oAAAAi/what-are-you-saying-qoobee.gif');
talkingDino.setAttribute('id', 'dino');
const mainButton = document.getElementById('playButton');

document.getElementById("playButton").onclick = async () => {

  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => getSelection().toString(),
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
  //document.body.append('Selection: ' + result);
  if (audioSwitch){
    audioFunc(result);
    audioSwitch = false;
    mainButton.style.backgroundColor = 'orange'
    mainButton.innerText = 'Stop Audio';
    document.body.append(talkingDino)

  }else{
    audioStop();
    audioSwitch = true;
    mainButton.style.backgroundColor = 'aliceblue'
    
    // mainButton.innerText = 'Play' ;
  }
};

// addEventListener('end', (event) => {
//   audioSwitch = true;
//   mainButton.style.backgroundColor = 'aliceblue'
//   mainButton.innerText = 'Play Selection';
// })


let msg = new SpeechSynthesisUtterance();

function audioFunc(inputText){
  
  // msg.voice = 
  msg.text = inputText;
  msg.onend = (event) => {
    audioSwitch = true;
    mainButton.style.backgroundColor = 'aliceblue'
    mainButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-soundwave" viewBox="0 -2 16 16"><path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/></svg>' + ' Play Selection';
    
    document.body.removeChild(talkingDino)
  }
  window.speechSynthesis.speak(msg);

}


function audioStop(){
  window.speechSynthesis.cancel();
  // document.body.removeChild(document.body.children[1])
  // document.body.remove(document.getElementById('dino'))
}