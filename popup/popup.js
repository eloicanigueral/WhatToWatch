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

      if (tab.url.includes("youtube.com")){ //if active tab is yt.com || ALL THIS HAVE TO BE DONE IN THE SAME tab.url...
        //have to look if we're in a randompage/video or in a playlist
  
        if (tab.url.includes("list=")){ //if we're on a playlist page, the url has something like: ?list=...
          
          //MOST DIFFICULT I THINK.. TO DO LATER ON... but if we're in the WL playlist, the checkbox shouldnt appear....

          //have to check if the checkbox is active...
          if (/* checkbox is active (rand from WL) */ chbx.checked){  //if it has appeared we shouldnt be in WL page (have to do that..)
            //pick random video from user's WL\

            browser.tabs.update({ url: "https://www.youtube.com/playlist?list=WL"}); //opened on the same page and from the WL
            // have to choose a link (random WL video) and then open it... (change previous lines...)

            statusText.innerText = "Playing random video from the Watch Later list";

            
          } else { //pick random video from the current playlist

            //probably i should execute an script here to get the random video from the playlist we're currently  in...
                //logic would be: 1. entering the playlist, 2. get the number of videos (count them i suppouse), 3. choose one randomly and open it.
            // browser.tabs.update({ url: randomURL }); //it has to be a video from that playlist...

            statusText.innerText = "Playing random video from this playlist";

          }
  
        } else{ //we are in the main page orrrr in a video
          //pick random video from user's WL
          //SAME LOGIC AS IN FIRST CASE (CHECKBOX ACTIVE...) -> LINE #25
          browser.tabs.update({ url: "https://www.youtube.com/playlist?list=WL"}); //opened on the same page

          statusText.innerText = "Random video opened in this tab";
        }

  
      } else { //NOW THIS MEANS WE ARE NOT IN youtube.com, SO ALL THIS HAVE TO BE DONE IN A NEW TAB/PAGE 
        //pick a random video from user's WL
        //i think that's all.. jej
        //same logic as previous one (and obv as in the case where the checkbox is marked), only changes that this should open in a new page
        browser.tabs.create({ url: "https://www.youtube.com/playlist?list=WL" });
        statusText.innerText = "New tab opened with the video!";
  
      }

    });
});