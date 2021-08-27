# Configuration of an App via the device's `WebUi`

This example is used to configure the App using an HTML page displayed in the device's `WebUI`.

## Principles

This page, named `index.html` is placed in the directory of the App. When you access the device's `WebUI`, it is displayed. You can define the configuration of the App there. During validation, the configuration is sent by an `XmlHttpRequest` in the form of a JSON file named `app-config.json` in the directory of the App. Saving the configuration in a JSON file is just an example, the App can naturally use any other format to store its configuration on the device.

For its part, the `app.html` retrieves the configuration from the JSON file `app-config.json` via an `XmlHttpRequest`. 
It can also follow changes to the configuration live by setting up a listening mode on its main directory (with a `FileSystemWatcher` object).

The conservation of the configuration during subsequent installations of the App is obtained by adding the attribute `refresh = "none"` to the `app-config.json` entry in the manifest file `manifest.xml`.

## App example

In the example provided, the WebUI simply allows you to modify the message displayed by the App on the device screen.

In `index.html`, a link named "Administration Console" provides access to the standard administration page of the device's WebUI.

It is possible to record debugging messages from the App by adding the entry `app.configuration-by-webui` in the `maintenance->Logs` tab of the device's WebUI.

## Compatibility

It can run with any `Qeedji` devices embedding `Gekkota OS 4.13.16` and above.
