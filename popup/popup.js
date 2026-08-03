// popup.js basic structure

const button = document.getElementById('pickRandomVideo');
const chbx = document.getElementById('watchLaterCheckbox')
const statusText = document.getElementById('status');

button.addEventListener('click', function() { // when clicking the main button:
    
    statusText.innerText = "If this is shown, js works! jeje";
          //if he is in yt -> open video in the same tab ->->->   browser.tabs.update({ url: randomURL });

          //if not, open random video in a new tab...    ->->->   browser.tabs.create({ url: randomURL });
          //check when the checkbox has to be shown.. and how to do that!
    //first look to the activeTab -> ->  // browser.tabs.query({active: true, currentWindow: true})'
    if (/* activeTab is youtube.com */){ //ALL THIS HAVE TO BE DONE IN THE SAME TAB...
      //have to look if we're in a randompage/video or in a playlist
      if (/* we're on a playlist page */){ // the url has something like: ?list=...
        //MOST DIFFICULT I THINK.. TO DO LATER ON... but if we're in the WL playlist, the checkbox shouldnt appear....

        //have to check if the chekbox is active...
        if (/* checkbox is active (rand from WL) */){  //if it has appeared we shouldnt be in WL page (have to do that..)
          //pick random video from user's WL

          // browser.tabs.update({ url: randomURL });
          
        } else {
          //pick random video from the current playlist

          // browser.tabs.update({ url: randomURL });
        }

      } else{ //we are in the main page orrrr in a video
        //pick random video from user's WL
      }

    } else { //NOW THIS MEANS WE ARE NOT IN youtube.com, SO ALL THIS HAVE TO BE DONE IN A NEW TAB/PAGE 
      //pick a random video from user's WL
      //i think that's all.. jej

      //browser.tabs.create({ url: randomVideoUrl });
    }

});