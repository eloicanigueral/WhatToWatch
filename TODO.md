
 ---

 # WhatToWatch - TODO List

## Bugs to fix (v1.1)
- [ ] Check what happens if the WL playlist is empty (implement the `null` check properly)
- [ ] checkbox doesnt work.. (it goes directly to WL page.. ). its strange bc if i pick it already in WL page's it works well.. but if i pick it from a video doesnt work..
    - [ ] Add a delay on searching the random video (have to quit and check that...)
- [ ] the normal button (without checkbox) doesent work from yt main's page.... (it also stays at WL main page)
    - [ ] okei sometimes it doesnt work.. so i didnt fixed at all...
    - I THINK IT MIGHT BE PROBLEM OF THE PLAYLIST I AM... IF I TRY IT IN THE SAME WL IT DOESNT WORK WELL (but as far as i fix when the checkbox is shown it would be fixed...)


<!-- #### not that important (v1.1+) -->

---
## FEATURES:
- [ ] **Checkbox Visibility:** Hide the checkbox if the user is already in the WL playlist.
    - [ ] Automatically uncheck the checkbox after a video is picked (without closing popup).
- [ ] Fix/understand what happens if the popup is closed while loading (try to automate it so it doesn't interrupt).
- [ ] Make the extension comptatible with other browsers (not only Firefox based ones)
    - [ ] Chrome
        - [ ] in google chrome, if i use it outside yt, it only loads the WL list, not open any video (i think is bc the html id...)
    - [ ] more??

---
## FUTURE:
- [ ] Add `storage` permission to remember the last played video (prevent repeats) or save the checkbox state
- [ ] **Reduce Loading Time:** The double loading (loading WL page, choosing video, then opening) takes too long. Explore faster alternatives.
    - [ ] if there are many videos in the playlist it might take a few seconds longer
    - [ ] try to reduce that time if notorious
- [ ] **Autoplay:** Decide if the video should play automatically or wait for the user to start it.

---
## ELSE
- [X] i dont know if i reppeat so much code have to check and try to reduce
#### manifest.json
- [ ] necesito el storage com a permission?? o no? -> //em sera UTIL per recordar l'ultim video i no repetirlo per exemple..., o per recordar el checkbox de WL?...

#### popup
- [ ] Decide if regular random playlists should be treated differently than the WL playlist.
- [ ] mirar el funcionament de quan esta a una playlist.. tant del checkbox com dels ifs. pq si esta a una playlist normal o directament a la de WL surt lu mateix (i tb el checkbox...)
- [ ] Shauria de separar playlist random de la WL??? tipu tenir en compte o no? ... 
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




#### comit changes name:
 ` Clean up & make TODO ez to read `
