nsIPlayLogService interface Reference
=====================================

Public Attributes
-----------------

-   readonly attribute bool isEnabled

-   void addEvent ( in wstring aEventStrings, in unsigned long aEventStringCount)

Detailed Description
--------------------

Interface XPCOM `nsIPlayLogService`

This interface is associated with the event logging service sent to a WebDav server.

This service is accessible in JavaScript via the global property `playlogService`.

**Working principle.**

Its operation follows the following diagram:

-   one or more JavaScript uses the `playlogService.addEvent` method to log events. Each event is made up of an array of strings.

-   the service adds these events to a list stored in memory.

-   the list is added at the end of the event recording file at regular time intervals or when its memory size exceeds a certain limit. The file is in TSV format. The recording file, recording interval and size limit are set by user preferences (see Preferences).

-   the recording file is stored in a directory associated with a WebServer mount point. It can therefore be viewed via the WebUI (`http:\\<server>\.playlog` URL).

-   the recording file is sent to a `WebDav` server at a given time or if its size exceeds a certain limit. To avoid overloading the server, the deposit time is shifted by a random amount of time. The URI of the server, its authentication data, the deposit time, its random correction and the size limit are defined by user preferences (see Preferences).

The name of the file stored on the server has the following form: `playlog.<id>.<date-iso-utc>.tsv` where :

-   &lt;id&gt; is the device identifier. It is conditioned by the value of the `innes.appli.device-id-type` preference which can take the following values:

-   0: MAC address of the device,

-   1: device name,

-   2: UUID of the device,

-   &lt;date-iso-utc&gt; is the UTC date at the time of sending in ISO\_8601 format, for example "20181113T112029Z".

**Preferences.**

The prefix for the playlog service configuration preferences is `innes.launcher.playlog.`.

|                         |                                                                                                               |                                                                                                                           |
|-------------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Preference              | Description                                                                                                   | Default value                                                                                                             |
| enabled                 | Indicates whether the service is active                                                                       | false                                                                                                                     |
| local.uri               | URI of the local file used to record events                                                                   | Windows : "file://&lt;Document Public&gt;/Gekkota/playlog/playlog.tsv" Elinux : "file:///usr/gekkota/playlog/playlog.tsv" |
| local.write-delay       | Time interval for recording events in memory in the local file                                                | 20 (minutes)                                                                                                              |
| local.max-size          | Maximum size of events in memory. A negative value indicates that there is no limit                           | 1024 (Ko)                                                                                                                 |
| remote.base-uri         | URI for depositing the event files on the WebDav server                                                       | ""                                                                                                                        |
| remote.username         | User name of the connection to the WebDav server                                                              | ""                                                                                                                        |
| remote.password         | Password for connecting to the WebDav server                                                                  | ""                                                                                                                        |
| remote.password-crypted | Indicates whether the password is encrypted or not                                                            | false                                                                                                                     |
| remote.time             | Time of deposit of the events file on the WebDav server                                                       | "23:00" (format HH:MM)                                                                                                    |
| remote.max-size         | Maximum size of the event file. A negative value indicates that there is no limit.                            | 102400 (ko)                                                                                                               |
| remote.retry-max        | Maximum number of retries if sending the event file fails. A negative value indicates that there is no limit. | 5                                                                                                                         |

Member Data Documentation
-------------------------

### readonly attribute bool nsIPlayLogService::isEnabled

Indicate if the service is active or not.

void nsIPlayLogService::addEvent (\[array, size\_is(aEventStringCount)\] in wstring aEventStrings, in unsigned long aEventStringCount)
--------------------------------------------------------------------------------------------------------------------------------------

Add a event to playlog service.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aEventStrings</td>
<td align="left"><p>array of UTF16 string</p></td>
</tr>
<tr class="even">
<td align="left">aEventStringCount</td>
<td align="left"><p>size of array</p></td>
</tr>
</tbody>
</table>


