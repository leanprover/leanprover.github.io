---
layout: archive
title: "Using Lean Online"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

You can run a Javascript version of Lean [online](https://leanprover.github.io/programming_in_lean/?live) in your browser. The tutorial documents also use this system. It is much slower than a native version, but it provides a convenient way to use Lean and experiment with it.

The online version of Lean checks your input continuously. Lean output and error messages are indicated with icons in the left gutter, and are displayed in popups when you hover over these icons. If you hover over an identifier, the type is displayed in a popup. When you hover over the lines of a tactic proof, the goal at that line is displayed.

You can type unicode characters with a backslash. For example, `\and ` yields the unicode symbol for conjunction, and `\a `, `\b `, and `\g ` yield the unicode alpha, beta, and gamma respectively. Note that you need to type a space to enter the symbol, and that space is consumed rather than added to the text.

Entering `ctrl-space` provides a popup window with suitable completions, depending on the context. For example, if you are typing an identifier, it displays a list of possible completions and their types. If you type `set_option` and press `ctrl-space`, it will give you a list of options, and their current settings.

There are a number of buttons in the toolbar. The page icon clears the editor input. The play (triangle) icon recompiles the document. The next button, a square by default, cycles through panel layouts. In the tutorials, the book icon takes you to a PDF version. Finally, the gear icon lets you specify whether Lean output is also sent to the console window.

