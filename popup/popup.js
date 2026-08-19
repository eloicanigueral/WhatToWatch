const button = document.getElementById('pickRandomVideo');
const statusText = document.getElementById('status');


browser.runtime.onMessage.addListener( (message) => {
  if (message.type === 'status'){
    statusText.innerText = message.text;
  }
});

button.addEventListener('click', function() { // when clicking the main button:
    
  statusText.innerText = "Loading... (please wait)";

  browser.tabs.query({active: true, currentWindow: true})
    .then(function(tabs){  //it can be better and cleaner if i use .then(openVid, onError); and then creating two differents functions outside... 
      
      let tab = tabs[0]; //okei because tabs is an array with the actual tab, where 0 is the first position. It's an object, so what we want is the url (later requested w/ tab.url)
      let defaultUrl = "https://www.youtube.com/playlist?list=WL";

      if (tab.url.includes("youtube.com")){ //if active tab is yt.com || ALL THIS HAVE TO BE DONE IN THE SAME tab.url... //ARE WE ON YOUTUBE??
  
        if (tab.url.includes("list=")){ //if we're on a playlist page, the url has something like: list=... //ARE WE IN A PLAYLIST?
          //pick random video from the current playlist
          browser.runtime.sendMessage({
            type: "currentPlaylist",
            id: tab.id,
          });
          
  
        } else{ //we are on youtube, but not in any playlist -> random video from WL
          browser.runtime.sendMessage({
            type: "fromWL",
            url: defaultUrl
          });
        }

  
      } else { //WE ARE NOT IN YOUTUBE -> so open a new tab & pick a random video from user's WL
        browser.runtime.sendMessage({
          type: "newTab",
          url: defaultUrl
        });
      }

    });
});