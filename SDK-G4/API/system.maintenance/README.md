nsISystemMaintenance Interface Reference
========================================

nsISystemMaintenance
`import"nsISystemMaintenance.idl";`

Inheritance diagram for nsISystemMaintenance:

Public Member Functions
-----------------------

-   void reboot ()

-   void crash ()

-   void infiniteLoop ()

-   void blockMainStack ()

-   void exec (in AUTF8String aCommand)

-   void callGC ()

Public Attributes
-----------------

-   readonly attribute nsISystemRequestFormat format

-   readonly attribute nsISystemRequestCommit commit

-   readonly attribute nsISystemRequestCheckDataDisk checkDataDisk

-   readonly attribute bool hasNonVolatileDataPartition

Detailed Description
--------------------

The nsISystemMaintenance interface is the point of entry to carry out maintenance operations on the hardware platform running Gekkota. HTML example using reboot() [here.](example1.html)

Member Function Documentation
-----------------------------

### blockMainStack()

blockMainStack
nsISystemMaintenance
nsISystemMaintenance
blockMainStack
`void nsISystemMaintenance::blockMainStack ( )`

Block the main stack

### callGC()

callGC
nsISystemMaintenance
nsISystemMaintenance
callGC
`void nsISystemMaintenance::callGC ( )`

Call Garbage collector

### crash()

crash
nsISystemMaintenance
nsISystemMaintenance
crash
`void nsISystemMaintenance::crash ( )`

Force a crash

### exec()

exec
nsISystemMaintenance
nsISystemMaintenance
exec
`void nsISystemMaintenance::exec (in AUTF8String aCommand)`

Execute a string command.

**Parameters.**

<table>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aCommand</td>
<td align="left"><p>string command to be executed  </p></td>
</tr>
</tbody>
</table>

### infiniteLoop()

infiniteLoop
nsISystemMaintenance
nsISystemMaintenance
infiniteLoop
`void nsISystemMaintenance::infiniteLoop ( )`

Force a Loop

### reboot()

reboot
nsISystemMaintenance
nsISystemMaintenance
reboot
`void nsISystemMaintenance::reboot ( )`

Reboot the device

Member Data Documentation
-------------------------

### checkDataDisk

checkDataDisk
nsISystemMaintenance
nsISystemMaintenance
checkDataDisk
`readonly attribute nsISystemRequestCheckDataDisk nsISystemMaintenance::checkDataDisk`

Request used to check disk of data persitent data

### commit

commit
nsISystemMaintenance
nsISystemMaintenance
commit
`readonly attribute nsISystemRequestCommit nsISystemMaintenance::commit`

Request used to commit persitent data

### format

format
nsISystemMaintenance
nsISystemMaintenance
format
`readonly attribute nsISystemRequestFormat nsISystemMaintenance::format`

Request used to format data volume

### hasNonVolatileDataPartition

hasNonVolatileDataPartition
nsISystemMaintenance
nsISystemMaintenance
hasNonVolatileDataPartition
`readonly attribute bool nsISystemMaintenance::hasNonVolatileDataPartition`

get informed if the data partition exists
