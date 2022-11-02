@echo off
title builder

if not exist dist mkdir dist
cd src
dir /b /a-d *.html > HTML_EXAMPLE_FILES
for /f "tokens=*" %%a in (HTML_EXAMPLE_FILES) do (
  move %%a app.html
  "C:\Program Files\7-Zip\7z.exe" a -tzip %%~na.gap app.html manifest.xml innes-2018.png
  move %%~na.gap ../dist
  move app.html %%a
  del HTML_EXAMPLE_FILES
)
