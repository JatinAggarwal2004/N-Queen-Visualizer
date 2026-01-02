# Background Music Instructions

Due to copyright restrictions, you'll need to add your own background music file.

## Steps to Add Music:

1. Find a royalty-free soft/calm background music track (recommended sites):
   - https://freesound.org/
   - https://incompetech.com/
   - https://freemusicarchive.org/
   - YouTube Audio Library

2. Download an MP3 file (preferably instrumental, calm, and looping)

3. Rename the file to: `background-music.mp3`

4. Place it in: `src/main/resources/static/audio/background-music.mp3`

## Recommended Music Style:
- Calm, ambient music
- Soft piano or guitar
- Chillhop or lo-fi beats
- Nature sounds with soft music
- Duration: 2-5 minutes (it will loop automatically)

## Alternative:
You can also use any other audio format (WAV, OGG) and update the HTML accordingly in `index.html`:

```html
<audio id="bgMusic" loop>
    <source src="/audio/background-music.mp3" type="audio/mpeg">
    <source src="/audio/background-music.ogg" type="audio/ogg">
</audio>
```
