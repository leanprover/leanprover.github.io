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

To use the Lean emacs mode, you must have [Emacs version
24.3](https://ftp.gnu.org/gnu/emacs/windows/) (or greater) and
[Python](https://www.python.org/downloads) installed on your system.
Either Python 2.7 or 3.5 should work.

Both `Emacs` and `Python` need to be added to your `%PATH%`.

- Use `Win+Pause` to open System Properties.
- Under Windows 7 or newer, click on *Advanced system settings*.
- Click on *Environment Variables....*
- Under *System Variables* find `Path` then choose to Edit....

Assuming Emacs and Python 2.7 have been installed at their default
locations, append the following to the end of the path (include the
first `;` only if not already present):
{% highlight batch %}
;C:\Python27\;C:\emacs\bin
{% endhighlight %}

If you installed Python 3.5 and checked the option to add Python to
the system path, you only need to add Emacs.

## Starting Lean Emacs mode

After `Emacs` and `Python` have been added to your `%PATH%`.
You can start the Lean emacs mode by executing the `bin\leanemacs.bat`.

Advanced users can configure their `.emacs` initialization file using
these [instructions](https://github.com/leanprover/lean/blob/master/src/emacs/README.md).
