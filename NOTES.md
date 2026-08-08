
To mantain the code clean... I'll put here some info / research that i think it's interesting or usefull

---
### Script to get the video URL
>i figured (inspecting the yt WL page) that all the videos are in blocks/elements named: `"ytd-playlist-video-renderer"` (or `ytd-playlist-panel-video-renderer` if in a video of&inside a playlist)
    > and if i type: `document.querySelectorAll('ytd-playlist-video-renderer')` in the console i'm able to see all the videos (well.. not all, only the first 100..., have to fix that) -> if i scroll down a little it fixes so im gonna have to put a mini scroll in the script? or somethig
    > if i type the same .length i can see how many videos are there... (to choose a random number bettween 0 and that number)

>i keep investigating (and searching on google...) and now i know that once i have the video i want ( `document.querySelectorAll('ytd-playlist-video-renderer')[n]` ) i can get easily the link adding: `.querySelector('a#video-title').href` 
    >> explanation: the link is always in the href on the a "block", but there are different a blocks, the one we are interested in is the video-title one
        > so it would end up like this: `document.querySelectorAll('ytd-playlist-video-renderer')[n].querySelector('a#video-title').href`    || where n is a random number between 0 and document.querySelectorAll('ytd-playlist-video-renderer').length
        > ok.. i've changed the language and now video-title doesnt appear.. i suppose i have to use only a whithout any id name...
         >>>   i could use: `'a[href*="/watch"]'` -> this searches one that has got /watch in the href.. (/watch opens automatically a video...)

---