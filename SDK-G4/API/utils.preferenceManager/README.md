nsIPreferenceManager interface Reference
========================================

-   nsIPreferenceBranch getBranch ( in string aPrefRoot)

<!-- -->

-   void savePrefs ( )

Detailed Description
--------------------

Interface XPCOM nsIPreferenceManager

This interface is used by the preference management service.

This service also implements the nsIPreferenceBranch interface (see below) to directly access the root branch of user preference data.

In JavaScript, it is accessible via the global `preferenceManager` property.

JavaScript example to create or modify preferences :

    preferenceManager.setCharPref("test.pref.char", "string");
    preferenceManager.setIntPref("test.pref.int", 1234);
    preferenceManager.savePrefs();

nsIPreferenceBranch nsIPreferenceManager::getBranch (in string aPrefRoot)
-------------------------------------------------------------------------

Call to get a Preferences "Branch" which accesses user preference data. Using a Set method on this object will always create or set a user preference value. When using a Get method the value set by user will be returned if this value exists, otherwise a default value will be returned.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefRoot</td>
<td align="left"><p>The preference &quot;root&quot; on which to base this &quot;branch&quot;. For example, if the root &quot;browser.startup.&quot; is used, the branch will be able to easily access the preferences &quot;browser.startup.page&quot;, &quot;browser.startup.homepage&quot;, or &quot;browser.startup.homepage_override&quot; by simply requesting &quot;page&quot;, &quot;homepage&quot;, or &quot;homepage_override&quot;. nullptr or &quot;&quot; may be used to access to the entire preference &quot;tree&quot;.</p></td>
</tr>
</tbody>
</table>

**Returns:.**

nsIPrefBranch The object representing the requested branch.

void nsIPreferenceManager::savePrefs ()
---------------------------------------

Save the preferences modified

nsIPreferenceBranch interface Reference
=======================================

Public Attributes
-----------------

-   const long PREF\_INVALID

<!-- -->

-   const long PREF\_STRING

<!-- -->

-   const long PREF\_INT

<!-- -->

-   const long PREF\_BOOL

<!-- -->

-   readonly attribute string root

-   long getPrefType ( in string aPrefName)

<!-- -->

-   boolean getBoolPref ( in string aPrefName)

<!-- -->

-   void setBoolPref ( in string aPrefName, in boolean aValue)

<!-- -->

-   float getFloatPref ( in string aPrefName)

<!-- -->

-   string getCharPref ( in string aPrefName)

<!-- -->

-   void setCharPref ( in string aPrefName, in string aValue)

<!-- -->

-   long getIntPref ( in string aPrefName)

<!-- -->

-   void setIntPref ( in string aPrefName, in long aValue)

<!-- -->

-   void clearUserPref ( in string aPrefName)

<!-- -->

-   boolean prefHasUserValue ( in string aPrefName)

<!-- -->

-   void deleteBranch ( in string aStartingAt)

<!-- -->

-   void getChildList ( in string aStartingAt, out unsigned long aCount, out string aChildArray)

<!-- -->

-   void resetBranch ( in string aStartingAt)

Detailed Description
--------------------

Interface XPCOM nsIPreferenceBranch

Interface associated with a preference branch (a set of preferences starting with the same prefix (example "test.pref.")).

Example to get a preference branch and get the value of a pref in this branch

    var branch = preferenceManager.getBranch("test.pref.");
    var testPrefExampleValue = branch.getIntPref("example"); // retreive value of preference "test.pref.example"

Member Data Documentation
-------------------------

### const long nsIPreferenceBranch::PREF\_INVALID

Values describing the basic preference types.

**See also:.**

getPrefType

### readonly attribute string nsIPreferenceBranch::root

Called to get the root on which this branch is based, such as "browser.startup."

long nsIPreferenceBranch::getPrefType (in string aPrefName)
-----------------------------------------------------------

Called to determine the type of a specific preference.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The preference to get the type of.</p></td>
</tr>
</tbody>
</table>

**Returns:.**

long A value representing the type of the preference. This value will be PREF\_STRING, PREF\_INT, or PREF\_BOOL.

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if preference do not exists</p></td>
</tr>
</tbody>
</table>

boolean nsIPreferenceBranch::getBoolPref (in string aPrefName)
--------------------------------------------------------------

Called to get the state of an individual boolean preference.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the boolean preference to get the state of.</p></td>
</tr>
</tbody>
</table>

**Returns:.**

boolean The value of the requested boolean preference.

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if preference do not exists</p></td>
</tr>
</tbody>
</table>

**See also:.**

setBoolPref

void nsIPreferenceBranch::setBoolPref (in string aPrefName, in boolean aValue)
------------------------------------------------------------------------------

Called to set the state of an individual boolean preference.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the boolean preference to set the state of.</p></td>
</tr>
<tr class="even">
<td align="left">aValue</td>
<td align="left"><p>The boolean value to set the preference to.</p></td>
</tr>
</tbody>
</table>

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if setting failed or the preference has a default value of a type other than boolean.</p></td>
</tr>
</tbody>
</table>

**See also:.**

getBoolPref

float nsIPreferenceBranch::getFloatPref (in string aPrefName)
-------------------------------------------------------------

