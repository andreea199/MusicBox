var Audio = {
    gainNode: undefined, //used to control volume
    bufferList: undefined, //an array holding the sounds to play
    audioContext: new (window.AudioContext ||  //the object that knows how to decode binary audio data and make the browser play a sound
                       window.webkitAudioContext)(),
    init: function(bufferList) { //init the audio obj with the sounds it needs to play
        this.bufferList = bufferList;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 1; //1 max volume
        this.gainNode.connect(this.audioContext.destination);
    },
    play: function(i) {
        var sound = this.audioContext.createBufferSource();
        sound.connect(this.gainNode);
        sound.buffer = this.bufferList[i];
        sound.start(0);
        sound.stop(this.audioContext.currentTime + 18);
    }
};