nsINetworkRequest interface Reference
=====================================

Public Attributes
-----------------

-   attribute boolean isTransaction

<!-- -->

-   attribute AUTF8String transactionSuffix

<!-- -->

-   const short TRANSACTION\_RENAME

<!-- -->

-   const short TRANSACTION\_NOTEXIST\_DELETE

<!-- -->

-   const short TRANSACTION\_NOTEXIST\_MARK

<!-- -->

-   attribute long networkFailureDelay

<!-- -->

-   attribute short retryCountMax

<!-- -->

-   readonly attribute short retryCount

<!-- -->

-   attribute long retryDelay

<!-- -->

-   readonly attribute nsINetworkRequest parent

<!-- -->

-   attribute AUTF8String uriSpec

<!-- -->

-   attribute nsIURI uri

<!-- -->

-   attribute nsIInterfaceRequestor notificationCallbacks

<!-- -->

-   attribute AString username

<!-- -->

-   attribute AString password

<!-- -->

-   attribute bool passwordCrypted

<!-- -->

-   attribute nsICredential credential

<!-- -->

-   const short STATE\_NONE

<!-- -->

-   const short STATE\_POSTED

<!-- -->

-   const short STATE\_STARTED

<!-- -->

-   const short STATE\_RETRIED

<!-- -->

-   const short STATE\_TERMINATED

<!-- -->

-   const short STATE\_RELEASED

<!-- -->

-   readonly attribute short state

<!-- -->

-   attribute long long diskSpaceSafety

<!-- -->

-   readonly attribute bool networkUsed

<!-- -->

-   const short TYPE\_UNKNOWN

<!-- -->

-   const short TYPE\_DOWNLOAD

<!-- -->

-   const short TYPE\_INFO

<!-- -->

-   const short TYPE\_GET

<!-- -->

-   const short TYPE\_POST

<!-- -->

-   const short TYPE\_XML

<!-- -->

-   const short TYPE\_TRANSACTION\_COMMIT

<!-- -->

-   const short TYPE\_PUT

<!-- -->

-   const short TYPE\_REMOVE

<!-- -->

-   const short TYPE\_MKDIR

<!-- -->

-   readonly attribute short type

<!-- -->

-   readonly attribute AUTF8String destUrlSpec

<!-- -->

-   readonly attribute AUTF8String destDirectoryUrlSpec

<!-- -->

-   readonly attribute nsIFile destDirectoryFile

<!-- -->

-   attribute boolean verifyDownload

<!-- -->

-   readonly attribute boolean isDownloaded

<!-- -->

-   readonly attribute nsIFile downloadedFile

<!-- -->

-   readonly attribute boolean exists

<!-- -->

-   readonly attribute AUTF8String etag

<!-- -->

-   readonly attribute AUTF8String version

<!-- -->

-   readonly attribute long long size

<!-- -->

-   readonly attribute AUTF8String contentType

<!-- -->

-   readonly attribute nsIPropertyBag2 propInfo

<!-- -->

-   readonly attribute nsIChannel channel

<!-- -->

-   readonly attribute unsigned long responseStatus

<!-- -->

-   readonly attribute nsIDOMDocument xmlDocument

<!-- -->

-   readonly attribute nsIStreamListener streamListener

<!-- -->

-   readonly attribute nsISimpleEnumerator childrenRequests

<!-- -->

-   readonly attribute AUTF8String lastModified

<!-- -->

-   readonly attribute long long lastModifiedTime

<!-- -->

-   attribute long long ifModifiedSince

<!-- -->

-   attribute long long ifUnmodifiedSince

<!-- -->

-   attribute AUTF8String ifMatchContentTypeList

<!-- -->

-   attribute AUTF8String ifMatch

<!-- -->

-   attribute boolean changeLastModifiedTime

-   nsINetworkRequest clone ( )

<!-- -->

-   void download ( in AUTF8String aDestDirectoryUrlSpec, in unsigned short aDepth, in nsIProgressEventSink aCallback)

<!-- -->

-   void getInfo ( in unsigned short aDepth)

<!-- -->

-   void get ( in nsIStreamListener aStreamListener)

<!-- -->

-   void post ( in nsIInputStream aUploadStream, in AUTF8String aContentType, in long aContentLength, in nsIStreamListener aStreamListener)

<!-- -->

-   void put ( in AUTF8String aDestUrlSpec, in unsigned short aDepth, in nsIProgressEventSink aCallback, in boolean aTryHardLink)

<!-- -->

