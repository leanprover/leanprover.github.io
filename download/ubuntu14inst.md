---
layout: archive
title: "Ubuntu 14/15 Installation"
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
