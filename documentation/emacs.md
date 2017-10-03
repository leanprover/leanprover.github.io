---
layout: archive
title: "Using Lean with Emacs"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

This document assumes that you have installed Lean and the Lean Emacs packages following the instructions on the [Download](../../download) page and the [lean-mode](https://github.com/leanprover/lean-mode) readme, respectively.

## About Emacs

Emacs is a powerful text editor, and there are a number of introductory tutorials on the web. See, for example:

- [A Guided Tour of Emacs](http://www.gnu.org/software/emacs/tour/)
- [Absolute Beginner's Guide to Emacs](http://www.jesshamrick.com/2012/09/10/absolute-beginners-guide-to-emacs/)
- [Introduction to Emacs Course](http://www.ucs.cam.ac.uk/docs/course-notes/unix-courses/earlier/Emacs/files/course.pdf)

You can get pretty far using the menus for basic editing and file management. Those menus list keyboard-equivalents for the commands. Notation like `C-x`, short for "control x," means "hold down the control key while typing x." The notation `M-x`, short for "Meta x," means "hold down the Alt key while typing x," or, equivalently, "press the Esc key, followed by x." For example, the Emacs file menu lists `C-c C-s` as a keyboard-equivalent for the "save file" command.

## Editing .lean Files

To use Emacs with Lean, you simply need to create a file with the extension `.lean` and edit it. For example, you can create a file by typing `emacs my_file.lean` in a terminal window, in the directory where you want to keep the file. Assuming everything has been installed correctly, Emacs will start up in Lean mode, already checking your file in the background. 

Lean mode offers syntax highlighting, so commands, identifiers, and so on are color-coded. Any errors that Lean detects are subtly underlined in red, and the editor adds an annotation to the left margin at lines where errors occur. As you continue to type and eliminate errors, these annotations magically disappear. Lean uses multiple cores to process a file and caches previous work to speed up compilation. As a result, changes you make are registered almost instantaneously.

If you put the Emacs cursor on a highlighted error, Emacs displays the error message in at the bottom of the frame. If you hover over the highlighted error with the system cursor, the error message appears in a pop-up bubble. Alternatively, if you type `C-c ! l` while in Lean mode, Emacs opens a new window with a list of compilation errors. Some commands in Lean, such as `check` and `print`, produce output. The annotations are a different color, but they are otherwise handled the same way.

Lean mode relies on an Emacs package named *Flycheck* for this functionality, as evidenced by the letters `FlyC` that appear in the information line.  Flycheck offers a number of commands that begin with `C-c !`. For example, `C-c ! n` moves the cursor to the next error, and `C-c ! p` moves the cursor to the previous error. You can get to a help menu that lists these key bindings by clicking on the `FlyC` tag. 

It is often inconvenient to have to put the cursor on a highlighted identifier to see an error message or the outcome of a `print` or `check` command. The keystrokes `C-c C-n` toggle `Lean-Next-Error` mode, in which the next message (or all the messages that occur on the line that the cursor is on, if there are any) appears in a buffer named `*lean-info*`. You can position this window anywhere you want using Emacs commands for splitting windows and loading buffers. Pressing `C-c C-n` again toggles the mode off.

Typing an underscore in an expression asks Lean to infer a suitable value for the expression and fill it in automatically. In cases where Lean is unable to determine a value for the argument, the underscore is highlighted, and the error message indicates the type of the "hole" that needs to be filled. This can be extremely useful when constructing proofs incrementally. You can start typing a proof sketch, using either `sorry` or an underscore for details you intend to fill in later. Assuming the proof is correct modulo these missing pieces of information, the error message at an unfilled underscore tells you the type of the term you need to construct, typically an assertion you need to justify.

## Features

The Emacs Lean mode maintains a continuous dialog with the background Lean server and uses it to present useful information to you. For example, if you put your cursor on any identifier --- a theorem name, a defined symbol, or a variable --- Emacs displays its type in the information line at the bottom. 

The Lean mode supports auto completion if you install the optional `company-lean` package; see the `lean-mode` readme for details.

If you put your cursor on an identifier and hit `M-.`, Emacs will take you to the identifier's definition, whether it is in the same file, in another file in your project , or in the library. This works even in an autocompletion popup window: if you start typing an identifier, press the tab key, choose a completion from the list of options, and press `M-.`, you are taken to the symbol's definition.  If you have Emacs 25 or later, you can then press `M-,` to go back to the original location.

In tactic mode, if you put your cursor on a tactic (or the keyword `begin` or `end`) and type `C-c C-g`, Emacs will show you the goal in the `*lean-info*` buffer.

Here is another useful trick: if you see some notation in a Lean file and you want to know how to enter it from the keyboard, put the cursor on the symbol and type `C-c C-k`.

## Projects and the Search Path

When you `import` a file, Lean searches for it in prescribed locations, as described in [Lean Fundamentals](../fundamentals).

It is often useful to organize your project files in a hierarchical directory structure. Because files can be opened in Emacs anywhere and at any time, it takes a bit of effort to help Lean identify the root directory. You can do this simply by creating a file named `.project` there. This serves only as a marker, and the contents of the file are ignored. (On variants of Unix, you can create an empty file by typing `touch .project` at a shell prompt.) When you open a `.lean` file in Emacs, Lean traverses the parent directories, and if it finds a `.project` file along the way, it takes that to be the root of the project. That root is added to the Lean search path, as described in 
[Lean Fundamentals](../fundamentals).

Lean mode starts one Lean server for each project being edited. As a result, if you are editing files `a.lean` and `b.lean` in the same project, and `b.lean` depends on `a.lean`, then whenever you make a change in `a.lean` the result is immediately visible to `b.lean`.

Changes are not immediately available across projects, however. Suppose you have a project `foo` that depends on another project `bar` and you are editing files in both. If you want the changes in `bar` to be available to `foo`, simply save all the files in `bar`, switch to any file in `foo`, and either type `C-c C-r` or choose the corresponding Lean menu option to restart the Lean server. Upon restarting, the server for `foo` will detect and use the new version of `bar`.


## Troubleshooting

If for some reason the Lean background process does not seem to be responding (for example, the information line no longer shows you type information), type `C-c C-r` or `M-x lean-server-restart-process`, or choose "restart lean process" from the Lean menu, and with luck that will set things right again.

In Lean, the `exit` command halts processing of a file abruptly. Inserting an `exit` therefore prevents Lean from checking the file beyond that point.

## Key Bindings and Commands


| Key                | Function                                                                        |
|--------------------|---------------------------------------------------------------------------------|
| <kbd>M-.</kbd>     | jump to definition in source file (`lean-find-definition`)                      |
| <kbd>M-,</kbd>     | return to original position (requires Emacs 25)                                 |
| <kbd>C-c C-k</kbd> | shows the keystroke needed to input the symbol under the cursor                 |
| <kbd>C-c C-g</kbd> | show goal in tactic proof (`lean-show-goal-at-pos`)                             |
| <kbd>C-c C-x</kbd> | execute lean in stand-alone mode (`lean-std-exe`)                               |
| <kbd>C-c C-n</kbd> | toggle next-error-mode: shows next error in dedicated lean-info buffer          |
| <kbd>C-c C-r</kbd> | restart the lean server                                                         |
| <kbd>C-c ! n</kbd> | flycheck: go to next error                                                      |
| <kbd>C-c ! p</kbd> | flycheck: go to previous error                                                  |
| <kbd>C-c ! l</kbd> | flycheck: show list of errors                                                   |

