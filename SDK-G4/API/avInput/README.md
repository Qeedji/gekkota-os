# avInput

Some Qeedji devices have audio/video inputs (for example a HDMI input on DMB400).
To activate the input and receive the audio/video signal, use the following URN as source attribute of a HTML media element:

**urn:innes:av-input:`<index>`#`<arguments>`**

  * `<index>`: index of the avInput, starts at 1 and is optionnal (value is 1 by default)
  * `<arguments>`: list of optionnal arguments

Examples for video and audio elements:

````javascript
<video src="urn:innes:av-input"> </video>
<video src="urn:innes:av-input:1"> </video>
<audio src="urn:innes:av-input"> </audio>
<audio src="urn:innes:av-input:2"> </audio>
````
Test code:
````javascript
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test av-input</title>
</head>
<body>
<video src="urn:innes:av-input"></video>
</body>
</html>
````
Remark: when the audio/video signal is lost, the HTMLMediaElement sends a MediaError. Setting again the src attribute is not sufissant to restart it. It must be destroyed or removed from the DOM and a new HTMLMediaElement with src="urn:innes:av-input" must be created to capture the the audio/video signal again.