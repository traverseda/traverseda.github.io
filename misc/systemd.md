# Problems with systemd

A lot of people are very dismissive of any critisism of systemd, so I figured
I'd document my own problems with it and hopefully help them realize that there
are actual legitimate problems, not just a bunch of old people whining because
they don't like change.

Some of these incidents happened years ago, so my memory of the details may be faulty.

First though, is the obligatory philisophical complaint.
Systemd is complicated, and does a
poor job of adhering to unix philosophy. Why does that even matter? Well unix
philosophy is the "glue" that binds linux into a usable programming enviroment.
Sure, you can pipe journalctl into grep, but
what if you want to use inotify, or tail a log, or expose logs over a network
share? 
Well you have to learn the systemd-specific solution, instead of just using the
tools that work with every other file.
Thankfully unix-style tooling powerful enough to work around systemd's issues, 
but each break from unix philosophy just makes things a little bit more annoying
to work with as a cohesive whole, often turning what would have been a few
commands into an actual project I need to put into version control.

---

This is far from all the times that systemd has caused me problems, just the
ones I was pissed off enough about to write down or remember. I've also tried to
be mindfull to not just complain about things being different. For example,
while I am annoyed at not being able to type `ls /etc/init.d` to get a full list
of services, it's not really a problem. It just a different way of doing things.
I could complain about service files being spread all over the file tree,
instead of in one central obvious place, but as I understand it systemd has some
reason why that's better for them and that's fine.

```
#Places you can find systemd unit files
/etc/systemd/system/*
/run/systemd/system/*
/lib/systemd/system/*
...

$XDG_CONFIG_HOME/systemd/user/*
$HOME/.config/systemd/user/*
/etc/systemd/user/*
$XDG_RUNTIME_DIR/systemd/user/*
/run/systemd/user/*
$XDG_DATA_HOME/systemd/user/*
$HOME/.local/share/systemd/user/*
/usr/lib/systemd/user/*

#Places you can find init scripts
/etc/init.d/*
$HOME/profile #Maybe, if you want to run a service when you log in.
```

Anyway, enough nitpicking. There are a bunch of little things like that that
aren't really a problem, but are just annoying enough to tempt me into a rant.

---

Years ago I wanted to run debian on a kobo ereader. Unfortunatly the built-in OS
image was not running systemd, and the kernal was several revisions out of date.
While I hard no problem getting a debian chroot running, all of the services
were designed to run under systemd, this made the whole project much more of a
pain in the ass than it should have been.

Journactl segfaults when running under qemu and systemd-nspawn. When
troubleshooting a raid array using a mipsel processor, I had persistant network
issues. I took the boot media out for trouble shooting, but when I ~~chrooted~~
systemd-nspawned into the host to try to address the problem, I discovered that
journalctl didn't work. Thankfully /var/log still had all the entries I needed
to fix the problem.

By default systemd will kill long-running processes when I log out. Processes
like screen or tmux.

>The intentional and willful breaking of screen and tmux was to fix a GNOME bug of GNOME not closing up as it should when the user logs out, so systemd was changed to mass kill processes. The interplay between GNOME and systemd in backroom dealings is a major pain point.

 ~ kevin_b_er on hackernews

There's now no way to, by default, keep a program running in the background
without a live ssh session. This kills not only screen, tmux, and nohup, but
also tools like [mosh](https://mosh.org/) for non-admin users.

## Other peoples problems

Sometimes I see a post about a problem someone else is having, and I document it
here if it seems reasonable.

>I used to think the systemd hate was silly... until I tried to get a VPN running and realized that all my DNS requests were going through a mysterious local DNS server. I spend about 3 hours figuring out how that thing works, and how to configure it, before giving up and writing up and down scripts that bypassed it entirely while the VPN was running.

 ~ pkulak on reddit
