
// sidebar function code here

var menuIcon= document.querySelector(".toggle-btn");
var sidebar= document.querySelector(".sidebar");

menuIcon.onclick = function(){
    sidebar.classList.toggle("close-sidebar");
}



const videoCardContainer = document.querySelector('.video-container');
// Api used for request 
let api_key="AIzaSyAcSiqUB9zb-7WCBXbSWd4-HZn14MSqLD4";  

//  used for real time video show
let video_http=" https://www.googleapis.com/youtube/v3/videos?";

// used for channel details
let channel_http="https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({
    key: api_key,
    part:'snippet',
    chart:'mostPopular',
    maxResults:15,
    regionCode:'IN'
}))
.then(res => res.json())
.then(data => {
    console.log(data);

    data.items.forEach(item=> {
        getChannelIcon(item);
    })
})

// this code for getting channel icon and id from api

.catch(err => console.log(err));
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key:api_key,
        part:'snippet',
        id:video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        // console.log(video_data);
        makeVideoCard(video_data);
    })
}
 

// this code write for videos 

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href ='https://youtube.com/watch?v=${data.id} '">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail-image" alt="">
        <div class="content">
           <img src="${data.channelThumbnail}" class="channel-icon" alt=""/>
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
    
            </div>
        </div>
    </div>
            `;
}


// search box code here 
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink ="https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
