let currentTrackIndex = 0;
let playlistTracks = [];
var accesstocken1='';
async function getAccessToken(clientId, clientSecret) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    console.log("access :",data.access_token);
    accesstocken1=data.access_token;
    return data.access_token;
}

async function searchPlaylist(playlistId, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    if (response.status === 401) {
        // Token expired, refresh it
        console.log('Access token expired. Refreshing...');
        const newAccessToken = await getAccessToken(clientId, clientSecret);
        return searchPlaylist(playlistId, newAccessToken);
    }

    const data = await response.json();
    return data;
}

// Function to handle search button click
function search() {
    const playlistId = document.getElementById('songName').value;
    document.getElementById('songName').value='';
    console.log(playlistId);
    // const  ='37i9dQZF1DX163rJoVPJH7';
    const clientId = '99ce520ef33240c5b862411ec3043aa7';
    const clientSecret = '126b6c040a2a44fa8fb61501c539a4d7';
    const accessToken = 'BQB8wgHieIwvsLY1VS4xJ9fXUUDtYW533763LOMl8Vd12EJQF21YptYiniuXH3kuI_XUtMyxXTrBqnitEK6rRm8NpwvKi0bQ84wgQau1cofeYJoB-v0';

    getAccessToken(clientId, clientSecret)
        .then(accessToken => {
            // accesstocken1=accessToken;
            return searchPlaylist(playlistId, accessToken);
        })
        .then(data => {
            console.log('Playlist Data:', data);
            console.log('Playlist Name :', data.name);
            const playlistimg=document.querySelector(".playupper-img1");
            const playtitle=document.querySelector(".play-title");
            playtitle.innerHTML= data.name;
            const dis=document.querySelector(".playlist-main");
            dis.style.display= "block";
            console.log('Playlist photo link :', data.images[0].url);
            playlistimg.src=data.images[0].url;
            console.log('Playlist Name :', data.tracks.items[0]);
            displaySongNames(data);
            playlistTracks = data.tracks.items;
            // const songURI = data.tracks.items[0].external_urls.spotify;
            // const songLink = `https://open.spotify.com/embed/track/${songURI.split(':')[2]}`;
            // console.log(songURI);
            // createSpotifyPlayer(songLink, data);
            // playCurrentTrack();
            // Process the playlist data as needed images
            // createSpotifyPlayer(songURI, data);
            // while (spotifyPlayerContainer.firstChild) {
            //     spotifyPlayerContainer.removeChild(spotifyPlayerContainer.firstChild);
            // }
            // spotifyPlayerContainer.appendChild(spotifyPlayer);
        })
        .catch(error => {
            console.error('Error searching playlist:', error);
        });
}

// search();
const songovter=document.querySelector(".playlist-ul");
const songdiv=document.querySelector(".song-box");
// const songimg=document.querySelector(".song-box-img");
const songList=document.querySelector(".song-box-p");

function displaySongNames(playlistData) {
    const tracks = playlistData.tracks.items;
    
    tracks.forEach(track => {
        const songName = track.track.name;
        const listItem = document.createElement('a');
        const listdiv= document.createElement('div');
        // const listmig= document.createElement('img');
        listdiv.classList.add("song-box");
        listItem.textContent = songName;
        listItem.classList.add("song-box-p");
        listdiv.appendChild(listItem);
        songovter.appendChild(listdiv);
        const songLink1 = track.track.external_urls.spotify;
        // songLink12=songLink1;
        // createSpotifyPlayer(songLink, playlistData);
        console.log(`Song: ${songName}, Link: ${songLink1}`);
    });
   //
   const songDivs = document.querySelectorAll(".song-box");
  songDivs.forEach(songDiv => {
    songDiv.addEventListener("click", () => {
        var songTitle11 = songDiv.querySelector('.song-box-p').innerText;
        console.log("hello :",songTitle11);
       searchSong(songTitle11, accesstocken1).then(datasong => {

           console.log(datasong);
            const songURI = datasong.tracks.items[0].uri;
            console.log(songURI);
            const songLink = `https://open.spotify.com/embed/track/${songURI.split(':')[2]}`;
            document.getElementById('spotifyPlayer').src = songLink;
        createSpotifyPlayer(songLink,datasong);
            while (spotifyPlayerContainer.firstChild) {
                spotifyPlayerContainer.removeChild(spotifyPlayerContainer.firstChild);
            }
            spotifyPlayerContainer.appendChild(spotifyPlayer);
            console.log(datasong);
       });
    });
  });
   //
};
async function searchSong(songName,accesstocken) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' +accesstocken
        }
    });

    const data = await response.json();
    return data;
}

