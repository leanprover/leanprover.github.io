---
layout: archive
title: "Using Lean with Visual Studio Code"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

If you have installed [Visual Studio Code](https://code.visualstudio.com/), you can easily add the Lean extension by clicking the extension icon in the view bar at left and searching for `lean`. To run properly, the extension needs to be able to find Lean. You can make this possible in one of three ways:

- Add a path to the Lean binary to your `PATH` environment variable.
- Use `make install` from the Lean build directory to copy the Lean binary to a directory in your search path.
- Specify the Lean path in the VS Code `settings.json` file. To do this, choose `File -> Preferences -> User Settings`, find `Lean configuration`, and set `lean.executablePath` to the correct path.

After that, if you create a file with the extension `.lean` and edit it, Lean will check the file continuously as you type. For example, if you type the words `check id`, the word `check` is underlined in green to indicate a response from the Lean server. Hovering over the word `check` displays the response, in this case, the type of the identity function.

The status bar at the bottom indicates that Lean is running and displays the number of errors, warnings, and informational messages. Lean uses multiple cores to process a file and caches previous work to speed up compilation. As a result, changes you make are registered almost instantaneously.

The Lean extension provides syntax highlighting, so commands, identifiers, and so on are color-coded. Errors are underlined in red, and hovering over these annotations displays the error message. Warnings and other output from Lean are communicated in a similar way. Hovering over an identifier shows you its type.

VS Code Intellisense suggests completions as you type. These are context sensitive. If you are typing an identifier, it suggests suitable completions for identifiers. After `import`, it suggests modules to import, after `set_option`, it suggests suitable options, and so on.

You can enter Unicode characters with a backslash. For example, `\a` followed by an enter inserts an alpha. 

You can see the commands provided by the Lean extension by typing `ctrl-shift-P` on Windows/Linux or `cmd-shift-P` on a Mac, and then typing `Lean` into the search bar to filter the list.

If you are on a line in a tactic proof and type `ctrl-shift-enter`, the output buffer will show you the goal at that point.

Clicking on the part of the status bar that indicates the number of errors opens up a buffer with a global list of errors.

Typing an underscore in an expression asks Lean to infer a suitable value for the expression and fill it in automatically. In cases where Lean is unable to determine a value for the argument, the underscore is highlighted, and the error message indicates the type of the "hole" that needs to be filled. This can be extremely useful when constructing proofs incrementally. You can start typing a proof sketch, using either `sorry` or an underscore for details you intend to fill in later. Assuming the proof is correct modulo these missing pieces of information, the error message at an unfilled underscore tells you the type of the term you need to construct, typically an assertion you need to justify.

## Projects and the Search Path

When you `import` a file, Lean searches for it in prescribed location, as described in [Lean Fundamentals](../fundamentals). It is often useful to organize your project files in a hierarchical directory structure. In VS Code, you work on a project by opening the root folder from the `File` menu. When you edit a file in such a project, the Lean extension recognizes the folder as the root of the project and adds it to the search path. 

## Troubleshooting

If for some reason the Lean background process does not seem to be responding, type `ctrl-shift-P Lean` and choose `Lean: Restart` to try restarting the server.

In Lean, the `exit` command halts processing of a file abruptly. Inserting an `exit` therefore prevents Lean from checking the file beyond that point.
