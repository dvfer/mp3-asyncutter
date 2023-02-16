const MP3Asyncutter = require('./lib/asyncutter.js')

MP3Asyncutter.asyncut({
    srcInput:'sound1.mp3', 
    srcOutput: 'sound1-out.mp3',
    start: 4, 
    end:9, 
});