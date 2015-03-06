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

Homebrew
--------

Use the following commands to install Lean using Homebrew:

{% highlight bash %}
brew tap leanprover/lean
brew install lean
{% endhighlight %}

To upgrade lean to the latest version, run the following commands:

{% highlight bash %}
brew update && brew upgrade
{% endhighlight %}


Macports
--------

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
