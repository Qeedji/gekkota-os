#  Video decoding group

The video decoding group is a CSS property allowing to share decoding instances between several HTMLVideoElements.
Every element with the same property value is sharing **one** decoding instance.

**Requirement**: the preference "innes.video.decoding-group.enabled" must be enabled or the CSS property will not be considered.

| Property name  | type | value |
|----------------|------|-------|
| -gkt-video-decoding-group | String   | Any string value |

Use it like any other CSS property:

````css
#video_container {
    position: absolute;
    left: 0px;
    width: 100%;
    -gkt-video-decoding-group:"decoding_group_name";
}
````

In this example, all HTMLVideoElements in "video_container" are sharing one decoding instance.

````js
video_sequence = document.getElementById("video_container");

video_1 = document.createElement('video');
video_sequence.appendChild(video_1);
video_1.src = "file_1.mp4";                 // video_1 takes the decoding instance
video_1.play();                             // first frame of video_1 is displayed

video_2 = document.createElement('video');
video_sequence.appendChild(video_2);
video_2.src = "file_2.mp4";                 // video_2 takes the decoding instance. video_1 stops playing and still displays its last decoded frame
video_2.play();                             // first frame of video_2 is displayed

video_sequence.removeChild(video_1);        // other resources used by video_1 will be released asynchronously
````

You can find [here](example1.html) a complete HTML example using decoding groups to manage several video sequences.

**Build note**: You need to execute the **build.cmd** file to generate the boostrap app. Otherwise there will be a mismatch between the html file name and the one the manifest tries to launch. Find more information in *SDK-G4/bootstrap App/* documentation.