function startPlayback() {
    // Add logic to start playback using the Spotify API
    // You need to call the appropriate Spotify API endpoint to start playing the song
}

function pausePlayback() {
    // Add logic to pause playback using the Spotify API
    // You need to call the appropriate Spotify API endpoint to pause the playback
}

function createSpotifyPlayer(songLink, trackData) {
    const container = document.createElement('div');
    container.setAttribute('class', 'spotify-player-container');

    const player = document.createElement('iframe');
    player.setAttribute('id', 'spotifyPlayer');
    player.setAttribute('width', '300');
    player.setAttribute('height', '380');
    player.setAttribute('frameborder', '0');
    player.setAttribute('allowtransparency', 'true');
    player.setAttribute('allow', 'encrypted-media');
    player.src = songLink;

    const trackInfo = document.createElement('div');
    trackInfo.innerHTML = `
        <p><strong>Track:</strong> ${trackData.name}</p>
        <p><strong>Artist:</strong> ${trackData.artists[0].name}</p>
        <p><strong>Album:</strong> ${trackData.album.name}</p>
    `;

    const image = document.createElement('img');
    image.setAttribute('src', trackData.album.images[0].url); // Assuming the first image is the album art
    image.setAttribute('alt', 'Album Art');
    image.setAttribute('width', '100');
    image.setAttribute('height', '100');

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => playNextSong());

    const previousButton = document.createElement('button');
    previousButton.textContent = 'Previous';
    previousButton.addEventListener('click', () => playPreviousSong());

    container.appendChild(player);
    container.appendChild(trackInfo);
    container.appendChild(image);
    container.appendChild(previousButton);
    container.appendChild(nextButton);

    return container;
}
// var songdiv1 = document.getElementById('songdiv');
// songdiv.addEventListener("click",()=>{
//     console.log("hello");
// });

// function startPlayback() {
//     // Add logic to start playback using the Spotify API
//     // You need to call the appropriate Spotify API endpoint to start playing the song
// }

// function pausePlayback() {
//     // Add logic to pause playback using the Spotify API
//     // You need to call the appropriate Spotify API endpoint to pause the playback
// }

// function createSpotifyPlayer(songLink, trackData) {
//     const container = document.createElement('div');
//     container.setAttribute('class', 'spotify-player-container');

//     const player = document.createElement('iframe');
//     player.setAttribute('id', 'spotifyPlayer');
//     player.setAttribute('width', '300');
//     player.setAttribute('height', '380');
//     player.setAttribute('frameborder', '0');
//     player.setAttribute('allowtransparency', 'true');
//     player.setAttribute('allow', 'encrypted-media');
//     player.src = songLink;

//     const trackInfo = document.createElement('div');
//     trackInfo.innerHTML = `
//         <p><strong>Track:</strong> ${trackData.name}</p>
//         <p><strong>Artist:</strong> ${trackData.artists[0].name}</p>
//         <p><strong>Album:</strong> ${trackData.album.name}</p>
//     `;

//     const image = document.createElement('img');
//     image.setAttribute('src', trackData.album.images[0].url); // Assuming the first image is the album art
//     image.setAttribute('alt', 'Album Art');
//     image.setAttribute('width', '100');
//     image.setAttribute('height', '100');

//     const nextButton = document.createElement('button');
//     nextButton.textContent = 'Next';
//     nextButton.addEventListener('click', () => playNextSong());

//     const previousButton = document.createElement('button');
//     previousButton.textContent = 'Previous';
//     previousButton.addEventListener('click', () => playPreviousSong());

//     container.appendChild(player);
//     container.appendChild(trackInfo);
//     container.appendChild(image);
//     container.appendChild(previousButton);
//     container.appendChild(nextButton);

