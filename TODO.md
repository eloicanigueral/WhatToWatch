// To Be Done (or reviewed) tasks:

### manifest.json
- [ ] necesito el storage com a permission?? o no? -> //em sera UTIL per recordar l'ultim video i no repetirlo per exemple..., o per recordar el checkbox de WL?...


### popup
    - mirar el funcionament de quan esta a una playlist.. tant del checkbox com dels ifs. pq si esta a una playlist normal o directament a la de WL surt lu mateix (i tb el checkbox...)
    - Shauria de separar playlist random de la WL??? tipu tenir en compte o no? ... 
    - HAVE to create a random numer generator... (to pick one from 0 to .length of the playlist)
      - Create an script (with exectueScript??) to make all that?
    - The fucking chechbox shouldnt appear always...
        - if we're in the WL playlist, the checkbox shouldnt appear.... !!!!!!!!!!!!!!!
        - if it appears, we shouldnt be in WL page (have to do that..)
    - i dont know if the "tab" used in the "executeScript" interfires with the main tab used upper...

---
## extra:
- if there are many videos in the playlist it might take a few seconds longer
- try to reduce that time...
    - also at loading the WL page to choose the video and then opening a video... is like double loading... try to reduce that time if notorious
- i dont know if i reppeat so much code (mainly with the executeScript...) have to check and try to reduce
- also try to reduce loading time (i think its difficult bc it has to load 2 pages...)
---
## errors to fix:
- if i opened a video and then i dont close the popup, if i click the video again it doesnt work.. it freezzes

---

#### comit changes name:
 ` upload TODO's file `