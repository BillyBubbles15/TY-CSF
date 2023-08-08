const clientId = '978583e9009642c6a2266335ffc31b5c';
const clientSecret = '827725f05146436886f3dd48b87a8a1a';
const refreshToken = 'AQCqJ0Mp22T4i5DGpG6x-pseQA-oWtbW4tR_D7LDE1OuvmDqx8E062OY1EYbJ1Ec8LakxQ5Dk1B674SMRaHm0OeK9x1ZeCsE0YXQsOGpl7TiZKRR_qENnz1kWJ52VEGOQX0';


const getAccessToken = async () => {
  try {
    const authString = `${clientId}:${clientSecret}`;
    const base64AuthString = btoa(authString);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64AuthString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });

    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
    
  } catch (error) {
    console.error('Error getting access token:', error.message);
  }
};

var accessToken;
var prevTrackName = "";
var prevArtistName = "";
var prevDeviceName = "";

let userToken = getAccessToken();
userToken.then(function (result) {
  console.log(' Access:', result)
  accessToken = result; // Store the access token globally
  setInterval(updateCurrentlyPlayingTrack, 7000); // Call the function periodically
});

function updateCurrentlyPlayingTrack() {
  getCurrentlyPlayingTrack(accessToken);
}

function getCurrentlyPlayingTrack(accessToken) {
  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/me/player/currently-playing?market=ES",
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    success: function (data) {
      console.log(data);

      // Check if the data object contains information about the currently playing track
      if (!data || !data.item) {
        // Display "Nothing is playing" message
        var message = "Atharva is not listening to anything on spotify currently";
        var artworkID = document.getElementById('trackArtwork');
        var track = document.getElementById('trackName');
        var artist = document.getElementById('artist');
        var device = document.getElementById('device');

        artworkID.innerHTML = '<img src="spotify.png" alt="" onclick="redirectToSpotify()">';
        track.textContent = message;
        artist.textContent = "That is rare"; // Remove the previous artist name
        device.textContent = ""; // Remove the previous device name

        return; // Exit the function as there is no currently playing track
      }

      // If there is a currently playing track, update the DOM with the track information
      var artwork = data.item.album.images[1].url;
      var trackName = data.item.name;
      var artistName = data.item.artists[0].name;
      var dName = data.item.popularity;

      var artworkID = document.getElementById('trackArtwork');
      var track = document.getElementById('trackName');
      var artist = document.getElementById('artist');
      var device = document.getElementById('device');

      // Check if the values have changed before updating the DOM
      if (trackName !== prevTrackName) {
        artworkID.innerHTML = '<img src=' + artwork +  ' alt="Album Artwork" onclick="redirectToSpotify(\'' + data.item.album.id + '\')">';
        track.textContent = trackName;
        prevTrackName = trackName;
      }
      if (artistName !== prevArtistName) {
        artist.textContent = 'By ' + artistName;
        prevArtistName = artistName;
      }

      if (dName !== prevDeviceName) {
        device.textContent = dName;
        prevDeviceName = dName;
      }
    },
    dataType: "json"
  });
}



