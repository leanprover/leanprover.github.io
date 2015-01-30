---
layout: archive
title: "Download"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

Lean was not officially released yet, but you can try the latest daily
builds, and/or build the source code by yourself.

- [Windows 8](https://github.com/leanprover/bin/blob/master/lean-0.2.0-windows.zip?raw=true)

- Ubuntu 14.04 / Ubuntu 14.10: use the following commands to install Lean using PPA

{% highlight bash %}
sudo add-apt-repository ppa:leanprover/lean
sudo apt-get update
sudo apt-get install lean
{% endhighlight %}

Once installed via PPA, you can use the standard `sudo apt-get upgrade` to get the latest version of Lean.

- Ubuntu 12.04: use the following commands to install Lean using PPA

{% highlight bash %}
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo add-apt-repository ppa:leanprover/lean
sudo apt-get update
sudo apt-get install lean
{% endhighlight %}

Once installed via PPA, you can use the standard `sudo apt-get upgrade` to get the latest version of Lean.

- OSX: use the following commands to install Lean using Homebrew

{% highlight bash %}
brew tap leanprover/lean
brew install lean
{% endhighlight %}

To upgrade lean to the latest version, run the following commands:

{% highlight bash %}
brew update && brew upgrade
{% endhighlight %}

- [Source code](http://github.com/leanprover/lean/archive/master.zip)
