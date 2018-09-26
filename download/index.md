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

## Elan

Elan is a project manager for Lean. Elan installs different versions of Lean based on the requirements for a particular project. To install Elan:

1. Make sure `git` and `curl` are installed. For example, use your distribution package manager.
2. Run the command
```
curl https://raw.githubusercontent.com/Kha/elan/master/elan-init.sh -sSf | sh
```
and type enter when a question is asked. It is recommended that you re-login so that your environment knows about Elan.

## Binary

There are binary packages available for all major platforms here:

- [Binaries](https://github.com/leanprover/lean/releases/latest)

All previous releases are available here:

- [Older binaries](https://github.com/leanprover/lean/releases)

### Nightlies

Nightly builds of Lean's `master` branch can be found in the following repository:

- [Nightlies](https://github.com/leanprover/lean-nightly/releases)

## Source

The source code can be downloaded here:

- [Source Code](http://github.com/leanprover/lean)

## Editor Support

There are [Emacs](https://www.gnu.org/software/emacs/) and [Visual Studio Code](http://code.visualstudio.com) extensions, each of which support interactive editing.

- Emacs: [lean-mode](https://github.com/leanprover/lean-mode) is a major mode available as a MELPA package for Emacs 24.3 or newer.

- [Visual Studio Code](http://code.visualstudio.com) is available for all major platforms.
  The [Lean extension](https://marketplace.visualstudio.com/items?itemName=jroesch.lean) is available in its marketplace.
