const button = document.getElementById('pickRandomVideo');
const chbx = document.getElementById('watchLaterCheckbox')
const statusText = document.getElementById('status');


function openVideo(videoUrl, newTab=false){ //function to avoid repeating the same code to open the video 
  //i use the return to be able to use .then after calling this function
  if (newTab){
    return browser.tabs.create({ url: videoUrl });

  } else {
    return browser.tabs.update({ url: videoUrl });

  }
}

function pickRandomVideo(){
  //this is gonna run inside youtube page, so i cannot use anything about the popup.html....

    //and i should make the scroll also.. butt to be do it later when all this works (it seems i dont need it... have tocheck)
  let videos = document.querySelectorAll('ytd-playlist-video-renderer, ytd-playlist-panel-video-renderer');

  let i = videos.length;

  if (i === 0) return null;
  let n = Math.floor(Math.random() * i);

  return videos[n].querySelector('a[href*="/watch"]').href;
}

function loadingTab(newTab){ //not sure if this actually works correctly!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! to check....
  
  function waitForTabLoad(tabID, tabStatus) { //first one is the actual page that has changed, the second one is the status of the tab...
    if (tabID === newTab.id && tabStatus.status === "complete") { //check if the tab is the tab we want, and ALSO if it has uploaded correctly until being compelte

      browser.tabs.onUpdated.removeListener(waitForTabLoad); //necessary to remove the listener.. because if not it wouldnt stop never... and consume a lot of resources...

      browser.scripting.executeScript({ //it exectues the function func in the target (witch is the yt page (w the playlist))
        target: { tabId: tabID }, //i dont know if this "tab" interfires with the main tab used upper...
        func: pickRandomVideo
      }).then(function(link) {
        if (link === null){
          statusText.innerText = "No video found, check if the playlist isn't empty and try again"
        } else {
          openVideo(link[0].result); //now it has to open in the same page, that's why there's not the 'true'        
          statusText.innerText = "Video correctly loaded!"
        }

      });
  
    }
  }

  browser.tabs.onUpdated.addListener(waitForTabLoad);
}

button.addEventListener('click', function() { // when clicking the main button:
    
  statusText.innerText = "Thinking.... ||| Working... "; //I THINK I HAVE TO DELETE THIS STATUS MSG (OR AT LEAST MODIFY IT....)

  //check when the checkbox has to be shown.. and how to do that! --> okey.. definetly not here, bc this only runs when the button is clicked, so it has to be done before, but dk if here in the js or in the html or what...
  browser.tabs.query({active: true, currentWindow: true})
    .then(function(tabs){  //it can be better and cleaner if i use .then(openVid, onError); and then creating two differents functions outside... 
      
      let tab = tabs[0]; //okei because tabs is an array with the actual tab, where 0 is the first position. It's an object, so what we want is the url (later requested w/ tab.url)
      let defaultUrl = "https://www.youtube.com/playlist?list=WL";

      if (tab.url.includes("youtube.com")){ //if active tab is yt.com || ALL THIS HAVE TO BE DONE IN THE SAME tab.url... //ARE WE ON YOUTUBE??
  
        if (tab.url.includes("list=")){ //if we're on a playlist page, the url has something like: list=... //ARE WE IN A PLAYLIST?
          
          //MOST DIFFICULT I THINK.. TO DO LATER ON... but if we're in the WL playlist, the checkbox shouldnt appear.... !!!!!!!!!!!!!!!

          if (chbx.checked){  //if it has appeared we shouldnt be in WL page (have to do that..)
            //we are in a playlist, but user wants WL (because the checkbox is active)

            openVideo(defaultUrl, false) //opened on the same page and from the WL
            .then(loadingTab);

            statusText.innerText = "Playing random video from the Watch Later list";

            
          } else { //pick random video from the current playlist

            //we are already in a page with the list/playlist uploaded, so isnt necessary to load enterily a new page...
            browser.scripting.executeScript({ //it exectues the function func in the target (which is the yt page (w the playlist))
              target: { tabId: tab.id },
              func: pickRandomVideo
            }).then(function(link) {

              openVideo(link[0].result); //now it has to open in the same page, that's why there's not the 'true'  
              
            });
            //statusText.innerText = "Playing random video from this playlist";

          }
  
        } else{ //we are on youtube, but not in any playlist -> random video from WL
          openVideo(defaultUrl, false)
          .then(loadingTab);

          //statusText.innerText = "Random video opened in this tab";
        }

  
      } else { //WE ARE NOT IN YOUTUBE -> so open a new tab & pick a random video from user's WL
        openVideo(defaultUrl, true)
          .then(loadingTab);
        //statusText.innerText = "New tab opened with the video!";
      }

    });
});