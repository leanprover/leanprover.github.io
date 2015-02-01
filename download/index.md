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

Lean has not been officially released yet, but you can try the latest daily
builds, and/or build the source code by yourself.

Windows 8
---------

[Download](https://github.com/leanprover/bin/blob/master/lean-0.2.0-windows.zip?raw=true)

[Installation instructions](wininst)

Ubuntu 14.04 / Ubuntu 14.10
---------------------------

Lean Emacs mode requires [Emacs](http://www.gnu.org/software/emacs/) version 24.3 (or greater).
The Lean Emacs mode is a complete IDE for editing Lean files. If you want to use
Lean Emacs mode to edit Lean files, and don't have Emacs on your system,
you can install it using

{% highlight bash %}
sudo apt-get install emacs24
{% endhighlight %}

Use the following commands to install Lean using PPA:

{% highlight bash %}
sudo add-apt-repository ppa:leanprover/lean
sudo apt-get update
sudo apt-get install lean
{% endhighlight %}

Once installed via PPA, you can use the standard `sudo apt-get upgrade` to get the latest version of Lean.

The command `leanemacs` starts Emacs with the Lean mode automatically configured for you.

If you prefer you can manually configure the Lean Emacs mode using the instructions
available [here](https://github.com/leanprover/lean/blob/master/src/emacs/README.md).

Ubuntu 12.04
------------

Use the following commands to install Lean using PPA:

{% highlight bash %}
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo add-apt-repository ppa:leanprover/lean
sudo apt-get update
sudo apt-get install lean
{% endhighlight %}

Once installed via PPA, you can use the standard `sudo apt-get upgrade` to get the latest version of Lean.


OS X 10.10 / 10.9
-----------------

Use the following commands to install Lean using Homebrew:

{% highlight bash %}
brew tap leanprover/lean
brew install lean
{% endhighlight %}

To upgrade lean to the latest version, run the following commands:

{% highlight bash %}
brew update && brew upgrade
{% endhighlight %}


Source Code
-----------

[Download](http://github.com/leanprover/lean/archive/master.zip)