-   void putStream ( in nsIInputStream aInputStrean, in AUTF8String aDestUrlSpec, in nsIProgressEventSink aCallback)

<!-- -->

-   void remove ( )

<!-- -->

-   void mkdir ( )

<!-- -->

-   void xmlRequest ( in AUTF8String aMethod, in nsIInputStream aXmlStream)

<!-- -->

-   void transactionCommit ( in short aTransactionMask)

<!-- -->

-   void setObserverEventTarget ( in nsIEventTarget target)

Detailed Description
--------------------

Interface XPCOM nsINetworkRequest

Member Data Documentation
-------------------------

### attribute boolean nsINetworkRequest::isTransaction

Indicate that the request is treated as a transaction. All files downloaded are suffixed by the transaction suffix (attribute transactionSuffix). The client can call "transactionCommit" method for renaming all files at end of request.

### attribute AUTF8String nsINetworkRequest::transactionSuffix

The transaction suffix witch is concatenated to URI leafname to create downloaded file on local filesystem. The default value is ".transaction". Used in transaction mode only (attribute "isTransaction");

### const short nsINetworkRequest::TRANSACTION\_RENAME

Rename de transactioned files

### const short nsINetworkRequest::TRANSACTION\_NOTEXIST\_DELETE

Delete the files not present on the server

### const short nsINetworkRequest::TRANSACTION\_NOTEXIST\_MARK

Create a file suffixed by ".deleted" for each file not present on the server

### attribute long nsINetworkRequest::networkFailureDelay

Delay in seconds giving the maximum waiting time of a query network. After this delay, the request is failed and can be retryed if maximum count of retry is not exceeded (default is 60 seconds)

### attribute short nsINetworkRequest::retryCountMax

Maximum count of retry if request after network failure (default is 2).

### readonly attribute short nsINetworkRequest::retryCount

Currently count of retry fo the request after network failure

### attribute long nsINetworkRequest::retryDelay

Delay in seconds before the retry of the request (default is 2)

### readonly attribute nsINetworkRequest nsINetworkRequest::parent

Parent of request

### attribute AUTF8String nsINetworkRequest::uriSpec

URI spec of request

### attribute nsIURI nsINetworkRequest::uri

URI of request

### attribute nsIInterfaceRequestor nsINetworkRequest::notificationCallbacks

The notification callbacks for the request. This is set by clients, who wish to provide a means to receive progress, status and protocol-specific notifications. Interfaces commonly requested include: nsIProgressEventSink, nsIPrompt, nsIBadCertListenern2 and nsIAuthPrompt/nsIAuthPrompt2.

### attribute AString nsINetworkRequest::username

Username of authentification

### attribute AString nsINetworkRequest::password

Password of authentification

### attribute bool nsINetworkRequest::passwordCrypted

Is the password crypted

### attribute nsICredential nsINetworkRequest::credential

Credential

### const short nsINetworkRequest::STATE\_NONE

State of request Initial state of the request

### const short nsINetworkRequest::STATE\_POSTED

The request is posted after a call of "download", "getInfo", "get" or "post" method. At this state, a call of "onPostRequest" is performed on the request observer.

### const short nsINetworkRequest::STATE\_STARTED

The request is started by the request manager. At this state, a call of "onStartRequest" is performed on the request observer.

### const short nsINetworkRequest::STATE\_RETRIED

The request is retried after a network failure

### const short nsINetworkRequest::STATE\_TERMINATED

The request is terminated. At this state, a call of "onStopRequest" is performed on the request observer.

### const short nsINetworkRequest::STATE\_RELEASED

The request is released (after the call of "onStopRequest") and can not be already used.

### readonly attribute short nsINetworkRequest::state

Current state of request

### attribute long long nsINetworkRequest::diskSpaceSafety

The minimum disk space to remain free after a download request. If this space can not be preserved, the request fails, and the code NS\_ERROR\_FILE\_NO\_DEVICE\_SPACE is returned in OnStopRequest. The default value is 1 Mo (1024\*1024 bits)

### readonly attribute bool nsINetworkRequest::networkUsed

Network has been used

### const short nsINetworkRequest::TYPE\_UNKNOWN

Type for a unknown request

### const short nsINetworkRequest::TYPE\_DOWNLOAD

Type for a download request

### const short nsINetworkRequest::TYPE\_INFO

Type for a information request

### const short nsINetworkRequest::TYPE\_GET

Type for a get request

### const short nsINetworkRequest::TYPE\_POST

Type for a post request

### const short nsINetworkRequest::TYPE\_XML

Type for a xml request

### const short nsINetworkRequest::TYPE\_TRANSACTION\_COMMIT

