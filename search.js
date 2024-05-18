
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
    return data.access_token;
}

// Function to search for a song using the Spotify API
async function searchSong(songName, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
    return data;
}

// Function to handle search button click
function search() {
    const songName = document.getElementById('songName').value;
    const clientId = '99ce520ef33240c5b862411ec3043aa7';
    const clientSecret = '126b6c040a2a44fa8fb61501c539a4d7';
    const accessToken='BQB8wgHieIwvsLY1VS4xJ9fXUUDtYW533763LOMl8Vd12EJQF21YptYiniuXH3kuI_XUtMyxXTrBqnitEK6rRm8NpwvKi0bQ84wgQau1cofeYJoB-v0';
    getAccessToken(clientId, clientSecret)
        .then(accessToken => {
            return searchSong(songName, accessToken);
        })
        .then(data => {
            // Assuming the first search result is the desired song
            console.log(data);
            const songURI = data.tracks.items[0].uri;
            const songID = data.tracks.items[0].id;
            console.log(data.tracks.items);
            const songLink = `https://open.spotify.com/embed/track/${songID}`;
            document.getElementById('spotifyPlayer').src = songLink;
            const img=document.querySelector(".card-img");
            const titale=document.querySelector(".card-title");
            const date=document.querySelector(".card-Date");
            const firstTrack = data.tracks.items[0];
            img.src=firstTrack.album.images[0].url;
            titale.innerHTML=firstTrack.album.name;
            
            // console.log("img--->",img.src);

// Access the album information
const album = firstTrack.album;

    //  console.log(firstTrack.album);
    const card_info=document.querySelector(".card-info");
    card_info.innerHTML=`Singer: ${album.artists[0].name}`;
    card_info.style.opacity=1;
    date.innerHTML=`release Date : ${album.release_date}`;
    // console.log("author ->",album.artists[0].name);
    console.log("Date ->",album.release_date);
     
      console.log(firstTrack.album.images[0].url);
    //   console.log(firstTrack.album.images);
       console.log(songLink);
            createSpotifyPlayer(songLink, data);
            while (spotifyPlayerContainer.firstChild) {
                spotifyPlayerContainer.removeChild(spotifyPlayerContainer.firstChild);
            }
            spotifyPlayerContainer.appendChild(spotifyPlayer);
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
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

let trackList = ["4ITtnvLQ6SOA8XhiqkLa24","3ht7pLDpBgbIehuyfIn3mL","3SDgHr72dJmr27JRvFUBZU","7cmNKVV2YPxhqJ0ORRhrRW"]; // Array to store track URIs or IDs
let currentTrackIndex = 0; // Index of the currently playing track

function playNextSong() {
    if (currentTrackIndex < trackList.length - 1) {
        currentTrackIndex++; // Move to the next track
    } else {
        currentTrackIndex = 0; // Wrap around to the beginning of the tracklist if at the end
    }

    const nextTrackUri = trackList[currentTrackIndex]; // Get the URI or ID of the next track
    const nextSongLink = generateSongLink(nextTrackUri); // Generate the song link for the next track
    playSong(nextSongLink); // Play the next song
}

function generateSongLink(trackUri) {
    // Logic to generate the song link using the track URI or ID
    return `https://open.spotify.com/embed/track/${trackUri}`;
}

function playSong(songLink) {
    const player = document.getElementById('spotifyPlayer');
    player.src = songLink;
}

function playPreviousSong() {
    // Add logic to play the previous song
}
//
function search1(song_name) {
    const songName = song_name;
    const clientId = '99ce520ef33240c5b862411ec3043aa7';
    const clientSecret = '126b6c040a2a44fa8fb61501c539a4d7';
    const accessToken='BQB8wgHieIwvsLY1VS4xJ9fXUUDtYW533763LOMl8Vd12EJQF21YptYiniuXH3kuI_XUtMyxXTrBqnitEK6rRm8NpwvKi0bQ84wgQau1cofeYJoB-v0';
    getAccessToken(clientId, clientSecret)
        .then(accessToken => {
            return searchSong(songName, accessToken);
        })
        .then(data => {
            // Assuming the first search result is the desired song
            const songURI = data.tracks.items[0].uri;
            const songLink = `https://open.spotify.com/embed/track/${songURI.split(':')[2]}`;
            document.getElementById('spotifyPlayer').src = songLink;
            const img=document.querySelector(".card-img");
            const titale=document.querySelector(".card-title");
            const date=document.querySelector(".card-date");
            const firstTrack = data.tracks.items[0];
            img.src=firstTrack.album.images[0].url;
            titale.innerHTML=firstTrack.album.name;
            
            // console.log("img--->",img.src);

// Access the album information
const album = firstTrack.album;

    //  console.log(firstTrack.album);
    const card_info=document.querySelector(".card-info");
    card_info.innerHTML=`Singer: ${album.artists[0].name}`;
    card_info.style.opacity=1;
    data.innerHTML=album.release_date;
    // console.log("author ->",album.artists[0].name);
    console.log("Date ->",album.release_date);
     
      console.log(firstTrack.album.images[0].url);
       console.log(songLink);
            createSpotifyPlayer(songLink, data);
            while (spotifyPlayerContainer.firstChild) {
                spotifyPlayerContainer.removeChild(spotifyPlayerContainer.firstChild);
            }
            spotifyPlayerContainer.appendChild(spotifyPlayer);
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



function startPlayback() {
    // Add logic to start playback using the Spotify API
    // You need to call the appropriate Spotify API endpoint to start playing the song
}
// Replace 'YOUR_ACCESS_TOKEN' with the actual access token

// function getUserPlaylists() {
//     const apiUrl = 'https://api.spotify.com/v1/me/playlists';

//     // Make a GET request to the Spotify Web API to fetch user's playlists
//     fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken
//         }
//     })
//     .then(response => {
//         // Check if the response is successful
//         if (response.ok) {
//             // Parse the JSON response
//             return response.json();
//         }
//         throw new Error('Failed to fetch user playlists');
//     })
//     .then(data => {
//         // Handle the retrieved playlists data
//         console.log('User Playlists:', data);
//         // Process the playlists data as needed
//     })
//     .catch(error => {
//         // Handle any errors that occur during the fetch request
//         console.error('Error fetching user playlists:', error);
//     });
// }

// // Call the function to fetch user's playlists
// getUserPlaylists();


// This function fetches the access token from Spotify
// async function getAccessToken(clientId, clientSecret) {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
//         },
//         body: 'grant_type=client_credentials'
//     });
//     if (!response.ok) { throw new Error('Failed to fetch access token'); }
//     const data = await response.json();
//     console.log(data.access_token);
//     return data.access_token;
// }

// // This function uses the access token to search for a song on Spotify
// async function searchSong(songName, accessToken) {
//     const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`, {
//         method: 'GET',
//         headers: { 'Authorization': 'Bearer ' + accessToken }
//     });
//     if (!response.ok) { throw new Error('Failed to search song'); }
//     const data = await response.json();
//     return data;
// }

// // Handles search functionality and UI updates
// async function search() {
//     const songName = document.getElementById('songName').value;
//     const clientId = '99ce520ef33240c5b862411ec3043aa7';
//     const clientSecret = '126b6c040a2a44fa8fb61501c539a4d7';
//     // const clientId = '99ce520ef33240c5b862411ec3043aa7';
// //     const clientSecret = '126b6c040a2a44fa8fb61501c539a4d7';

//     try {
//         const accessToken = await getAccessToken(clientId, clientSecret);
//         const data = await searchSong(songName, accessToken);
//         updateUI(data.tracks.items[0]); // Assuming first search result is the desired song
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Updates the UI with track details and the Spotify player
// function updateUI(track) {
//     const songURI = track.uri;
//     const songLink = `https://open.spotify.com/embed/track/${songURI.split(':')[2]}`;

//     document.getElementById('spotifyPlayer').src = songLink;

//     const img = document.querySelector(".card-img");
//     const title = document.querySelector(".card-title");
//     const cardInfo = document.querySelector(".card-info");

//     img.src = track.album.images[0].url;
//     title.innerHTML = track.album.name;
//     cardInfo.innerHTML = `Singer: ${track.album.artists[0].name}<br>Date: ${track.album.release_date}`;
//     cardInfo.style.opacity = 1;
// }

// Consider adding the logic for `startPlayback` and `pausePlayback` here.
