---
layout: archive
title: "Lean Fundamentals"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

This document assumes that you have installed Lean following the instructions on the [Download](../../download) page. Users will generally work with Lean interactively using an editor, but here we provide some general information as to what is going on under the hood.

## Source Files and Object Files

A `.lean` (read "dot Lean") file consists of instructions that tell Lean how to construct formal terms in dependent type theory. Processing this file is a matter of filling in missing or implicit information, building the relevant terms, and sending them to the type checker to confirm that they are well-formed and have the specified types. This is analogous to the compilation process for a programming language, in that the `.lean` file contains source code that is compiled down to machine representations of the desired formal objects. Lean caches the output of the compilation process in files with the extension `.olean`, for "object Lean."

Assuming the directory that contains Lean is in your system path, you can run Lean on a file `foo.lean` from a system command line by typing:

{% highlight bash %}

lean foo.lean

{% endhighlight %}

The command 

{% highlight bash %}

lean --make foo.lean

{% endhighlight %}

not only compiles `foo` but saves the results in `foo.olean`. You can compile more than one file at once, as in the following example:

{% highlight bash %}

lean --make foo.lean bar.lean baz.lean

{% endhighlight %}

## Projects and the Search Path

A source file can import other files. By default, Lean looks for these in the current directory, as well as in the standard library, which it finds in a directory relative to the one from which it was invoked.

When processing a file and its dependencies, Lean uses any `.olean` files it can find, as they are up to date with the corresponding source file. Otherwise, it recursively compiles the dependencies as necessary. Of course, it is more efficient when there are precompiled `.olean` files present.

You can change the default search path or add additional directories by specifying them in the `LEAN_PATH` environment variable. When importing files within a `.lean` file, you can specify subdirectories using periods in the module name. For example, `import foo.bar.baz` looks for the file `foo/bar/baz.lean` relative to any of the locations listed in the search path. A leading period, as in `import .foo.bar`, indicates that the `.lean` file in question is specified relative to the current directory. Two leading periods, as in `import ..foo.bar`, indicates that the address is relative to the parent directory, and so on.

One often wants to create complex projects and arrange the source files in nested directories. To compile an entire project, simply go to the root directory and type

{% highlight bash %}

lean --make

{% endhighlight %}

This compiles all the files in that directory, descending recursively into subdirectories. The root directory is added to the `LEAN_PATH`, so files in a project can specify imports in absolute terms from the base directory.

## Options

You can obtain the following list of command line options by typing

{% highlight bash %}

lean --help

{% endhighlight %}

or

{% highlight bash %}

lean -h

{% endhighlight %}

Here are some of the most useful ones:

| option               | function                                                                                       |
|----------------------| ---------------------------------------------------------------------------------------------- |
|--version -v          | display version number                                                                         |
| --path               | display the path used for finding Lean libraries and extensions                                |
| --make               | create olean files                                                                             |
| --trust=num -t       | trust level (default: max) 0 means do not trust any macro, and type check all imported modules |
| --quiet -q           | do not print verbose messages                                                                  |
| --memory=num -M      | maximum amount of memory that should be used by Lean (in megabytes)                            |
| --threads=num -j     | number of threads used to process lean files                                                   |
| --tstack=num -s      | thread stack size in Kb                                                                        |
| --deps               | just print dependencies of a Lean input                                                        |
| --json               | print JSON-formatted structured error messages                                                 |
| --profile            | display elaboration/type checking time for each definition/theorem                             |
| --export=file -E     | export final environment as textual low-level file                                             |
| --export-all=file -A | export final environment (and all dependencies) as textual low-level file                      |

