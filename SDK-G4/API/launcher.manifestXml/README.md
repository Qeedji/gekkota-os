# Manifest in XML format

# Introduction

This document describes the manifest format of Gekkota.

This format is `XML` oriented.

Note that a more verbose `RDF` oriented format is also supported (see [launcher.manifest](../launcher.manifest/README.md)).

Its name is usually "manifest.xml". When it is retrieved by Gekkota in pull mode by requesting a DAV server, its naming formalism is as follows :

```
manifest.[ID].xml
```

where `[ID]` is the unique identifier of the device.
This identifier depends on the value of the `innes.appli.device-id-type` preference :

+ 0 : MAC ID of the platform (MAC address of the a determined network interface that is always present on this type of platform - example "30-9C-23-1E-D8-1B"),
+ 1 : name of the platform (hostname),
+ 2 : UUID of the platform (example "00000000-0000-0000-0001-00e04b3b3e9a").

The manifest file is used to :
+ embed metadata from a CMS (metadata node),
+ set the entry point to launch the App (launcher node),
+ list all resources needed to run the application (cache).

# Example

````xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <cache>
    <bag>
      <li>my-app.html</li>
      <li refresh="60" username="username@domain" password="pwd" optional="true" src="http://192.168.1.185/.medias/html/{$custom:var1}.html">.medias/{$custom:var1}.html</li>
      <li refresh="600" src="http://192.168.1.185/.medias/html/test2.html" credential="#credential2">.medias/test2.html</li>
    </bag>
  </cache>
  <launcher>
  <bootstrap>my-app.html</bootstrap>
  </launcher>
  <credentials>
    <bag>
      <li type="user_password" id="credential1">
        <username>username1@domain1</username>
        <password>pwd1</password>
      </li>
      <li type="user_password_domain" id="credential2">
        <username>username2@domain2</username>
        <password>pwd2</password>
        <domain>domain2</domain>
      </li>
    </bag>
  </credentials>
  <variables>
    <bag>
      <li name="var1">test</li>
    </bag>
  </variables>
  <metadata xmlns:cms="urn:domain-cms:my-cms" 
    xmlns:app="urn:domain-app:my-app">
    <cms:playout-id>my playout id</cms:playout-id>
    <cms:playout-label>my playout label</cms:playout-label>
    <cms:playout-revision>my playout revision</cms:playout-revision>
    <cms:app-id>my app id </cms:app-id>
    <cms:app-name>my app name</cms:app-name>
    <cms:app-version>my app version</cms:app-version>
    <cms:app-context>my app context</cms:app-context>
    <publish-id>my publish id</publish-id>
    <publish-size>my publish size</publish-size>
    <publish-generator>my publish generator</publish-generator>
    <publish-date>iso-8601 date</publish-date>
    <app:build-id>my build id</app:build-id>
    <app:app-target>my app target </app:app-target>
  </metadata>
</manifest>

````

# Format

The manifest is in XML format. It has no namespace associated.

Node names are not case-sensitive. Those attributes are in lowercase.

The main node of the document is `<manifest>`.

## `<manifest>` node

This is the main node of the document. 

It must contain the node `<cache>`.

It can contain the following optional nodes :

+ `<metadata>`
+ `<launcher>`
+ `<credentials>`
+ `<variables>`

## `<metadata>` node

This node is optional.
It contains the metadata of the startup App. This section is fully integrated into the platform status document.

It can optionaly define the following nodes :

+ `<publish-id>` which contains the identifier of the publication as a UUID,
+ `<publish-size>` which contains the size in bytes of the publication (excluding the manifest.xml file and external resources). if present, this value is used to calculate the download percentage of the publication in the status file.
+ `<publish-generator>` which contains the name of the manifest generator, as a free string of characters.
+ `<publish-date>` which contains the publication date, in the form ISO-8601.

It can also contain other optional elements (with other namespaces).


## `<launcher>` node

This node is optional.

It allows to configure Gekkota by indicating the URI of the startup App. If it is absent, the default value of the URI is `app.html`.

If present, it must contain a `<bootstrap>` node.

### `<bootstrap>` node

This node indicates the URI of the startup App. It can be local or remote.

For a local URI, the `<bootstrap>` node content must indicate the URI relative to the manifest.

Example :

````xml
<launcher>
  <bootstrap>my-app.html</bootstrap>
</launcher>
````

For a remote URI, the node content is empty and the following attributes are used :

+ `src` which must necessarily indicate the URI to load,
+ `username` which can optionaly indicate the user name of the authentication,
+ `password` which can optionaly indicate the password of the authentication,
+ `credential` which can optionaly indicate the identifier of the credential to use. It has priority over the `username` and `password` attributes.
The credential must be declared in the `<credentials>` node in `<li>` node with a `id` attribute that specifies the identifier. The value of `credential` attribute is this identifier preceded by the `#` character. 

Example :

````xml
<launcher>
  <bootstrap credential="#credential2" src="http://192.168.1.180/.medias/image.jpg" />
</launcher>
<credentials>
    <bag>
      <li type="user_password" id="credential1">
        <username>username1@domain1</username>
        <password>pwd1</password>
      </li>
      <li type="user_password_domain" id="credential2">
        <username>username2@domain2</username>
        <password>pwd2</password>
        <domain>domain2</domain>
      </li>
    </bag>
</credentials>
````

## `<cache>` node

This node is optional (in case of remote bootstrap).

It defines the list of all the resources needed to run the startup App.

The following attribute can be defined :

+ `downloader-state` : to indicate the initial state of the downloader when the startup App is launched. Following values are accepted :
    + `running` : The downloader starts at the same time as the startup App and try to refresh the resources. This is the default value and behaviour when the `downloader-state` attribute is not specified.
    + `paused` :  The downloader does nothing until the startup App resumes it. So the startup App decides when refreshing occurs.

