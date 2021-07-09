nsICacheManager interface Reference
===================================

Public Attributes
-----------------

-   const short DOWNLOADER\_STATE\_PAUSED

<!-- -->

-   const short DOWNLOADER\_STATE\_RUNNING

<!-- -->

-   attribute short downloaderState

<!-- -->

-   readonly attribute nsICacheManagerManifest manifest

-   void init ( in nsIFile aTopDir)

<!-- -->

-   void start ( )

<!-- -->

-   void stop ( )

<!-- -->

-   nsICacheManagerTransaction startPurge ( in nsICacheManagerTransactionObserver aTransactionObserver)

<!-- -->

-   nsICacheManagerTransaction startRename ( in nsICacheManagerTransactionObserver aTransactionObserver)

<!-- -->

-   void activateManifest ( in boolean aActivateFlag)

<!-- -->

-   void addObserver ( in nsICacheManagerTransactionObserver aTransactionObserver)

<!-- -->

-   void removeObserver ( in nsICacheManagerTransactionObserver aTransactionObserver)

Detailed Description
--------------------

Interface XPCOM `nsICacheManager`

This interface is associated with the cache manager service.

This service is accessible in JavaScript via the global property `cacheManager`.

The cache manager is responsible for managing the content of an app and its various modes of publication.

The operations performed by cache manager are organized in the form of transactions. These transactions, all inheriting from the `nsICacheManagerTransaction` interface, can be started synchronously (`nsICacheManagerTransaction::Start`) or asynchronously (`nsICacheManagerTransaction::AsynStart`). In this case, they have their own thread of execution and notify their start and end via the `nsICacheManagerTransactionObserver`. These notifications can be received by adding an observer via the `nsICacheManager::AddObserver` method.

JavaScript example to observe transactions :

    function CacheObserver()
    {
    }
    CacheObserver.prototype = {
       onStartTransaction: function(transaction, ctx)
      {
        LOG("Start transaction '" + transaction + "'")
      },
      onStopTransaction: function(transaction, status, ctx)
      {
        LOG("Stop transaction '" + transaction + "' status = " + status)

      }
    }
    cacheManager.addObserver(new CacheObserver())

Operations related to publication are marked with flag files to allow them to be resumed in the event of an interruption (restart, interruption of service). These flag files are:

-   `webserver.transaction` which marks a publication by ScreenComposer is in progress. It is the first file written and is deleted when all files in the post have been written.

-   `injection.transaction` which is created by the nsLauncherAPBStorageExternalRichmediaPlayerInjector USB injection profile.

-   `downloader.transaction` which marks that a manifest download profile (nsLauncherAPBManifestDownloaderG2 or nsLauncherAPBManifestDownloaderG3) is in progress.

-   `files.transaction` which marks that a download transaction (nsICacheManagerTransactionDownload) of the manifest files from the distribution server is in progress.

-   `resources.transaction` which marks that a download transaction (nsICacheManagerTransactionDownload) of the external resources of the manifest is in progress.

The files being published are all marked with the suffix `.transaction`.

After taking over a new manifest, the following methods are called (not allowed in JavaScript) :

-   `startRename`, which creates an `nsICacheManagerTransactionRename` interface transaction, allows to remove the `.transaction` extensions from the publication's files.

-   `startPurge`, which creates an `nsICacheManagerTransactionPurge` interface transaction, allows to delete files and directories not referenced by the manifest. The files of `.deleted` extensions are also deleted.

Downloads of the manifest or resources can be interrupted or resumed by modifying the `downloadState` attribute.

The initial state of this attribute (RUNING by default) can be modified by the manifest (attribute `downloader-state` of the`launcher` node)

JavaScript example to modify the `downloaderState` attribute :

    const Ci = Components.interfaces;
    cacheManager.downloaderState = Ci.nsICacheManager.DOWNLOADER_STATE_PAUSED

Member Data Documentation
-------------------------

### const short nsICacheManager::DOWNLOADER\_STATE\_PAUSED

Downloaders (manifest, resources) are not active

### const short nsICacheManager::DOWNLOADER\_STATE\_RUNNING

Downloaders (manifest, resources) are active

### attribute short nsICacheManager::downloaderState

The current downloaders state. Possible values are defined below (DOWNLOADER\_STATE\_\*)

### readonly attribute nsICacheManagerManifest nsICacheManager::manifest

Current manifest

void nsICacheManager::init (in nsIFile aTopDir)
-----------------------------------------------

Init manager (not allowed in JavaScript)

void nsICacheManager::start ()
------------------------------

Start manager (not allowed in JavaScript)

void nsICacheManager::stop ()
-----------------------------

Stop manager (not allowed in JavaScript)