Type for a transactioned download commit

### const short nsINetworkRequest::TYPE\_PUT

Type for a put request

### const short nsINetworkRequest::TYPE\_REMOVE

Type for a remove request

### const short nsINetworkRequest::TYPE\_MKDIR

Type for a mkdir request

### readonly attribute short nsINetworkRequest::type

Current request type

### readonly attribute AUTF8String nsINetworkRequest::destUrlSpec

The destination URL spec

### readonly attribute AUTF8String nsINetworkRequest::destDirectoryUrlSpec

The destination directory URL spec

### readonly attribute nsIFile nsINetworkRequest::destDirectoryFile

The destination directory file object

### attribute boolean nsINetworkRequest::verifyDownload

Indicates whether the download request must be restarted to verify if the requested file has been modified since the first download (default is true). If the file is changed, the request is restarted until the file does not change or the maximum number of re-trial is atteind (attribute retryCountMax). In this case, the request fail.

### readonly attribute boolean nsINetworkRequest::isDownloaded

Indicates if the corresponding file has be downloded by the download request

### readonly attribute nsIFile nsINetworkRequest::downloadedFile

File associated with a download request. It can be acceded only after a call of "download" method

### readonly attribute boolean nsINetworkRequest::exists

Indicates if the URI exists on server. It can be acceded only after a call of "getInfo" method

### readonly attribute AUTF8String nsINetworkRequest::etag

Etag of URI. It can be acceded only after a call of "getInfo" method

### readonly attribute AUTF8String nsINetworkRequest::version

Version of URI. It can be acceded only after a call of "getInfo" method

### readonly attribute long long nsINetworkRequest::size

Size of URI. It can be acceded only after a call of "getInfo" method

### readonly attribute AUTF8String nsINetworkRequest::contentType

Content type of URI. It can be acceded only after a call of "getInfo" or et "download" method

### readonly attribute nsIPropertyBag2 nsINetworkRequest::propInfo

List of sub-request if the URI is a directoy.. It can be acceded only after a call of "getInfo" function Properties of a microsoft.graph resource. It can be acceded only after a call of "getInfo" function

### readonly attribute nsIChannel nsINetworkRequest::channel

Channel associated with the request.

### readonly attribute unsigned long nsINetworkRequest::responseStatus

The HTTP response status

### readonly attribute nsIDOMDocument nsINetworkRequest::xmlDocument

Document for the Xml request. It can be acceded only after a call of "xmlRequest" method

### readonly attribute nsIStreamListener nsINetworkRequest::streamListener

Stream listener associated with the request (see Get or Post methods).

### readonly attribute nsISimpleEnumerator nsINetworkRequest::childrenRequests

Array of sub-requests for all children of the URI if it is associated with a directory. It can be acceded only after a call of "getInfo" method.

### readonly attribute AUTF8String nsINetworkRequest::lastModified

Modification date of URI. It can be acceded only after a call of "getInfo" method

### readonly attribute long long nsINetworkRequest::lastModifiedTime

Modification date of URI. Number of microseconds since 1 jan 1970 00:00 GMT. It can be acceded only after a call of "getInfo" method. This attribute can be used to set the "If-Modified-Since" header for a HTTP download

### attribute long long nsINetworkRequest::ifModifiedSince

Used for a download request : the download is performed only if the file is modified since the indicated date

### attribute long long nsINetworkRequest::ifUnmodifiedSince

Used for a delete request : the delete is performed only if the file is not modified since indicated date

### attribute AUTF8String nsINetworkRequest::ifMatchContentTypeList

Used for a download request : the download is performed only if the content type of file is contained in the indicated content type list. The list is constitued of mime type separated with caractere ';' (exemple : "application/javascript;text/plain").

### attribute AUTF8String nsINetworkRequest::ifMatch

Used for a delete request : the delete is performed only if the file has the same tag

### attribute boolean nsINetworkRequest::changeLastModifiedTime

Indicate if the date of last modification for the downloded file must be setted with the date of the requested file (attribute lastModifiedTime).

nsINetworkRequest nsINetworkRequest::clone ()
---------------------------------------------

Create a clone from an existing request.

void nsINetworkRequest::download (in AUTF8String aDestDirectoryUrlSpec, in unsigned short aDepth, in nsIProgressEventSink aCallback)
------------------------------------------------------------------------------------------------------------------------------------

