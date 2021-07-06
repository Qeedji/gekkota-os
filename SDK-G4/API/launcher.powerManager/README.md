nsIPowerManagerService interface Reference
==========================================

Public Attributes
-----------------

-   readonly attribute long level

Detailed Description
--------------------

The interface nsIPowerManagerService is associated with the power manager service.

It supports the default mode which allows you to define a calendar for modifying the power level and manages the requests from the different power manager instances. The following two rules apply:

-   the default mode and its calendar is canceled as soon as a power manager instance is created,

-   if several power managers change the power level, the lowest level is chosen

The preference "innes.power-manager.calendar" allows you to define the default calendar of power manager level.

It also supports the set of preferences allowing to define the attributes of each power level :

-   "innes.power-manager.level .&lt;max|high|low|min&gt;.adapter.&lt;power-mode|opacity &gt;"

-   "innes.power-manager.level .&lt;max|high|low|min&gt;.&lt;av-cmd&gt;.&lt;power-mode|opacity|backlight &gt;"

-   "innes.power-manager.level .&lt;max|high|low|min&gt;.&lt;adapter|av-cmd&gt;.&lt;mute|volume&gt;"

The interface nsIPowerManagerService defines a single attribute called "level" which allows to recover the current power level

Examples in javascript:

    const Ci = Components.interfaces;
    let level = powerManagerService.level ;
    if (level == Ci.nsIPowerManager::LEVEL_MIN)
    {
    }
    else if (level == Ci.nsIPowerManager::LEVEL_LOW)
    {
    }
    else if (level == Ci.nsIPowerManager::LEVEL_HIGH)
    {
    }
    else if (level == Ci.nsIPowerManager::LEVEL_MAX)
    {
    }

Member Data Documentation
-------------------------

### readonly attribute long nsIPowerManagerService::level

Current power level value

nsIPowerManager interface Reference
===================================

Public Attributes
-----------------

-   attribute AUTF8String calendar

<!-- -->

-   const long LEVEL\_MIN

<!-- -->

-   const long LEVEL\_LOW

<!-- -->

-   const long LEVEL\_HIGH

<!-- -->

-   const long LEVEL\_MAX

-   void set ( in long aLevel)

<!-- -->

-   nsIPowerManagerToken append ( in long aLevel)

<!-- -->

-   void remove ( in nsIPowerManagerToken aToken)

<!-- -->

-   void destroy ( )

Detailed Description
--------------------

The interface nsIPowerManager is associated with the power manager. it can be used to change the power level manually or through a calendar.

The instantiation of a power manager causes the stop of the power manager and notably of its calendar

If multiple instances of power manager are used simultaneously, the minimum power level is selected

Examples in javascript:

Change the power level in replacement mode

    let manager = new PowerManager()
    const Ci = Components.interfaces;
    // Replace the current power level
     manager.set(Ci.nsIPowerManager.LEVEL_MIN);

Change the power level in push mode

    let manager = new PowerManager()
    const Ci = Components.interfaces;
    // Change the current power level
    let token = manager.append(Ci.nsIPowerManager.LEVEL_MIN);
    // Restore the prior level after 10 seconds
    setTimout (() => {manager.remove(token)}, 10000)

Modify the power level with a calendar

    function generate_event( date, offset, duration, level)
    {
     let start = addSeconds(date, offset);
     let end = addSeconds(start,duration);
     let str = "BEGIN:VEVENT\n";
     str += "DTSTART;" + icalDate(start) + "\n";
     str += "DTEND;" + icalDate(end) + "\n";
     str += "X-POWER-MANAGER-LEVEL;" + level + "\n";
     str += "END:VEVENT\n";
     return str;
    }
    let manager = new PowerManager()
    const Ci = Components.interfaces;
    let str = "BEGIN:VCALENDAR\n";
    let start = 60;
    let duration = 60;
    str += generate_event(date, start, duration, "LOW");
    str += "END:VCALENDAR";
     powermanager.calendar = str;

Member Data Documentation
-------------------------

### attribute AUTF8String nsIPowerManager::calendar

Set the ICS calendar used to change power level.

### const long nsIPowerManager::LEVEL\_MIN

Values of levels Minimum power level

### const long nsIPowerManager::LEVEL\_LOW

Low power level

### const long nsIPowerManager::LEVEL\_HIGH

High power level

### const long nsIPowerManager::LEVEL\_MAX

Maximium power level

void nsIPowerManager::set (in long aLevel)
------------------------------------------

Set a new value for the power level. The new value replaces the previous defined value

nsIPowerManagerToken nsIPowerManager::append (in long aLevel)
-------------------------------------------------------------

Append a new power level modification. This method creates a new token that is added at the end of the modification list. The value replace the currently value of level.

**Returns:.**

the token of modification witch can be used to remove the modification.

void nsIPowerManager::remove (in nsIPowerManagerToken aToken)
-------------------------------------------------------------

remove a power level modification. This method remove the token to the list of modifications. The new currently value of level is the last element of the stack.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aToken</td>
<td align="left"><p>the token of level modification to be stopped</p></td>
</tr>
</tbody>
</table>

void nsIPowerManager::destroy ()
--------------------------------

Destroy this power manager component. The calendar and tokens of modifications are removed. The component can not be used after this call.

nsIPowerManagerToken interface Reference
========================================

Detailed Description
--------------------

The interface is associated with the power level modification tokens used in the Push mode of the nsIPowerManager interface. The token is created by the nsIPowerManager::append method and is destroyed by the nsIPowerManager::Remove method

JavaScript example:

    let manager = new PowerManager()
    const Ci = Components.interfaces;
    // Change the current power level
    let token = manager.append(Ci.nsIPowerManager.LEVEL_MIN);
    // Restore the prior level after 10 seconds
    setTimout (() => {manager.remove(token)}, 10000)