The `<cache>` element contains a single `<bag>` element containing the list of resources as `<li>` elements.

The content of the `<li>` element indicates the URI of the resource relative to the manifest.

For each resource, the following attributes can be defined :

+ `src` : URI of the resource. The treatment of the resource varies according to the type of the URI :
    + `http`, `ftp` or `smb` : the resource is downloaded from a remote server, the `username` and `password` or `credential` attributes can be set for authentication. The `refresh` attribute can also be used to indicate a refreshing period of the resource. The `optional` attribute indicates that the resource may be missing (the download may fail)
    + `urn:device:storage:removable:<file-or-rep>` : the resource is copied from a removable disk,
+ `username` : to indicate the login of the connection in the case where the attribute `src` is a remote resource.
+ `password` : to indicate the password of the connection in the case where the attribute `src` is a remote resource.
+ `credential` to indicate the identifier of the credential to use in the case where the attribute `src` is a remote resource. It has priority over the `username` and `password` attributes.
The credential must be declared in the `<credentials>` node in `<li>` node with a `id` attribute that specifies the identifier. The value of `credential` attribute is this identifier preceded by the `#` character.
+ `refresh` : indicates the refresh period in seconds in case the `src` attribute is a remote resource. 2 special values are also accepted :
    + `manifest-update` : the resource is refreshed at the same time as the manifest. This is the default value and behaviour when the `refresh` attribute is not specified.
    + `none` : the resource is never refreshed. For example, use this value for resources that the startup App creates locally and wants to conserve even when the manifest is updated. 
+ `optional` : indicates that the remote resource specified by `src` is optional and may fail to download.

Example :

````xml
<cache downloader-state="running">
    <bag>
      <li refresh="60" username="username@domain" password="pwd" optional="true" src="http://192.168.1.185/.medias/html/test.html">.medias/test.html</li>
      <li refresh="600" src="http://192.168.1.185/.medias/html/test2.html" credential="#credential2">.medias/test2.html</li>
      <li refresh="manifest-update" src="http://192.168.1.185/.medias/html/test3.html">.medias/test3.html</li>
      <li>.medias/test4.html</li>
      <li refresh="none">.medias/reserved/</li>
    </bag>
</cache>
<credentials>
    <bag>
      <li type="user_password" id="credential1">
        <username>username1@domain1</username>
        <password>pwd1</password>
      </li>
      <li type="user_password_domain" id="credential2">
        <username>username2@domain2</username>
        <password>pwd2</password>
        <domain>domain2</domain>
      </li>
    </bag>
</credentials>
````

## `<credentials>` node

This node is optional.

It defines the list of all credentials used by remote resources.

This element contains a single `<bag>` element containing the list of credentials as `<li>` elements.

The `<li>` element must define the following attributes :

+ `id` : the identifier of credential,
+ `type` : the type of credential.

The child nodes of the `<li>` node depends on the value of the `type` attribute.

### `user_password` credential

The `user_password` credential node contains the following children :

+ `<username>` must necessarily indicate the login of the credential by its value,
+ `<password>` must necessarily indicate the password of the credential by its value.

Example :

````xml
<credentials>
    <bag>
      <li type="user_password" id="credential1">
        <username>username1@domain1</username>
        <password>pwd1</password>
      </li>
    </bag>
</credentials>
````

### `user_password_domain` credential

The `user_password_domain` credential node contains the following children :

+ `<username>` must necessarily indicate the login of the credential by its value,
+ `<password>` must necessarily indicate the password of the credential by its value,
+ `<domain>` must necessarily indicate the domain of the credential by its value.

Example :

````xml
<credentials>
    <bag>
      <li type="user_password_domain" id="credential2">
        <username>username2@domain2</username>
        <password>pwd2</password>
        <domain>domain2</domain>
      </li>
    </bag>
</credentials>
````

## `<variables>` node

This node is optional.

It defines the list of all variables used. A variable defined in this list can be used in all URIs of the document.

The `<variables>` element contains a single `<bag>` element containing the list of variables as `<li>` elements.

The name of the variable is given by the `name` attribute. 

The value of the variable is given by the node value.

Example :

````xml
<variables>
    <bag>
      <li name="var1">test</li>
    </bag>
</variables>
<cache>
    <bag>
      <li>{$custom:var1}.html</li>
    </bag>
</cache>
````

## URI format

The URI format is standard, but can also contain variables.

### Custom variables

Custom variables can be referenced with the following formalism :
```
{$custom:[var]}
```
where `[var]` is the name of a custom variable defined in a `variables` node.

Example :
````xml
<variables>
    <bag>
      <li name="var1">test</li>
    </bag>
</variables>
<cache>
    <bag>
      <li>{$custom:var1}.html</li>
    </bag>
</cache>
````

### Device variables

Device variables can be referenced with the following formalism :
```
{$deviceInfo:(hostname|mac|uuid|field[1-5])}
```
where :
 + `hostname` is the name of the platform (hostname),
 + `mac` is the MAC address of the platform (MAC of the first network interface - example "30-9C-23-1E-D8-1B"),
 + `uuid` is the UUID of the platform (example "00000000-0000-0000-0001-00e04b3b3e9a")
 + `field[1-5]` is the values of preferences `innes.player.device-info.field[1-5]`

Example :
```
<cache>
    <bag>
      <li>./medias/images/{$deviceInfo:mac}/image.jpg</li>
      <li>./medias/images/{$deviceInfo:field2}/video.mp4</li>
    </bag>
</cache>

```
