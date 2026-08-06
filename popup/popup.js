const button = document.getElementById('pickRandomVideo');
const chbx = document.getElementById('watchLaterCheckbox')
const statusText = document.getElementById('status');


function openVideo(videoUrl, newTab=false){ //function to avoid repeating the same code to open the video //i use the return to be able to use .then after calling this function
  if (newTab){
    return browser.tabs.create({ url: videoUrl });

  } else {
    return browser.tabs.update({ url: videoUrl });

  }
}


function pickRandomVideo(){
  //this is gonna run inside youtube page, so i cannot use anything about the popup.html....
  
  //here i should use all what i have commented at the end... i copy it here:
          //im gonna start w this one bc the other ones wont mesh... and i would have only to scroll to the bottom to see this... xD

        //i figured (inspecting the yt WL page) that all the videos are in blocks/elements named: "ytd-playlist-video-renderer"
        //and if i type: document.querySelectorAll('ytd-playlist-video-renderer') in the console i'm able to see all the videos (well.. not all, only the first 100..., have to fix that) -> if i scroll down a little it fixes so im gonna have to put a mini scroll in the script? or somethig
        //if i type the same .length i can see how many videos are there... (to choose a random number bettween 0 and that number)

        //i keep investigating (and searching on google...) and now i know that once i have the video i want ( document.querySelectorAll('ytd-playlist-video-renderer')[n] ) i can get easily the link adding: .querySelector('a#video-title').href 
              //explanation: the link is always in the href on the a "block", but there are different a blocks, the one we are interested in is the video-title one
              // so it would end up like this: document.querySelectorAll('ytd-playlist-video-renderer')[n].querySelector('a#video-title').href    || where n is a random number between 0 and document.querySelectorAll('ytd-playlist-video-renderer').length
              //ok.. i've changed the language and now video-title doesnt appear.. i suppose i have to use only a whithout any id name...
                  // i could use: 'a[href*="/watch"]' -> this searches one that has got /watch in the href.. (/watch opens automatically a video...)

  // PSEOUDOCODE HERE:

    //and i should make the scroll also.. butt to be do it later when all this works
  let videos = document.querySelectorAll('ytd-playlist-video-renderer');

  let i = videos.length; //is better this here oooor to put all the document.... . length at the beggining?

  //once i get the length, pick a random number (should be easy...) // i think with Math.random()

  let n = 5;
  return videos[n].querySelector('a[href*="/watch"]').href;
  //search for the video with that index -> and look up to the <a> with [href*="/watch"]
  //here i have to return the href
}

function loadingTab(newTab){ //not sure if this actually works correctly!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! to check....
  
  function waitForTabLoad(tabID, tabStatus) { //first one is the actual page that has changed, the second one is the status of the tab... //i dont know if this "tab" interfires with the main tab used upper...
    if (tabID === newTab.id && tabStatus.status === "complete") { //check if the tab is the tab we want, and ALSO if it has uploaded correctly until being compelte

      browser.tabs.onUpdated.removeListener(waitForTabLoad); //necessary to remove the listener.. because if not it wouldnt stop never... and consume a lot of resources...

      browser.scripting.executeScript({ //it exectues the function func in the target (witch is the yt page (w the playlist))
        target: { tabId: tabID }, //i dont know if this "tab" interfires with the main tab used upper...
        func: pickRandomVideo
      }).then(function(link) {
  
        openVideo(link[0].result); //now it has to open in the same page, that's why there's not the 'true'
        //openVideo(defaultUrl); //HAVE TO DELETE THIS WHEN THE SCRIPT IS DONE
        
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
      let defaultUrl = "https://www.youtube.com/playlist?list=WL"; //DELETE WHEN NO MORE USING IT...

      if (tab.url.includes("youtube.com")){ //if active tab is yt.com || ALL THIS HAVE TO BE DONE IN THE SAME tab.url... //ARE WE ON YOUTUBE??
  
        if (tab.url.includes("list=")){ //if we're on a playlist page, the url has something like: list=... //ARE WE IN A PLAYLIST?
          
          //MOST DIFFICULT I THINK.. TO DO LATER ON... but if we're in the WL playlist, the checkbox shouldnt appear.... !!!!!!!!!!!!!!!

          if (chbx.checked){  //if it has appeared we shouldnt be in WL page (have to do that..)
            //we are in a playlist, but user wants WL (because the checkbox is active)

            // have to choose a link (random WL video) and then open it... //i think its done, this comment can be deleted            
            openVideo(defaultUrl, false) //opened on the same page and from the WL
            .then(loadingTab);


            statusText.innerText = "Playing random video from the Watch Later list";

            
          } else { //pick random video from the current playlist

            //probably i should execute an script here to get the random video from the playlist we're currently  in...
                //logic would be: 1. entering the playlist, 2. get the number of videos (count them i suppouse), 3. choose one randomly and open it.

            //openVideo(defaultUrl);  //HAVE TO CHANGE THE LINK TO THE PLAYLIST ONE... SO I COMMENT THIS ONE...


            //we are already in a page with the list/playlist uploaded, so isnt necessary to load enterily a new page...

            browser.scripting.executeScript({ //it exectues the function func in the target (witch is the yt page (w the playlist))
              target: { tabId: tab.id },
              func: pickRandomVideo
            }).then(function(link) {
        
              //openVideo(link[0].result); //now it has to open in the same page, that's why there's not the 'true'
              openVideo(defaultUrl); //HAVE TO DELETE THIS WHEN THE SCRIPT IS DONE
              
            });
            statusText.innerText = "Playing random video from this playlist";

          }
  
        } else{ //we are on youtube, but not in any playlist -> random video from WL
          openVideo(defaultUrl, false)
          .then(loadingTab);

          statusText.innerText = "Random video opened in this tab";
        }

  
      } else { //WE ARE NOT IN YOUTUBE -> so open a new tab & pick a random video from user's WL
        openVideo(defaultUrl, true)
          .then(loadingTab);
        statusText.innerText = "New tab opened with the video!";
      }

    });
});