@echo off
title builder

if not exist dist mkdir dist
dir /b /a-d *.html > HTML_EXAMPLE_FILES
for /f "tokens=*" %%a in (HTML_EXAMPLE_FILES) do (
  move %%a app.html
  tar -cf %%~na.tar app.html manifest.xml logger.js style.css video_1.mp4 video_2.mp4 videoUHD_1.mp4 videoUHD_2.mp4
  move %%~na.tar dist
  move app.html %%a
  del HTML_EXAMPLE_FILES
)