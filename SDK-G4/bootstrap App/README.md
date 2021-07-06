# bootstrap App

To be played on Gekkota, a bootstrap App includes the following files :

- A bootstrap file (eg. *app.html*),
- A manifest file,
- Resources needed by the App.

The **manifest** file allows to :
+ embed some metadata coming from a CMS (metadata node),
+ define the entry point to launch the App (launcher node),
+ list all resources needed to run the application (cache).

![Alt text](graph.png?raw=true)

The **manifest** file and its different sections *metadata*, *launcher* and *cache* are fully described in the [launcher.manifest](../API/launcher.manifest/README.md) document.

For more information about bootstrap App, see the different use case  in the *example* directory.
