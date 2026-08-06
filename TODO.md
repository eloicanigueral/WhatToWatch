// To Be Done (or reviewed) tasks:

### manifest.json
- [ ] necesito el storage com a permission?? o no? -> //em sera UTIL per recordar l'ultim video i no repetirlo per exemple..., o per recordar el checkbox de WL?...


### popup
- [ ] mirar el funcionament de quan esta a una playlist.. tant del checkbox com dels ifs. pq si esta a una playlist normal o directament a la de WL surt lu mateix (i tb el checkbox...)
- [ ] Shauria de separar playlist random de la WL??? tipu tenir en compte o no? ... 
- [x] HAVE to create a random numer generator... (to pick one from 0 to .length of the playlist)
    - [X] Create an script (with exectueScript??) to make all that?
- The fucking chechbox shouldnt appear always...
    - if we're in the WL playlist, the checkbox shouldnt appear.... !!!!!!!!!!!!!!!
    - if it appears, we shouldnt be in WL page (have to do that..)

---
## extra:
- [ ] if there are many videos in the playlist it might take a few seconds longer
- [ ] try to reduce that time...
    - also at loading the WL page to choose the video and then opening a video... is like double loading... try to reduce that time if notorious
- [ ] also try to reduce loading time (i think its difficult bc it has to load 2 pages...)
- [X] i dont know if i reppeat so much code have to check and try to reduce
- [ ] the video doesnt play automatically... it should? or better like this?...
---
## errors to fix:
- [X] if i opened a video and then i dont close the popup, if i click the video again it doesnt work.. it freezzes (I THINK I FIXED IT.. NOT SURE)
- [ ] check what happens if the playlist (WL) is empty
- [X] ok.. fuck.. great error... if im in a playlist sometimes the "id" is: ytd-playlist-panel-video-renderer and not "ytd-playlist-video-renderer" (with the "panel" as an extra...) (FIXED)
- [x] checkbox doesnt work.. (it goes directly to WL page.. ). its strange bc if i pick it already in WL page's it works well.. but if i pick it from a video doesnt work..
    - the checkbox works well if i'm in yt main's page.. .but -> (see next errror)
- [x] the normal button (without checkbox) doesent work from yt main's page.... (it also stays at WL main page)
    - [ ] okei sometimes it doesnt work.. so i didnt fixed at all...
- [ ] dont know if its an error.. but if i close the popup while loading (all the process...) it cuts.. i think its normal, but try to automatizate

---

#### comit changes name:
 ` upload TODO's file `