nsICacheManagerTransaction nsICacheManager::startPurge (in nsICacheManagerTransactionObserver aTransactionObserver)
-------------------------------------------------------------------------------------------------------------------

Start purge (not allowed in JavaScript)

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aOperationObserver</td>
<td align="left"><p>observer to the operation, NULL if the operation must be synchrone</p></td>
</tr>
</tbody>
</table>

**Returns:.**

the associate transaction object

nsICacheManagerTransaction nsICacheManager::startRename (in nsICacheManagerTransactionObserver aTransactionObserver)
--------------------------------------------------------------------------------------------------------------------

Start renaming of files (not allowed in JavaScript).

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aOperationObserver</td>
<td align="left"><p>observer to the operation, NULL if the operation must be synchrone</p></td>
</tr>
</tbody>
</table>

**Returns:.**

the associate transaction object

void nsICacheManager::activateManifest (in boolean aActivateFlag)
-----------------------------------------------------------------

Activate or desactivate the current manifest (not allowed in JavaScript)

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aActivateFlag</td>
<td align="left"></td>
</tr>
</tbody>
</table>

void nsICacheManager::addObserver (in nsICacheManagerTransactionObserver aTransactionObserver)
----------------------------------------------------------------------------------------------

Add an observer to cache manager transactions

void nsICacheManager::removeObserver (in nsICacheManagerTransactionObserver aTransactionObserver)
-------------------------------------------------------------------------------------------------

Remove an observer to cache manager transactions

nsICacheManagerManifest interface Reference
===========================================

Public Attributes
-----------------

-   readonly attribute nsIDOMDocument document

<!-- -->

-   readonly attribute nsIArray fileNodes

<!-- -->

-   readonly attribute nsIArray variableNodes

<!-- -->

-   readonly attribute bool hasFiles

<!-- -->

-   readonly attribute bool hasResources

<!-- -->

-   readonly attribute bool hasVariables

<!-- -->

-   readonly attribute nsIArray metadataNodes

<!-- -->

-   readonly attribute nsIDOMNode metadataDescriptionNode

<!-- -->

-   readonly attribute AString bootstrapFileName

<!-- -->

-   readonly attribute nsIFile bootstrapFile

<!-- -->

-   readonly attribute nsIURI bootstrapUri

<!-- -->

-   readonly attribute nsICredential bootstrapCredential

<!-- -->

-   readonly attribute nsIFile file

<!-- -->

-   readonly attribute long long totalFilesSize

<!-- -->

-   readonly attribute short downloaderState

-   void load ( in nsIURI aUri)

<!-- -->

-   void loadUriSpec ( in ACString aUriSpec)

<!-- -->

-   void getFileList ( out wstring list, out unsigned long count)

<!-- -->

-   void getFileListNative ( in StringArray aArray)

Detailed Description
--------------------

Interface XPCOM nsICacheManagerManifest

This interface is associated with a manifest managed by the cache manager.

Member Data Documentation
-------------------------

### readonly attribute nsIDOMDocument nsICacheManagerManifest::document

document

### readonly attribute nsIArray nsICacheManagerManifest::fileNodes

Array of files nodes

### readonly attribute nsIArray nsICacheManagerManifest::variableNodes

/\* Array of variables nodes

### readonly attribute bool nsICacheManagerManifest::hasFiles

Indicate if manifest has files list (not include file for resource)

### readonly attribute bool nsICacheManagerManifest::hasResources

Indicate if manifest has files list

### readonly attribute bool nsICacheManagerManifest::hasVariables

Indicate if manifest has custom variables list

### readonly attribute nsIArray nsICacheManagerManifest::metadataNodes

Array of metadata nodes

### readonly attribute nsIDOMNode nsICacheManagerManifest::metadataDescriptionNode

The RDF description node for the metadatas

### readonly attribute nsIURI nsICacheManagerManifest::bootstrapUri

Bootstrap URI if the bootstrap is remote

### readonly attribute nsICredential nsICacheManagerManifest::bootstrapCredential

Bootstrap credential if the bootstrap is remote

### readonly attribute nsIFile nsICacheManagerManifest::file

The manifest file

### readonly attribute long long nsICacheManagerManifest::totalFilesSize

The total size of files referenced by the manifest

### readonly attribute short nsICacheManagerManifest::downloaderState

The downloader state (possible value are nsICacheManager::DOWNLOADER\_STATE\_\*)

void nsICacheManagerManifest::load (in nsIURI aUri)
---------------------------------------------------

Load a manifest

void nsICacheManagerManifest::loadUriSpec (in ACString aUriSpec)
----------------------------------------------------------------

void nsICacheManagerManifest::getFileList (\[array, size\_is(count)\] out wstring list, out unsigned long count)
----------------------------------------------------------------------------------------------------------------

