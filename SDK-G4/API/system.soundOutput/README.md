nsISystemAdapterSoundOutput interface Reference
===============================================

Public Attributes
-----------------

-   attribute bool cardActivated

<!-- -->

-   attribute bool mute

<!-- -->

-   attribute unsigned short volume

<!-- -->

-   attribute bool enabled

<!-- -->

-   readonly attribute nsISystemAdapterSoundOutput registered

Detailed Description
--------------------

The nsISystemAdapterSoundOutput interface allows to control audio settings (live and persistent) on the hardware platform running Gekkota.

**Build note**: You need to execute the **build.cmd** file to generate the boostrap app. Otherwise there will be a mismatch between the html file name and the one the manifest tries to launch. Find more information in *SDK-G4/bootstrap App/* documentation.

Member Data Documentation
-------------------------

### attribute bool nsISystemAdapterSoundOutput::cardActivated

Sound card activation

### attribute bool nsISystemAdapterSoundOutput::mute

Audio mute

### attribute unsigned short nsISystemAdapterSoundOutput::volume

Audio volume between 0 to 100.

### attribute bool nsISystemAdapterSoundOutput::enabled

Indicate if the adapter is enabled

### readonly attribute nsISystemAdapterSoundOutput nsISystemAdapterSoundOutput::registered

Retrive an secondary instance of the adapter that work with registrered values otherwise live values.
