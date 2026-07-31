const button = document.getElementById('pickRandomVideo');
const chbx = document.getElementById('watchLaterCheckbox')
const statusText = document.getElementById('status');

button.addEventListener('click', function() { // when clicking the main button:
    
    statusText.innerText = "Thinking.... ||| Working... ";

    //check when the checkbox has to be shown.. and how to do that! --> okey.. definetly not here, bc this only runs when the button is clicked, so it has to be done before, but dk if here in the js or in the html or what...
    let request = browser.tabs.query({active: true, currentWindow: true});
        //if he is in yt -> open video in the same tab ->->->   browser.tabs.update({ url: randomURL });
        //if not, open random video in a new tab.url...    ->->->   browser.tabs.create({ url: randomURL });
    request.then(function(tabs){  //it can be better and cleaner if i use .then(openVid, onError); and then creating two differents functions outside... 
        
      let tab = tabs[0]; //okei because tabs (same as request) is an array with the actual tab, where 0 is the first position. It's an object, so what we want is the url (later requested w/ tab.url)

      if (/* activeTab is youtube.com */ tab.url.includes("youtube.com")){ //ALL THIS HAVE TO BE DONE IN THE SAME tab.url...
        //have to look if we're in a randompage/video or in a playlist
  
        if (/* we're on a playlist page */ tab.url.includes("list=")){ // the url has something like: ?list=... //THIS DOESNT WORK.... ONLY IT WORKS IF I CLICK DIRECTLY FROM YOUTUBE WATCH LATER... 
          //MOST DIFFICULT I THINK.. TO DO LATER ON... but if we're in the WL playlist, the checkbox shouldnt appear....
  
          //have to check if the chekbox is active...
          if (/* checkbox is active (rand from WL) */ chbx.checked){  //if it has appeared we shouldnt be in WL page (have to do that..)
            //pick random video from user's WL
  
            // browser.tabs.update({ url: randomURL });
            statusText.innerText = "Playing random video from the Watch Later list";

            
          } else { //HAVE TO CHECK THIS... BECAUSE IF IM WATCHING A VIDEO FROM A PLAYLIST (THE PLAYLIST IN A SIDE AND THE VIDEO IN BIG) IT DOESN'T ENTER HERE... bc the link has not list.. it doesnt work in ANY list.. because lists open a video directly, and the playlist in a side
            //pick random video from the current playlist
  
            // browser.tabs.update({ url: randomURL });
            statusText.innerText = "Playing random video from this playlist";

          }
  
        } else{ //we are in the main page orrrr in a video
          //pick random video from user's WL

          statusText.innerText = "Random video opened in this tab";
        }
  
      } else { //NOW THIS MEANS WE ARE NOT IN youtube.com, SO ALL THIS HAVE TO BE DONE IN A NEW TAB/PAGE 
        //pick a random video from user's WL
        //i think that's all.. jej
  
        //browser.tabs.create({ url: randomVideoUrl });
        statusText.innerText = "New tab opened with the video!";
  
      }

    });
});