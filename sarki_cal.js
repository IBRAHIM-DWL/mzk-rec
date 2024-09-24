///*
document.addEventListener('DOMContentLoaded', function() {
    calSarki();
});

function calSarki() {
    fetch('sarki_cal.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('playerContainer').innerHTML = data;
    })
    .catch(error => {
        console.error('Hata:', error);
    });
}

// YouTube iframe API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // Şarkı bittiğinde sayfayı yeniden yükle
        window.location.reload();
    }
}
//*/


/*
        // YouTube iframe API
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            // Şarkı bittiğinde sayfayı yeniden yükle
            window.location.reload();
        }
    }

    */