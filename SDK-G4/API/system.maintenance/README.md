nsISystemMaintenance interface Reference
========================================

Public Attributes
-----------------

-   readonly attribute unsigned short failsoftNbReboots

<!-- -->

-   readonly attribute unsigned short failsoftMaxReboots

<!-- -->

-   readonly attribute nsISystemRequestFormat format

<!-- -->

-   readonly attribute nsISystemRequestCheckDataDisk checkDataDisk

<!-- -->

-   readonly attribute bool hasNonVolatileDataPartition

-   void reboot ( )

<!-- -->

-   void crash ( )

<!-- -->

-   void infiniteLoop ( )

<!-- -->

-   void blockMainStack ( )

<!-- -->

-   void exec ( in AUTF8String aCommand)

<!-- -->

-   void callGC ( )

Detailed Description
--------------------

The nsISystemMaintenance interface is the point of entry to read internal variables of the Fail Soft Mode feature and to carry out maintenance operations on the hardware platform running Gekkota. HTML example getting Fail Soft Mode state and using reboot() [here.](example1.html)

**Build note**: You need to execute the **build.cmd** file to generate the boostrap app. Otherwise there will be a mismatch between the html file name and the one the manifest tries to launch. Find more information in *SDK-G4/bootstrap App/* documentation.

Member Data Documentation
-------------------------

### readonly attribute unsigned short nsISystemMaintenance::failsoftNbReboots

Current number of successive reboots counted in the Fail Soft Mode feature (see documentation about Fail Soft Mode)

### readonly attribute unsigned short nsISystemMaintenance::failsoftMaxReboots

Maximal number of successive reboots to reach Fail Soft Mode level 1 (see documentation about Fail Soft Mode)

### readonly attribute nsISystemRequestFormat nsISystemMaintenance::format

Request used to format data volume

### readonly attribute nsISystemRequestCheckDataDisk nsISystemMaintenance::checkDataDisk

Request used to check disk of data persitent data

### readonly attribute bool nsISystemMaintenance::hasNonVolatileDataPartition

get informed if the data partition exists

void nsISystemMaintenance::reboot ()
------------------------------------

Reboot the device

void nsISystemMaintenance::crash ()
-----------------------------------

Force a crash

void nsISystemMaintenance::infiniteLoop ()
------------------------------------------

Force a Loop

void nsISystemMaintenance::blockMainStack ()
--------------------------------------------

Block the main stack

void nsISystemMaintenance::exec (in AUTF8String aCommand)
---------------------------------------------------------

Execute a string command.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aCommand</td>
<td align="left"><p>string command to be executed</p></td>
</tr>
</tbody>
</table>

void nsISystemMaintenance::callGC ()
------------------------------------

Call Garbage collector

nsISystemRequestCheckDataDisk interface Reference
=================================================

nsISystemRequestFormat interface Reference
==========================================