Called to get the state of an individual floating-point preference. "Floating point" preferences are really string preferences that are converted to floating point numbers.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the floating point preference to get the state of.</p></td>
</tr>
</tbody>
</table>

**Returns:.**

float The value of the requested floating point preference.

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if preference do not exists</p></td>
</tr>
</tbody>
</table>

**See also:.**

setCharPref

string nsIPreferenceBranch::getCharPref (in string aPrefName)
-------------------------------------------------------------

Called to get the state of an individual string preference.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the string preference to retrieve.</p></td>
</tr>
</tbody>
</table>

**Returns:.**

string The value of the requested string preference.

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if preference do not exists</p></td>
</tr>
</tbody>
</table>

**See also:.**

setCharPref

void nsIPreferenceBranch::setCharPref (in string aPrefName, in string aValue)
-----------------------------------------------------------------------------

Called to set the state of an individual string preference.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the string preference to set.</p></td>
</tr>
<tr class="even">
<td align="left">aValue</td>
<td align="left"><p>The string value to set the preference to.</p></td>
</tr>
</tbody>
</table>

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if setting failed or the preference has a default value of a type other than string.</p></td>
</tr>
</tbody>
</table>

**See also:.**

getCharPref

long nsIPreferenceBranch::getIntPref (in string aPrefName)
----------------------------------------------------------

Called to get the state of an individual integer preference.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the integer preference to get the value of.</p></td>
</tr>
</tbody>
</table>

**Returns:.**

long The value of the requested integer preference.

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if preference do not exists</p></td>
</tr>
</tbody>
</table>

**See also:.**

setIntPref

void nsIPreferenceBranch::setIntPref (in string aPrefName, in long aValue)
--------------------------------------------------------------------------

Called to set the state of an individual integer preference.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the integer preference to set the value of.</p></td>
</tr>
<tr class="even">
<td align="left">aValue</td>
<td align="left"><p>The integer value to set the preference to.</p></td>
</tr>
</tbody>
</table>

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>if setting failed or the preference has a default value of a type other than integer.</p></td>
</tr>
</tbody>
</table>

**See also:.**

getIntPref

void nsIPreferenceBranch::clearUserPref (in string aPrefName)
-------------------------------------------------------------

Called to clear a user set value from a specific preference. This will, in effect, reset the value to the default value. If no default value exists the preference will cease to exist.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the preference to be cleared.</p></td>
</tr>
</tbody>
</table>

**Note:.**

This method does nothing if this object is a default branch.

boolean nsIPreferenceBranch::prefHasUserValue (in string aPrefName)
-------------------------------------------------------------------

Called to check if a specific preference has a user value associated to it.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aPrefName</td>
<td align="left"><p>The name of the preference to be tested.</p></td>
</tr>
</tbody>
</table>

**Note:.**

If a preference was manually set to a value that equals the default value, then the preference no longer has a user set value, i.e. it is considered reset to its default value. In particular, this method will return false for such a preference and the preference will not be saved by preferenceManager.savePrefs().

**Returns:.**

boolean true The preference has a user set value. false The preference only has a default value.

void nsIPreferenceBranch::deleteBranch (in string aStartingAt)
--------------------------------------------------------------

Called to remove all of the preferences referenced by this branch. Can also be used to remove a preference

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aStartingAt</td>
<td align="left"><p>The point on the branch at which to start the deleting preferences. Pass in &quot;&quot; to remove all preferences referenced by this branch. Pass the preferences name to remove a specific preference</p></td>
</tr>
</tbody>
</table>

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>The preference(s) do not exist or an error occurred.</p></td>
</tr>
</tbody>
</table>

void nsIPreferenceBranch::getChildList (in string aStartingAt, \[optional\] out unsigned long aCount, \[array, size\_is(aCount), retval\] out string aChildArray)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Returns an array of strings representing the child preferences of the root of this branch.

Example:

    var branch = preferenceManager.getBranch("test.pref.");
    var children = branch.getChildList("branch")
    children.forEach(element => {
    ...
    });

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aStartingAt</td>
<td align="left"><p>The point on the branch at which to start enumerating the child preferences. Pass in &quot;&quot; to enumerate all preferences referenced by this branch.</p></td>
</tr>
<tr class="even">
<td align="left">aCount</td>
<td align="left"><p>Receives the number of elements in the array.</p></td>
</tr>
<tr class="odd">
<td align="left">aChildArray</td>
<td align="left"><p>Receives the array of child preferences.</p></td>
</tr>
</tbody>
</table>

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>The preference(s) do not exist or an error occurred.</p></td>
</tr>
</tbody>
</table>

void nsIPreferenceBranch::resetBranch (in string aStartingAt)
-------------------------------------------------------------

Called to reset all of the preferences referenced by this branch to their default values.

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aStartingAt</td>
<td align="left"><p>The point on the branch at which to start the resetting preferences to their default values. Pass in &quot;&quot; to reset all preferences referenced by this branch.</p></td>
</tr>
</tbody>
</table>

**Note:.**

This method can be called on either a default or user branch but, in effect, always operates on the user branch.

<table>
<caption>Exceptions</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Error</td>
<td align="left"><p>The preference(s) do not exist or an error occurred.</p></td>
</tr>
</tbody>
</table>


