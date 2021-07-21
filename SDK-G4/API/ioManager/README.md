# IOManager

The IOManager API provides access to certain locations of the filesystem
  - **/.extension/** containing configuration script to be executed 
  - **/.software/** containing new firmware to be installed 
  - **/.playout/** the location where the app is stored
  - **/.log/** the location where logfiles to can be created 

GktFileSystem is a Javascript wrapper standing above IOManager.
GktFileSystem is available [here.](https://github.com/Qeedji/gekkota-os/tree/master/SDK-G4/wrappers%20js/GktFileSystem)
GktFileSystem does not provide access to append mode or to available space. You need to use IOManager API for that:

## Write to a file in append mode

### In UTF-8 format

```js
// Sync api can throw exceptions

// ioManager.asyncGetEntry("/.playout/example.txt", null, null, ioManager.READWRITE, (rv /* 0 on success */, entry) => {...})
let entry = ioManager.getEntry("/.playout/example.txt", null, null, ioManager.READWRITE);
if(!entry.exists) {
  // entry.asyncCreateFile((rv) => {...})
  entry.createFile();
  // ioManager.asyncGetEntry("/.playout/example.txt", null, null, ioManager.READWRITE, (rv /* 0 on success */, entry) => {...})
  entry = ioManager.getEntry("/.playout/example.txt", null, null, ioManager.READWRITE);
}
let stream = ioManager.newInputStreamFromString("écriture utf-8", "UTF-8");
// entry.asyncPut(stream, 0, stream.available(), (rv, written) => {...})
let written = entry.put(stream, 0 /* offset */, stream.available() /* length */);
// ioManager.asyncGetEntry("/.playout/example.txt", null, null, ioManager.READWRITE, (rv /* 0 on success */, entry) => {...})
entry = ioManager.getEntry("/.playout/example.txt", null, null, ioManager.READWRITE);
stream = ioManager.newInputStreamFromString(" écriture de la suite", "UTF-8");
// entry.asyncPut(stream, entry.size, stream.available(), (rv, written) => {...})
written = entry.put(stream, entry.size /* offset */, stream.available() /* length */);
```

### With a buffer

```js
...
const buffer = new ArrayBuffer(8);
const bufferView = new Uint8Array(buffer);
for(let i = 0; i < bufferView.length; ++i) {
  bufferView[i] = i + 40;
}
let stream = ioManager.newInputStreamFromArrayBuffer(buffer.byteLength, buffer);
...
```

### With a blob

```js
...
const blob = new Blob(["blob example"], {type : "text/plain"});
let stream = ioManager.newInputStreamFromBlob(blob);
...
```

## Get available space

```js
...
// ioManager.asyncGetEntry("/.playout/", null, null, ioManager.READONLY, (rv, playout) => {...})
const playout = ioManager.getEntry("/.playout/", null, null, ioManager.READONLY);
playout.getSpaceAvailable();
...
```
