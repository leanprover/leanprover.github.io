---
layout: archive
title: "Debian 7/8 Installation"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

Visit [launchpad.net](https://launchpad.net/~leanprover/+archive/ubuntu/lean/+packages)
and download `.deb` file under `Trusty` series.

![Download .deb file]({{ site.url }}/download/debian.png)

Run the following commands to install Lean:

{% highlight bash %}
# Dependencies
apt-get install libstdc++-4.8-dev libgmp-dev libmpfr-dev liblua5.2-dev ninja-build
sudo dpkg -i <DOWNLOADED_DEB_FILE>
{% endhighlight %}

## Install emacs-24 on Debian-8

{% highlight bash %}
sudo apt-get install emacs24
{% endhighlight %}

## Install emacs-24 on Debian-7

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
