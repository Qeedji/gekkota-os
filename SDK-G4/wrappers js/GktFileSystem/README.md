# GKTFILESYSTEM

GktFileSystem is a wrapper for Gekkota IOManager API

## Content

`gkt-filesystem.d.ts` : typing file to be used by an IDE or a builder

`build` directory : containing lib IIFE and lib es6 of the package

`doc` directory : package API documentation is [here.](./doc/index.md)

`example` directory : a full example of bootstrap App that unzips an archive

## Usage

### Create an empty file

```js
const f = GktFileSystem.root().newFile(".playout/example.txt");
f.write("", { overwrite: true }).execute().then(
  () => {
   // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

### Write to a file in Wr mode

#### In UTF-8 format

```js
const f = GktFileSystem.root().newFile(".playout/example.txt");
f.write("écriture utf-8", { overwrite: true, charset: "UTF-8" }).execute().then(
  () => {
   // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

#### With a buffer

```js
const f = GktFileSystem.root().newFile(".playout/example.txt");
const buffer = new ArrayBuffer(8);
const bufferView = new Uint8Array(buffer);
for(let i = 0; i < bufferView.length; ++i) {
  bufferView[i] = i + 40;
}
f.write(buffer, { overwrite: true }).execute().then(
  () => {
   // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

#### With a blob

```js
const f = GktFileSystem.root().newFile(".playout/example.txt");
const blob = new Blob(["blob example"], {type : "text/plain"});
f.write(blob, { overwrite: true }).execute().then(
  () => {
   // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

### Read from a file in UTF-8

```js
const f = GktFileSystem.root().newFile(".playout/example.txt");
f.read({responseType: "text", charset: "UTF-8" }).execute().then(
  (str) => {
    // TODO
  },
  (e) => {
    // TODO failure
  }
);
```

### Delete a file

``` js
const f = GktFileSystem.root().newFile(".playout/example.txt");
f.unlink().execute().then(
  () => {
    // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

### Create a directory

```js
const f = GktFileSystem.root().newDirectory(".playout/content/");
f.mkdir().execute().then(
  () => {
    // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

### Delete a directory

```js
const f = GktFileSystem.root().newDirectory(".playout/content/");
f.unlink({ deep: true }).execute().then(
  () => {
    // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

### Get file size

```js
const f = GktFileSystem.root().newFile(".playout/example.txt");
f.stat().execute().then(
  (s) => {
    const l = s.contentLength;
    const m = s.lastModified;
    const t = s.contentType;
    // TODO success
  },
  (e) => {
    // TODO failure
  }
);
```

### Get File/Folder List

```js
const f = GktFileSystem.root().newDirectory(".playout/content/");
f.list({ deep: false }).execute().then(
  (list) => {
    for(let i = 0; i < list.length; ++i) {
      const item = list[i];
      switch(item.type) {
        case "directory":
          // TODO
          break;
        case "file":{
          const p = item.path;
          const n = item.name;
          const s = item.stats;
          const l = s.contentLength;
          const m = s.lastModified;
          const t = s.contentType;
          // TODO
        }
        break;
      }
    }
  },
  (e) => {
    // TODO failure
  }
);
```

### Unzip a compressed file

```js
const playout = GktFileSystem.root().newDirectory(".playout/");
// End slash is important here
const archive = playout.newDirectory("archive.zip/");
archive.copy(playout, "content", { overwrite: false }).execute().then(
  () => {
    // TODO success
    // Content of archive.zip is copied here: .playout/content/
  },
  (e) => {
    // TODO failure
  }
);
```
