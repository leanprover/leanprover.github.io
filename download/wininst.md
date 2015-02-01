---
layout: archive
title: "Windows Installation"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

Download the [Lean zip file for Windows](https://github.com/leanprover/bin/blob/master/lean-0.2.0-windows.zip?raw=true),
and unfold it in a directory of your choice.

## Configuring Lean emacs mode

To use the Lean emacs mode, you must have [emacs version
24.3](https://ftp.gnu.org/gnu/emacs/windows/) (or greater) and
[python](https://www.python.org/downloads) installed on your system.

Both `emacs` and `python` need to be added to your `%PATH%`.
These instruction assume that `python` is installed at the default location
(`c:\Python27`) and emacs is under `c:\emacs\bin`.

### By Command Line

{% highlight batch %}
> setx PATH "%PATH%;c:\Python27\"
> setx PATH "%PATH%;c:\emacs\bin"
{% endhighlight %}


### By GUI

- Use `Win+Pause` to open System Properties.
- Under Windows 7 or newer, click on *Advanced system settings*.
- Click on *Environment Variables....*
- Under *System Variables* find `Path` then choose to Edit....

At the end of the listed path, append (include the first `;` only if not already present):
{% highlight batch %}
;C:\Python27\;C:\emacs\bin
{% endhighlight %}

## Starting Lean Emacs mode

After `emacs` and `python` have been added to your `%PATH%`.
You can start the Lean emacs mode by executing the `bin\leanemacs.bat`.

Advanced users can configure their `.emacs` initialization file using
these [instructions](https://github.com/leanprover/lean/blob/master/src/emacs/README.md).