//     return container;
// }

// function playCurrentTrack() {

//     if (currentTrackIndex >= 0 && currentTrackIndex < playlistTracks.length) {
//         const trackData = playlistTracks[currentTrackIndex].track;
//         const songLink = trackData.external_urls.spotify;
//         createSpotifyPlayer(songLink, trackData);
//     } else {
//         console.log('End of playlist');
//     }
// }

// function playNextSong() {
//     currentTrackIndex++;
//     playCurrentTrack();
// }

// function playPreviousSong() {
//     currentTrackIndex--;
//     playCurrentTrack();
// }

// function createSpotifyPlayer(songLink, trackData) {
//     const container = document.createElement('div');
//     container.setAttribute('class', 'spotify-player-container');

//     const player = document.createElement('iframe');
//     player.setAttribute('id', 'spotifyPlayer');
//     player.setAttribute('width', '300');
//     player.setAttribute('height', '380');
//     player.setAttribute('frameborder', '0');
//     player.setAttribute('allowtransparency', 'true');
//     player.setAttribute('allow', 'encrypted-media');
//     player.src = songLink;

//     const trackInfo = document.createElement('div');
//     trackInfo.innerHTML = `
//         <p><strong>Track:</strong> ${trackData.name}</p>
//         <p><strong>Artist:</strong> ${trackData.artists[0].name}</p>
//         <p><strong>Album:</strong> ${trackData.album.name}</p>
//     `;

//     const image = document.createElement('img');
//     image.setAttribute('src', trackData.album.images[0].url); // Assuming the first image is the album art
//     image.setAttribute('alt', 'Album Art');
//     image.setAttribute('width', '100');
//     image.setAttribute('height', '100');

//     const nextButton = document.createElement('button');
//     nextButton.textContent = 'Next';
//     nextButton.addEventListener('click', () => playNextSong());

//     const previousButton = document.createElement('button');
//     previousButton.textContent = 'Previous';
//     previousButton.addEventListener('click', () => playPreviousSong());

//     container.appendChild(player);
//     container.appendChild(trackInfo);
//     container.appendChild(image);
//     container.appendChild(previousButton);
//     container.appendChild(nextButton);

//     const spotifyPlayerContainer = document.getElementById('spotifyPlayerContainer');
//     spotifyPlayerContainer.innerHTML = ''; // Clear previous content
//     spotifyPlayerContainer.appendChild(container);
// }
// function createSpotifyPlayer(songLink, trackData) {
//     const container = document.createElement('div');
//     container.setAttribute('class', 'spotify-player-container');

//     const player = document.createElement('iframe');
//     player.setAttribute('id', 'spotifyPlayer');
//     player.setAttribute('width', '300');
//     player.setAttribute('height', '380');
//     player.setAttribute('frameborder', '0');
//     player.setAttribute('allowtransparency', 'true');
//     player.setAttribute('allow', 'encrypted-media');
//     player.src = songLink;

//     const trackInfo = document.createElement('div');
//     trackInfo.innerHTML = `
//         <p><strong>Track:</strong> ${trackData.name}</p>
//         <p><strong>Artist:</strong> ${trackData.artists[0].name}</p>
//         <p><strong>Album:</strong> ${trackData.album.name}</p>
//     `;

//     const image = document.createElement('img');
//     image.setAttribute('src', trackData.album.images[0].url); // Assuming the first image is the album art
//     image.setAttribute('alt', 'Album Art');
//     image.setAttribute('width', '100');
//     image.setAttribute('height', '100');

//     const nextButton = document.createElement('button');
//     nextButton.textContent = 'Next';
//     nextButton.addEventListener('click', () => playNextSong());

//     const previousButton = document.createElement('button');
//     previousButton.textContent = 'Previous';
//     previousButton.addEventListener('click', () => playPreviousSong());

//     container.appendChild(player);
//     container.appendChild(trackInfo);
//     container.appendChild(image);
//     container.appendChild(previousButton);
//     container.appendChild(nextButton);

//     return container;
// }
// Assuming playlistData is the playlist data object

// const songName = track.track.name;
//         const listItem = document.createElement('li');
//         listItem.textContent = songName;
//         songList.appendChild(listItem);