nsIScreenshot interface Reference
=================================

-   void captureObject ( in nsIDOMWindow aWindow, in AUTF8String aOuputPath, in AUTF8String aMimetype, in unsigned long aRotationAngle)

Detailed Description
--------------------

The nsIScreenshot interface can only be used on SMH300 and DMB400.

void nsIScreenshot::captureObject (in nsIDOMWindow aWindow, in AUTF8String aOuputPath, in AUTF8String aMimetype, in unsigned long aRotationAngle)
-------------------------------------------------------------------------------------------------------------------------------------------------

Captures a picture from top left corner from the Window object. Picture size is 800x600 pixels on SMH300. Downscaling from display mode is performed on DMB400.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aWindow</td>
<td align="left"><p>Global DOM object Window</p></td>
</tr>
<tr class="even">
<td align="left">aOutputPath</td>
<td align="left"><p>Output path</p></td>
</tr>
<tr class="odd">
<td align="left">aMimetype</td>
<td align="left"><p>Mime type of the output picture (supported: &quot;image/jpeg&quot; on all plateforms, &quot;image/g4&quot; only on SMH300). If null, choose default Mime type according to platform (supports)</p></td>
</tr>
<tr class="even">
<td align="left">aRotationAngle</td>
<td align="left"><p>Specifies a rotation in degrees for the capture (supported: 0, 90, 180 and 270)</p></td>
</tr>
</tbody>
</table>

The function is used like below in Javascript.

    var screenshot = new Screenshot();
    var path = "/tmp/screenshot/img.ppk";
    screenshot.captureObject(window, path, "image/g4", 0);

Complete HTML example [here.](example1.html)

**Build note**: You need to execute the **build.cmd** file to generate the boostrap app. Otherwise there will be a mismatch between the html file name and the one the manifest tries to launch. Find more information in *SDK-G4/bootstrap App/* documentation.
