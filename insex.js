const arrow = document.querySelector(".icons");
let changearrow1 = false;
const side_bar = document.querySelector(".side-bar");
// setTimeout(()=>{
// window.location="login.html";
// },5000);
const songarr=['abc','xyz','pqrs'];
var i=0;
const next=document.querySelector(".next");
next.addEventListener("click",()=>{
 console.log(songarr[i]);
i=i+1;
});


arrow.addEventListener("click", () => {
    console.log("hello");
    if (!changearrow1) {
        document.querySelector(".arrow").classList.remove("fa-arrow-right");
        document.querySelector(".arrow").classList.add("fa-arrow-left");
        side_bar.style.width = "500px";
        changearrow1 = true;
    } else {
        document.querySelector(".arrow").classList.remove("fa-arrow-left");
        document.querySelector(".arrow").classList.add("fa-arrow-right");
        side_bar.style.width = "340px";
        changearrow1 = false;
    }
});
let audio = document.getElementById('audio');
let progress = 0;
let pl = false; // Variable to track playback state
const play = document.querySelector(".play");
const like=document.querySelector(".song-like");
const likebtn=document.querySelector(".like");

like.addEventListener("click",()=>{
    

        likebtn.style.color = "palevioletred";
    
    
});
// const side_bar = document.querySelector(".sidebar"); // Assuming you have a sidebar with class 'sidebar'

// Function to update progress bar
function updateProgress() {
    if (audio.currentTime < audio.duration) {
        // Calculate progress percentage based on current playback time
        progress = (audio.currentTime / audio.duration) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
        setTimeout(updateProgress, 1000); // Update every second
    } else {
        // If audio reaches the end, reset the progress and change button icon
        progress = 0;
        document.querySelector('.progress').style.width = `${progress}%`;
        play.classList.add("fa-play");
        play.classList.remove("fa-pause");
        pl = false; // Reset playback state
    }
}

// Event listener for play/pause button
play.addEventListener('click', function() {
    if (!pl) {
        // If not playing, start playing
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
        updateProgress();
        audio.play();
        pl = true; // Update playback state
    } else {
        // If playing, pause
        audio.pause();
        play.classList.add("fa-play");
        play.classList.remove("fa-pause");
        pl = false; // Update playback state
    }
});

const respbar=document.querySelector(".fa-bars");
var t=false;
respbar.addEventListener("click",()=>{
    if(t){
        side_bar.style.display= "block";
        
        side_bar.style.width = `90%`;
        t=!t;
    }else{
        side_bar.style.display= "none";
        t=!t;

    }
    let width = window.innerWidth;
    console.log(width);
});
// Get all the cards
const cards = document.querySelectorAll(".card");

// Loop through each card and attach the event listener
cards.forEach(card => {
    card.addEventListener("dblclick", () => {
        window.location = "playlist.html";
    });
});
let songsarr=[
    {
         img:'3-Idiots.jpg',
         title:'GIVE ME SOME SUNSHINE',
         src:'Give Me Some Sunshine - (Raag.Fm).mp3'

    },
    {
         img:'Animal.jpg',
         title:'Jamal Kudu',
         src:'Jamal-Kudu(PagalWorldl).mp3'

    },
    {
         img:'Duniyadari (Original Motion Picture Soundtrack).jpeg',
         title:'Duniyadari',
         src:'jindagy.mp3'

    }
]
// song-img-img,song-info-title
let sg=0;
const nexttitile=document.querySelector(".song-info-title");
const nextimg=document.querySelector(".song-img-img");
const nextplay=document.querySelector(".next-song");
const prevplay=document.querySelector(".prev-song");

nextplay.addEventListener("click",()=>{
   if (sg<songsarr.length) {
    nextimg.src=songsarr[sg].img;
    nexttitile.innerHTML=songsarr[sg].title;
    audio.src=songsarr[sg].src;
    sg++;
   }else{
    sg=0;
   }
})
prevplay.addEventListener("click",()=>{
   if (sg<songsarr.length) {
    nextimg.src=songsarr[sg].img;
    nexttitile.innerHTML=songsarr[sg].title;
    audio.src=songsarr[sg].src;
    sg++;
   }else{
    sg=0;
   }
})