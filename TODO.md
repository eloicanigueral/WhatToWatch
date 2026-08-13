
 ---

 # WhatToWatch - TODO List

## Bugs to fix
- [ ] in chrome... if i open the video from outside of yt... when changing the window, the popup closes automatically


## other to work on
- in chrome, the css it looks a bit ugly ...

---
## FEATURES:
- [ ] **Checkbox Visibility:** Hide the checkbox if the user is already in the WL playlist.
    - [ ] Automatically uncheck the checkbox after a video is picked (without closing popup).
- [ ] Fix/understand what happens if the popup is closed while loading (try to automate it so it doesn't interrupt).
    - If it is in the main page and has to load the WL main list... it keeps in that list (same when opening it from a diff page)
    - If i'm in a video already from a playlist, it loads automatically the video (despite closing the popup)
        - [ ] to fix it... i'd have to move the 3 functs (load, wait, and exe) in a **background script** (look at that) to not depend on the popup being open
            - in firefox background.script; in chrome service_worker 
            - popup should advice through browser.runtime.sendMessage
- [ ] check if scroll is really needed in long playlists  
    - Inside a video (with a playlist) it queries all the videos in the playlist. If are in the main playlist list (without any video playing), i think it only shows the first 100... (which is so much, but not all of them...)
- [ ] Make the extension comptatible with other browsers (not only Firefox based ones)
    - [ ] Chrome
        - [ ] in google chrome, if i use it outside yt, it only loads the WL list, not open any video (i think is bc the html id...)
    - [ ] more??

---
## FUTURE:
- [ ] checkbox doesnt work.. (it goes directly to WL page.. ). its strange bc if i pick it already in WL page's it works well.. but if i pick it from a video doesnt work..
- [ ] Add `storage` permission to remember the last played video (prevent repeats) or save the checkbox state
- [ ] **Reduce Loading Time:** The double loading (loading WL page, choosing video, then opening) takes too long. Explore faster alternatives.
    - [ ] if there are many videos in the playlist it might take a few seconds longer
    - [ ] try to reduce that time if notorious
- [ ] **Autoplay:** Decide if the video should play automatically or wait for the user to start it.
    - In chrome it auto plays...
    - In firefox it depends.. sometimes it autoplays, sometimes not (mostly not)
---
## ELSE
- [X] i dont know if i reppeat so much code have to check and try to reduce
#### manifest.json
- [ ] necesito el storage com a permission?? o no? -> //em sera UTIL per recordar l'ultim video i no repetirlo per exemple..., o per recordar el checkbox de WL?...

#### popup
- [ ] Decide if regular random playlists should be treated differently than the WL playlist.
    - [ ] mirar el funcionament de quan esta a una playlist.. tant del checkbox com dels ifs. pq si esta a una playlist normal o directament a la de WL surt lu mateix (i tb el checkbox...)
- [x] HAVE to create a random numer generator... (to pick one from 0 to .length of the playlist)
    - [X] Create an script (with exectueScript??) to make all that?
- [ ] The fucking chechbox shouldnt appear always...
    - if we're in the WL playlist, the checkbox shouldnt appear.... !!!!!!!!!!!!!!!
    - if it appears, we shouldnt be in WL page (have to do that..)


---
---
---
### Already fixed bugs / missfunctions:

- [X] if i opened a video and then i dont close the popup, if i click the video again it doesnt work.. it freezzes (I THINK I FIXED IT.. NOT SURE)
- [X] if im in a playlist sometimes the "id" is: ytd-playlist-panel-video-renderer and not "ytd-playlist-video-renderer" (with the "panel" as an extra...) (FIXED)
- [x] Check what happens if the WL playlist is empty (implement the `null` check properly)

- [x] Add a delay on searching the random video (have to quit and check that...)
- [x] the normal button (without checkbox) doesent work from yt main's page.... (it also stays at WL main page)
    - I THINK IT MIGHT BE PROBLEM OF THE PLAYLIST I AM... IF I TRY IT IN THE SAME WL IT DOESNT WORK WELL (but as far as i fix when the checkbox is shown it would be fixed...)



#### comit changes name:
 ` check TODO list and mark as errors as fixed `
