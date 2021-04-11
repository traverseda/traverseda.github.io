## tinyServerless

A dead simple "server less" platform for deploying python app in a cluster. RethinkDb is the 9nly service your apps have, as it can be an acceptable alternative to many more traditional pieces of server infrastructure. You can use it as a distributed task-queue/database/file-store. Although it's not best in class at most of those, it clusters easily and minimizes the amount of infrastructure you need to set up.

It would be targeted largely as a distributed operating system project, probably with a (web based) cli and scripting interface that happily runs across an entire cluster of devices.

## openGroupware

A Django project that provides an "app store" allowimg you to easily install plug-ins. Kind of like WordPress, but intended for collaboration between small teams, or even just running a server for your family. Would probably start with nextcloud style file storage. Much simpler to develop for than tinySeverless.

For developers it offers an automatic configuration system so you can just say what (Middleware, apps, other config) your app depends on. Users just install through pip or our pip-wrapping "app store" and your app will just work.

Good platform to build small Django apps on, and get them in to your users hands easily. Will likely be AGPL licensed. If it ever made revenue, revenue would be shared with app developers.

## web archiving tools

The current web archiving tools the internet archive uses are quite difficult. I talked to a high up technical at IA and he confessed that he couldn't get squidwarc running.

I'd like to make a new, sqlite, based file format for internet archiving. One that makes it easier for individuals to create/manage their own local collection. Sqlite solves a lot of Warc file problems (like the need for a separate index file) while providing one key feature, a built in embedded search engine. This would allow this file format to be used similarly to kiwix's Zim file format, but would be a lot easier for developers to work with.

I'm also excited about using python-playwright for web capture.