Array of files of the manifest

void nsICacheManagerManifest::getFileListNative (in StringArray aArray)
-----------------------------------------------------------------------

Array of files of the manifest (not allowed in JavaScript)

nsICacheManagerTransaction interface Reference
==============================================

-   void start ( )

<!-- -->

-   void asyncStart ( in nsICacheManagerTransactionObserver aTransactionObserver, in nsISupports aContext)

Detailed Description
--------------------

This interface is associated with a transaction managed by the cache manager.

void nsICacheManagerTransaction::start ()
-----------------------------------------

Start the transaction (not allowed in JavaScript)

void nsICacheManagerTransaction::asyncStart (in nsICacheManagerTransactionObserver aTransactionObserver, in nsISupports aContext)
---------------------------------------------------------------------------------------------------------------------------------

start the transaction asynchronously (not allowed in JavaScript)

nsICacheManagerTransactionManifest interface Reference
======================================================

Public Attributes
-----------------

-   readonly attribute nsICacheManagerManifest manifest

<!-- -->

-   readonly attribute boolean hasFilesToDownload

<!-- -->

-   readonly attribute boolean hasResourcesToDownload

Detailed Description
--------------------

This interface is associated with a manifest loading transaction.

Member Data Documentation
-------------------------

### readonly attribute nsICacheManagerManifest nsICacheManagerTransactionManifest::manifest

Manifest

### readonly attribute boolean nsICacheManagerTransactionManifest::hasFilesToDownload

Indicates if the cache manager must download the files list of manifest

### readonly attribute boolean nsICacheManagerTransactionManifest::hasResourcesToDownload

Indicates if the cache manager must download the resources list of manifest

nsICacheManagerTransactionDownload interface Reference
======================================================

Public Attributes
-----------------

-   readonly attribute nsICacheManagerManifest manifest

<!-- -->

-   const short DOWNLOAD\_FILES

<!-- -->

-   const short DOWNLOAD\_RESOURCES

<!-- -->

-   readonly attribute short downloadType

Detailed Description
--------------------

This interface is associated with a downloading transaction.

Member Data Documentation
-------------------------

### readonly attribute nsICacheManagerManifest nsICacheManagerTransactionDownload::manifest

Manifest

### const short nsICacheManagerTransactionDownload::DOWNLOAD\_FILES

Download types Download files from the frontal server

### const short nsICacheManagerTransactionDownload::DOWNLOAD\_RESOURCES

Download resources from other servers

### readonly attribute short nsICacheManagerTransactionDownload::downloadType

Download type (the value above)

nsICacheManagerTransactionRename interface Reference
====================================================

Detailed Description
--------------------

This interface is associated with a rename operation.

nsICacheManagerTransactionPurge interface Reference
===================================================

Public Attributes
-----------------

-   readonly attribute nsICacheManagerManifest manifest

Detailed Description
--------------------

This interface is associated with a purge operation.

Member Data Documentation
-------------------------

### readonly attribute nsICacheManagerManifest nsICacheManagerTransactionPurge::manifest

Manifest

nsICacheManagerTransactionObserver interface Reference
======================================================

-   void onStartTransaction ( in nsICacheManagerTransaction aTransaction, in nsISupports aContext)

<!-- -->

-   void onStopTransaction ( in nsICacheManagerTransaction aTransaction, in nsresult aStatusCode, in nsISupports aContext)

Detailed Description
--------------------

This interface is associated with an asynchronous transaction observer. It allows you to be notified of the start and end of the transaction

void nsICacheManagerTransactionObserver::onStartTransaction (in nsICacheManagerTransaction aTransaction, in nsISupports aContext)
---------------------------------------------------------------------------------------------------------------------------------

Called to signify the beginning of an transaction

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aTransaction</td>
<td align="left"><p>the concerned transaction</p></td>
</tr>
<tr class="even">
<td align="left">aContext</td>
<td align="left"><p>a contextual object</p></td>
</tr>
</tbody>
</table>

void nsICacheManagerTransactionObserver::onStopTransaction (in nsICacheManagerTransaction aTransaction, in nsresult aStatusCode, in nsISupports aContext)
---------------------------------------------------------------------------------------------------------------------------------------------------------

Called to signify the end of an transaction

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aTransaction</td>
<td align="left"><p>the concerned transaction</p></td>
</tr>
<tr class="even">
<td align="left">aStatusCode</td>
<td align="left"><p>reason for stopping (NS_OK if completed successfully)</p></td>
</tr>
<tr class="odd">
<td align="left">aContext</td>
<td align="left"><p>a contextual object</p></td>
</tr>
</tbody>
</table>