Configure the request to perform the downloading of the URI of request. The destination file is contructed with the leafname of uri and the destination suffix witch can be set with "destSuffix" attribute. The downloading is performed only if source and destination differ (etag comparaison). If informations of URI are not already retrived, an information request is created and executed before the downloading operation. If the URI is associated with a directory on server, all sub-requests retrieved by the information request are executed.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aDestUrlSpec</td>
<td align="left"><p>Destination URL spec in local file system</p></td>
</tr>
<tr class="even">
<td align="left">aDepth</td>
<td align="left"><p>Depth of action (O for downloading only the top URI).</p></td>
</tr>
<tr class="odd">
<td align="left">aCallback</td>
<td align="left"><p>Client progess callback</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::getInfo (in unsigned short aDepth)
----------------------------------------------------------

Configure the request to retrieve the information of the URI (exist, etag, size, list of sub-request if the URI is a directoy) After complete running, the client can access to the informations of URI with following attributes : exists, version, size, childrenRequests.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aDepth</td>
<td align="left"><p>Depth of action (O for getting information only on top URI).</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::get (in nsIStreamListener aStreamListener)
------------------------------------------------------------------

Perform a GET request.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aStreamListener</td>
<td align="left"><p>Client stream listener</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::post (in nsIInputStream aUploadStream, in AUTF8String aContentType, in long aContentLength, in nsIStreamListener aStreamListener)
---------------------------------------------------------------------------------------------------------------------------------------------------------

Perform a POST request.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aUploadStream</td>
<td align="left"><p>Stream to be uploaded.</p></td>
</tr>
<tr class="even">
<td align="left">aContentType</td>
<td align="left"><p>The strean content type.</p></td>
</tr>
<tr class="odd">
<td align="left">aContentLength</td>
<td align="left"><p>A value of -1 indicates that the length of the stream should be determined by calling the stream's |available| method.</p></td>
</tr>
<tr class="even">
<td align="left">aStreamListener</td>
<td align="left"><p>Response stream listener</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::put (in AUTF8String aDestUrlSpec, in unsigned short aDepth, in nsIProgressEventSink aCallback, in boolean aTryHardLink)
-----------------------------------------------------------------------------------------------------------------------------------------------

Configure the request to perform the uploading of the URI of request. (remote server must support webdav)

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aDestUrlSpec</td>
<td align="left"><p>Destination file/directory</p></td>
</tr>
<tr class="even">
<td align="left">aDepth</td>
<td align="left"><p>Depth of action (0 for putting only the top URI)</p></td>
</tr>
<tr class="odd">
<td align="left">aCallback</td>
<td align="left"><p>Client progress callback</p></td>
</tr>
<tr class="even">
<td align="left">aTryHardLink</td>
<td align="left"><p>Only for put-from/to-local-file: if true, try to create hardlink If creation failed, create an ordinary file</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::putStream (in nsIInputStream aInputStrean, in AUTF8String aDestUrlSpec, in nsIProgressEventSink aCallback)
----------------------------------------------------------------------------------------------------------------------------------

Configure the request to perform the uploading of the input stream. (remote server must support webdav)

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aInputStrean</td>
<td align="left"><p>The inputStream to be putted</p></td>
</tr>
<tr class="even">
<td align="left">aDestUrlSpec</td>
<td align="left"><p>Destination file</p></td>
</tr>
<tr class="odd">
<td align="left">aCallback</td>
<td align="left"><p>Client progress callback</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::remove ()
---------------------------------

Delete a file or directory onStopRequest is called when the removing is terminated

void nsINetworkRequest::mkdir ()
--------------------------------

Create a directory (on webdav server) onStopRequest is called when the creation is over

void nsINetworkRequest::xmlRequest (in AUTF8String aMethod, in nsIInputStream aXmlStream)
-----------------------------------------------------------------------------------------

Perform a Xml Http request. The result of request can be consulted by attribute "xmlDocument" after the complete processing (call of "onStopRequest" is performed on the request observer)

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aMethod</td>
<td align="left"><p>The method of the HTTP request</p></td>
</tr>
<tr class="even">
<td align="left">aXmlStream</td>
<td align="left"><p>The Xml stream to be transmited.</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::transactionCommit (in short aTransactionMask)
---------------------------------------------------------------------

Commit the transactionned download.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aTransactionMask</td>
<td align="left"><p>The transaction commit mask (use TRANSACTION_RENAME,TRANSACTION_NOTEXIST_DELETE, and TRANSACTION_NOTEXIST_MARK) present on server</p></td>
</tr>
</tbody>
</table>

void nsINetworkRequest::setObserverEventTarget (in nsIEventTarget target)
-------------------------------------------------------------------------

Set observer eventtarget
