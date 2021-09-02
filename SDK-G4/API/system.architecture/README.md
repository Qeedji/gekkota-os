nsISystemArchitecture interface Reference
=========================================

-   nsIArray getHardwareComponentsByType ( in unsigned short aType)

Detailed Description
--------------------

XPCOM nsISystemArchitecture interface attached to the description of the hardware architecture of a device.

The associated object can be retrieved via the nsISystemManager::architecture attribute.

For example, in JavaScript :

    var architecture = systemManager.architecture
    const Ci = Components.interfaces;
    var components = architecture.getHardwareComponentsByType(Ci.nsISystemHardwareComponent.COMPONENT_TYPE_BOARD);
    for (var i = 0; i < components.length; i++)
    {
      var component = components.queryElementAt(i,Ci.nsISystemHardwareComponent)
       ...
    }

nsIArray nsISystemArchitecture::getHardwareComponentsByType (in unsigned short aType)
-------------------------------------------------------------------------------------

Get all hardware components of type aType present in the system

<table>
<caption>Parameters</caption>
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">aType</td>
<td align="left"><p>the type of hardware component to retrieve</p></td>
</tr>
</tbody>
</table>

**Returns:.**

the array of hardware components of type aType (nsISystemHardwareComponent)

nsISystemHardwareComponent interface Reference
==============================================

Public Attributes
-----------------

-   const unsigned short COMPONENT\_TYPE\_BOARD

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_SOC

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_MICROPROCESSOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_MICROCONTROLER

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_GPU2D

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_GPU3D

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_DISPLAY\_COMPOSITOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_SOUND\_COMPOSITOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_VIDEO\_PROCESSOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_VIDEO\_DECODER

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_VIDEO\_ENCODER

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_VIDEO\_ACCELERATOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_AUDIO\_PROCESSOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_AUDIO\_DECODER

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_AUDIO\_ENCODER

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_AUDIO\_ACCELERATOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_IMAGE\_DECODER

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_IMAGE\_ENCODER

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_IMAGE\_ACCELERATOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_DSP

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_NEURONAL\_PROCESSOR

<!-- -->

-   const unsigned short COMPONENT\_TYPE\_POWER\_MANAGEMENT

<!-- -->

-   readonly attribute unsigned short type

<!-- -->

-   readonly attribute AUTF8String typeName

<!-- -->

-   readonly attribute AUTF8String reference

<!-- -->

-   readonly attribute AUTF8String label

<!-- -->

-   readonly attribute AUTF8String identifier

<!-- -->

-   readonly attribute nsIArray subcomponents

Detailed Description
--------------------

Interface XPCOM nsISystemHardwareComponent attached to the description of a hardware component

Member Data Documentation
-------------------------

### const unsigned short nsISystemHardwareComponent::COMPONENT\_TYPE\_BOARD

Constants associated with the different types of hardware component

### readonly attribute unsigned short nsISystemHardwareComponent::type

The type of the hardware component (values from enum above)

### readonly attribute AUTF8String nsISystemHardwareComponent::typeName

The type name of the hardware component (previous constantes name with the "COMPONENT\_TYPE" prefix removed)

### readonly attribute AUTF8String nsISystemHardwareComponent::reference

The reference of the hardware component (as it appears in the ordering information)

### readonly attribute AUTF8String nsISystemHardwareComponent::label

The label of the hardware component (human readable)

### readonly attribute AUTF8String nsISystemHardwareComponent::identifier

The identifier (unique) of the hardware component instance in the system architecture

### readonly attribute nsIArray nsISystemHardwareComponent::subcomponents

The list of internal sub-components included in the component (nsIHardwareComponent interface is exposed for each member). Can be an empty array

nsISystemMicroprocessorUnit interface Reference
===============================================

Public Attributes
-----------------

-   readonly attribute unsigned short nbCores

<!-- -->

-   readonly attribute AUTF8String architecture

Detailed Description
--------------------

Interface XPCOM nsISystemHardwareComponent exposed by hardware components of type COMPONENT\_TYPE\_MICROPROCESSOR\_UNIT

Member Data Documentation
-------------------------

### readonly attribute unsigned short nsISystemMicroprocessorUnit::nbCores

The number of cores in the microprocessor unit

### readonly attribute AUTF8String nsISystemMicroprocessorUnit::architecture

The architecture of the microprocessor

nsISystemMicrocontrolerUnit interface Reference
===============================================

Public Attributes
-----------------

-   const unsigned short MULTIPROCESSING\_MODE\_SMP

<!-- -->

-   const unsigned short MULTIPROCESSING\_MODE\_ASMP

<!-- -->

-   readonly attribute unsigned short multiprocessingMode

<!-- -->

-   readonly attribute unsigned short nbCores

<!-- -->

-   readonly attribute AUTF8String architecture

Detailed Description
--------------------

Interface XPCOM nsISystemMicrocontrolerUnit exposed by hardware components of type COMPONENT\_TYPE\_MICROCONTROLER\_UNIT

Member Data Documentation
-------------------------

### const unsigned short nsISystemMicrocontrolerUnit::MULTIPROCESSING\_MODE\_SMP

Constants associated with the different multiprocessor mode

### readonly attribute unsigned short nsISystemMicrocontrolerUnit::multiprocessingMode

Mode of multiprocessing (values in enum above)

### readonly attribute unsigned short nsISystemMicrocontrolerUnit::nbCores

The number of cores in the microcontroler unit

### readonly attribute AUTF8String nsISystemMicrocontrolerUnit::architecture

The architecture of the microcontroler
