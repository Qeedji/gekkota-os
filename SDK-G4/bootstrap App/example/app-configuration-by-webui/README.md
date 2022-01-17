# Configuration of an App with the device Web user interface

## Overview
This App shows how to configure an `App` by sending parameter with the device Web user interface. 

In the example, the `App` (`app.html`) is displaying on the device screen a Web page with a text (by default `Change the message to be displayed`) in the middle of the page . 

To send information to the App, connect to the device Web user interface and go to the `http://<device_IP_addr>/.playout/` App directory. The `index.html` page is displaying:
- the MAC address of the device
- a *Message to display* input
- the current value of the variable *field1*
- a *Validate* button
- a *Reboot* button
- an *Administration Console* link, shortcut to `http://<device_IP_addr>/.admin/`, to access to the device *Administration console*. 

In the *Message to display* input, type a new text (that will be then displayed on the device screen). For example, type *new text*. 
Then click on the `Validate` button.
On the device screen, the *Change the message to be displayed* text is straight now replaced by the *new text* text.

You can also call the Gekkota API from `index.html`: here is shown how to get/set the *nsISystemGeneralSettings.field1* attribute and how to reboot the device.

## Technical principles

An `index.html` is put in the `http://<device_IP_addr>/.playout/` App directory. When you access the device Web user interface, the `index.html` Web page is displayed automatically. When clicking on the `Validate` button, the `app-config.json` App configuration is sent by an `XmlHttpRequest` in the App directory. 

*Saving the App configuration into a JSON file is just for example; the App can support any other format to store the App configuration.*

*If required, the App configuration could be done using another directory.*

At its end, the `App` (`app.html`) retrieves the `app-config.json` App configuration with an `XmlHttpRequest`. 

*To avoid to restart the App so that the App configuration is taken into account, it is possible to set up a listening mode on the App directory with a `FileSystemWatcher` object.*

When the App configuration must not be overwritten the App is reinstalled, add the ```refresh = "none"``` in the `manifest.xml` manifest file like explained:

```Javascript
Manifest.xml example
<?xml version="1.0" encoding="UTF-8"?>
<RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <Description about="ns.innes.gekkota.manifest#metadata"
        xmlns:cms="ns.innes.custom">
        <cms:app-name>configuration-by-webui</cms:app-name>
        <cms:app-version>1.10.10</cms:app-version>
    </Description>
    <Description about="ns.innes.gekkota.manifest#cache">
        <Bag>
            <li>app.html</li>
            <li>index.html</li>
            <li>libs/</li>
            <li refresh="none">app-config.json</li>
        </Bag>
    </Description>
    <Description about="ns.innes.gekkota.manifest#launcher"
        xmlns:gktm="ns.innes.gekkota.manifest">
        <gktm:bootstrap>app.html</gktm:bootstrap>
    </Description>
</RDF>
```

It is possible to print logs from the App by adding the entry `app.configuration-by-webui` in the `Maintenance > Logs` menu of the device Web user interface.

## Compatibility

It can run with any `Qeedji` devices embedding `Gekkota OS 4.13.16` and above.
