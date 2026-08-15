function openVideo(videoUrl, newTab=false){ //function to avoid repeating the same code to open the video 
    //i use the return to be able to use .then after calling this function
    if (newTab){
    return browser.tabs.create({ url: videoUrl });

    } else {
    return browser.tabs.update({ url: videoUrl });

    }
}

async function pickRandomVideo(){ //try async function????????????????????????............................. to retry X times until saying video not found
    //this is gonna run inside youtube page, so i cannot use anything about the popup.html....

    const maxRetries = 20;
    const delay = 250;

    for (let i = 0; i<maxRetries; i++){
    let videos = document.querySelectorAll('ytd-playlist-video-renderer, ytd-playlist-panel-video-renderer');
    //and i should make the scroll also.. butt to be do it later when all this works (it seems i dont need it... have tocheck)
    
    if (videos.length > 0){
        let n = Math.floor(Math.random() * videos.length);

        return videos[n].querySelector('a[href*="/watch"]').href;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay)); //AI gave me this... :(  -> if yt hasn't charged the videos yet, wait 250ms and try again)   
    }
    return null;
}

function loadingTab(newTab){ //not sure if this actually works correctly!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! to check....
    
    function waitForTabLoad(tabID, tabStatus) { //first one is the actual page that has changed, the second one is the status of the tab...
    if (tabID === newTab.id && tabStatus.status === "complete") { //check if the tab is the tab we want, and ALSO if it has uploaded correctly until being compelte

        browser.tabs.onUpdated.removeListener(waitForTabLoad); //necessary to remove the listener.. because if not it wouldnt stop never... and consume a lot of resources...

        browser.scripting.executeScript({ //it exectues the function func in the target (witch is the yt page (w the playlist))
        target: { tabId: tabID }, //i dont know if this "tab" interfires with the main tab used upper...
        func: pickRandomVideo
        }).then(function(link) {
        if (link[0].result === null){
            statusText.innerText = "No video found, check if the playlist isn't empty and try again";
        } else {
            openVideo(link[0].result); //now it has to open in the same page, that's why there's not the 'true'        
            statusText.innerText = "Video correctly loaded!";
        }

        });
    
    }
    }

    browser.tabs.onUpdated.addListener(waitForTabLoad);
}


browser.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    if (message.type === 'newTab'){
        browser.tabs.create({ url: message.url }).then(loadingTab);

        //sendResponse(video); //it'd be the link[0] i think
    }
});