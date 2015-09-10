---
layout: archive
title: "OSX 10.10/10.09 Installation"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

We support two package management systems for OS X --
[homebrew](http://brew.sh) and [macports](https://www.macports.org).

Lean is continuously under development, and we recommend updating
periodically to ensure that the library is up to date and that you
have the latest features.

Homebrew
--------

Make sure you have [homebrew](http://brew.sh) installed.
Use the following commands to install Lean using Homebrew:

{% highlight bash %}
brew tap leanprover/lean
brew install lean
{% endhighlight %}

To upgrade lean to the latest version, run the following commands:

{% highlight bash %}
brew update && brew upgrade lean
{% endhighlight %}


Macports
--------

Make sure you have [macports](https://www.macports.org) installed.
Edit `/opt/local/etc/macports/sources.conf` (admin privilege required) and add the following line before the default source (one starting with `rsync`):

```
https://leanprover.github.io/macports/ports.tar
```

To install Lean, run the following commands:

{% highlight bash %}
sudo port -v sync
sudo port install lean
{% endhighlight %}

To upgrade lean to the latest version, run the following commands:

{% highlight bash %}
sudo port -v sync
sudo port upgrade lean
{% endhighlight %}


Setting up emacs
----------------

Make sure that you have emacs installed:

 - If you're using [homebrew](http://brew.sh), do `brew install emacs`
 - If you're using [macports](https://www.macports.org), do `sudo port install emacs`
 - You can also visit [emacsformacosx.com](http://emacsformacosx.com)
   to get a pre-compiled binary of emacs.

To configure Emacs to work with Lean, follow the instructions
[here](https://github.com/leanprover/lean/blob/master/src/emacs/README.md).
