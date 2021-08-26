nsIGktScrollerListener interface Reference
==========================================

-   void onEnded ( )

Detailed Description
--------------------

Interface nsIGktScrollerListener

void nsIGktScrollerListener::onEnded ()
---------------------------------------

Call when scroll is ended

nsIGktScrollerErrorListener interface Reference
===============================================

-   void onError ( )

Detailed Description
--------------------

Interface nsIGktScrollerErrorListener

void nsIGktScrollerErrorListener::onError ()
--------------------------------------------

Call when error occurs

nsIGktScrollerCallbackCanvas interface Reference
================================================

-   void onEnded ( )

Detailed Description
--------------------

Interface nsIGktScrollerCallbackCanvas

void nsIGktScrollerCallbackCanvas::onEnded ()
---------------------------------------------

Call when setCanvasBufferAsync() is completed

nsIGktScroller interface Reference
==================================

Public Attributes
-----------------

-   const unsigned short rightToLeft

<!-- -->

-   const unsigned short leftToRight

<!-- -->

-   const unsigned short bottomToTop

<!-- -->

-   const unsigned short topToBottom

-   void setCanvasBuffer ( in nsIDOMHTMLCanvasElement aCanvas)

<!-- -->

-   void start ( )

<!-- -->

-   void play ( )

<!-- -->

-   void pause ( )

<!-- -->

-   void destroy ( )

<!-- -->

-   void setCanvasBufferAsync ( in nsIDOMHTMLCanvasElement aCanvas, in nsIGktScrollerCallbackCanvas aCallback)

Detailed Description
--------------------

Interface XPCOM nsIGktScroller Constructor

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aListener</td>
<td align="left"><p>nsIGktScrollerListener</p></td>
</tr>
<tr class="even">
<td align="left">aErrorListener</td>
<td align="left"><p>nsIGktScrollerErrorListener</p></td>
</tr>
<tr class="odd">
<td align="left">aParent</td>
<td align="left"><p>nsIDOMHtmlElement the element in witch the text will scroll (p, body, div, span, ...)</p></td>
</tr>
<tr class="even">
<td align="left">aDirection</td>
<td align="left"><p>direction of the scroll (on of constant rightToLeft, ...)</p></td>
</tr>
<tr class="odd">
<td align="left">aPixelsPerSeconds</td>
<td align="left"><p>speed of the scroll</p></td>
</tr>
</tbody>
</table>

Member Data Documentation
-------------------------

void nsIGktScroller::setCanvasBuffer (in nsIDOMHTMLCanvasElement aCanvas)
-------------------------------------------------------------------------

Set the buffer to scroll

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aCanvas</td>
<td align="left"><p>buffer to scroll</p></td>
</tr>
</tbody>
</table>

void nsIGktScroller::start ()
-----------------------------

Start the scroller

void nsIGktScroller::play ()
----------------------------

Play the scroll

void nsIGktScroller::pause ()
-----------------------------

Pause the scroll

void nsIGktScroller::destroy ()
-------------------------------

Destroy the scroller : object will not be usable anymore

void nsIGktScroller::setCanvasBufferAsync (in nsIDOMHTMLCanvasElement aCanvas, in nsIGktScrollerCallbackCanvas aCallback)
-------------------------------------------------------------------------------------------------------------------------

Async set the buffer to scroll

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aCanvas</td>
<td align="left"><p>buffer to scroll</p></td>
</tr>
<tr class="even">
<td align="left">aCallback</td>
<td align="left"><p>callback to notify the end of the asynchronous method</p></td>
</tr>
</tbody>
</table>

Complete HTML example using scrolling overlay on DMB400, SMA300 and DME204 [here.](example1.html)

**Build note**: You need to execute the **build.cmd** file to generate the boostrap app. Otherwise there will be a mismatch between the html file name and the one the manifest tries to launch. Find more information in *SDK-G4/bootstrap App/* documentation.
