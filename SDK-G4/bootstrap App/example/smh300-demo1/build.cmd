@echo off
title builder

if not exist dist mkdir dist
cd src
dir /b /a-d *.html > HTML_EXAMPLE_FILES
for /f "tokens=*" %%a in (HTML_EXAMPLE_FILES) do (
  move %%a app.html
  tar -cf %%~na.tar app.html manifest.xml logger.js style.css font-awesome.css fontawesome-webfont.woff NFC_logo_black.png
  move %%~na.tar ../dist
  move app.html %%a
  del HTML_EXAMPLE_FILES
)
