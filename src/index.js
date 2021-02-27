import Controls from "./modules/controls.js";

const source = {
    dash: 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd',
    hls: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    poster: 'https://bitmovin-a.akamaihd.net/content/sintel/poster.png',
};

if (Hls.isSupported()) {
    var video = document.getElementById('video');
    var hls = new Hls();

    hls.attachMedia(video);
    video.poster = source.poster;

    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls.loadSource(source.hls);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            Controls.init(video, { progressBar: true });
        });

        hls.on(Hls.Events.SUBTITLE_TRACK_LOADED, onSubtitleTrackChanged);
        hls.on(Hls.Events.SUBTITLE_TRACK_SWITCH, onSubtitleTrackChanged);
        
        hls.on(Hls.Events.AUDIO_TRACK_LOADED, onAudioTrackChanged);
        hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, onAudioTrackChanged);
    });

    const onSubtitleTrackChanged = () => {
        const activeId = hls.subtitleTrack;
        const subtitleTracks = hls.subtitleTracks.map(track => ({ 
            id: track.id,
            name: track.name,
            setCallback: id => { hls.subtitleTrack = id; },
            active: (activeId === track.id)
        }));
        Controls.refresh({ subtitleTracks });
    };

    const onAudioTrackChanged = () => {
        const activeId = hls.audioTrack;
        const audioTracks = hls.audioTracks.map(track => ({
            id: track.id,
            name: `${track.name} (${track.groupId})`,
            setCallback: id => { hls.audioTrack = id; },
            active: (activeId === track.id)
        }));
        Controls.refresh({ audioTracks });
    }
}