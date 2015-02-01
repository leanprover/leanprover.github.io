---
layout: archive
title: "Ubuntu 12 Installation"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

Lean Emacs mode requires [Emacs](http://www.gnu.org/software/emacs/) version 24.3 (or greater).
This version is not available by default in Ubuntu 12.04. [Here](http://ubuntuhandbook.org/index.php/2013/09/install-upgrade-to-emacs-24-3-in-ubuntu-13-04-12-10-12-04/)
are instructions to install it on Ubuntu 12.04, 12.10 and 13.04.

Use the following commands to install Lean using PPA:

{% highlight bash %}
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo add-apt-repository ppa:leanprover/lean
sudo apt-get update
sudo apt-get install lean
{% endhighlight %}

Once installed via PPA, you can use the standard `sudo apt-get upgrade` to get the latest version of Lean.

The command `leanemacs` starts Emacs with the Lean mode automatically configured for you.

If you prefer you can manually configure the Lean Emacs mode using the instructions
available [here](https://github.com/leanprover/lean/blob/master/src/emacs/README.md).
