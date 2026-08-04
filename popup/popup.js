const button = document.getElementById('pickRandomVideo');
const chbx = document.getElementById('watchLaterCheckbox')
const statusText = document.getElementById('status');


function openVideo(videoUrl, newTab=false){ //function to avoid repeating the same code to open the video
  if (newTab){
    browser.tabs.create({ url: videoUrl }); //w a return in the beggining or not?

  } else {
    browser.tabs.update({ url: videoUrl });

  }
}



button.addEventListener('click', function() { // when clicking the main button:
    
  statusText.innerText = "Thinking.... ||| Working... "; //I THINK I HAVE TO DELETE THIS STATUS MSG (OR AT LEAST MODIFY IT....)

  //check when the checkbox has to be shown.. and how to do that! --> okey.. definetly not here, bc this only runs when the button is clicked, so it has to be done before, but dk if here in the js or in the html or what...
  browser.tabs.query({active: true, currentWindow: true})
    .then(function(tabs){  //it can be better and cleaner if i use .then(openVid, onError); and then creating two differents functions outside... 
      
      let tab = tabs[0]; //okei because tabs is an array with the actual tab, where 0 is the first position. It's an object, so what we want is the url (later requested w/ tab.url)

      if (tab.url.includes("youtube.com")){ //if active tab is yt.com || ALL THIS HAVE TO BE DONE IN THE SAME tab.url... //ARE WE ON YOUTUBE??
        //have to look if we're in a randompage/video or in a playlist or not
  
        if (tab.url.includes("list=")){ //if we're on a playlist page, the url has something like: ?list=... //ARE WE IN A PLAYLIST?
          
          //MOST DIFFICULT I THINK.. TO DO LATER ON... but if we're in the WL playlist, the checkbox shouldnt appear....

          //have to check if the checkbox is active...
          if (/* checkbox is active (rand from WL) */ chbx.checked){  //if it has appeared we shouldnt be in WL page (have to do that..)
            //OPTION A: On a playlist, but the user wants WL

            //pick random video from user's WL

            browser.tabs.update({ url: "https://www.youtube.com/playlist?list=WL"}); //opened on the same page and from the WL
            // have to choose a link (random WL video) and then open it... (change previous lines...)

            statusText.innerText = "Playing random video from the Watch Later list";

            
          } else { //pick random video from the current playlist
            // OPTION B: Random video from the playlist
            //probably i should execute an script here to get the random video from the playlist we're currently  in...
                //logic would be: 1. entering the playlist, 2. get the number of videos (count them i suppouse), 3. choose one randomly and open it.
            // browser.tabs.update({ url: randomURL }); //it has to be a video from that playlist...

            statusText.innerText = "Playing random video from this playlist";

          }
  
        } else{ //we are in the main page orrrr in a video
          // OPTION C: on yt, but not in any playlist, so video from WL
          //pick random video from user's WL
          //SAME LOGIC AS IN FIRST CASE (CHECKBOX ACTIVE...) -> LINE #36
          browser.tabs.update({ url: "https://www.youtube.com/playlist?list=WL"}); //opened on the same page

          statusText.innerText = "Random video opened in this tab";
        }

  
      } else { //NOW THIS MEANS WE ARE NOT IN youtube.com, SO ALL THIS HAVE TO BE DONE IN A NEW TAB/PAGE  // WE ARE NOT IN YOUTUBE
        //pick a random video from user's WL
        //i think that's all.. jej
        //same logic as previous one (and obv as in the case where the checkbox is marked), only changes that this should open in a new page
        browser.tabs.create({ url: "https://www.youtube.com/playlist?list=WL" }); //this could be also a "promise" and use .then and inside the function if it has created succesfully
              //also inside i could check if the page has uploaded to view the length of the playlist... idk
        openVideo("youtube.com", true);
        statusText.innerText = "New tab opened with the video!";
  


        //im gonna start w this one bc the other ones wont mesh... and i would have only to scroll to the bottom to see this... xD

        //i figured (inspecting the yt WL page) that all the videos are in blocks/elements named: "ytd-playlist-video-renderer"
        //and if i type: document.querySelectorAll('ytd-playlist-video-renderer') in the console i'm able to see all the videos (well.. not all, only the first 100..., have to fix that) -> if i scroll down a little it fixes so im gonna have to put a mini scroll in the script? or somethig
        //if i type the same .length i can see how many videos are there... (to choose a random number bettween 0 and that number)

        //i keep investigating (and searching on google...) and now i know that once i have the video i want ( document.querySelectorAll('ytd-playlist-video-renderer')[n] ) i can get easily the link adding: .querySelector('a#video-title').href 
              //explanation: the link is always in the href on the a "block", but there are different a blocks, the one we are interested in is the video-title one
              // so it would end up like this: document.querySelectorAll('ytd-playlist-video-renderer')[n].querySelector('a#video-title').href    || where n is a random number between 0 and document.querySelectorAll('ytd-playlist-video-renderer').length
              //ok.. i've changed the language and now video-title doesnt appear.. i suppose i have to use only a whithout any id name...
                  // i could use: 'a[href*="/watch"]' -> this searches one that has got /watch in the href.. (/watch opens automatically a video...)
      }

    });
});