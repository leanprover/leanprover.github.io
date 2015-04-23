---
layout: archive
title: "Debian 7 Installation"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

Run the following commands to install Lean:

{% highlight bash %}
wget https://raw.githubusercontent.com/leanprover/bin/master/lean-0.2.0-debian.deb
sudo dpkg -i lean-0.2.0-debian.deb
{% endhighlight %}


## Install emacs-24

Debian 7 (wheezy) only provides emacs-23 while lean-mode requires
emacs-24. To install emacs-24, edit `/etc/apt/sources.list` file and
add `deb http://http.debian.net/debian wheezy-backports main` to it.

Then, run the following commands:

{% highlight bash %}
sudo apt-get update
sudo aptitude --target-release wheezy-backports install emacs24
{% endhighlight %}

## Starting Lean Emacs mode

Configure `.emacs` initialization file using these
[instructions](https://github.com/leanprover/lean/blob/master/src/emacs/README.md).
