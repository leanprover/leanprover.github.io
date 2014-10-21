// Add startsWith
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

var startTime = new Date().getTime();

function gup( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null ) return "";
    else return results[1];
}

function elapsed_time_string(startTime) {
    var currentTime = new Date().getTime();
    return ((currentTime - startTime) / 1000.0) + "sec"
}

function flush_and_print_console(text) {
    editor_console.setValue(text, 1);
}

function append_console(text) {
    editor_console.setValue(editor_console.getValue() + text, 1);
}

function append_console_nl(text) {
    append_console(text)
    append_console("\n")
}

// Main Editor (Top)
var util = ace.require("ace/autocomplete/util")
var langTools = ace.require("ace/ext/language_tools");
var editor_main = ace.edit("editor_main");
var Range = ace.require("ace/range").Range;
editor_main.session.setNewLineMode("unix");
editor_main.resize();
editor_main.setTheme("ace/theme/monokai");
editor_main.setShowPrintMargin(false);
editor_main.setOption("scrollPastEnd", 0.7)
editor_main.getSession().setMode("ace/mode/lean");
editor_main.setOptions({enableBasicAutocompletion: true,
                        enableLiveAutocompletion: false,
                        enableSnippets: true
                       });

// Console Window (Bottom)
var editor_console = ace.edit("editor_console");
editor_console.session.setNewLineMode("unix");
editor_console.resize();
editor_console.setOption("scrollPastEnd", 0.7)
editor_console.setReadOnly(true);
editor_console.setTheme("ace/theme/monokai");
editor_main.getSession().setMode("ace/mode/lean");
editor_console.setShowPrintMargin(false);
editor_console.getSession().setUseWrapMode(true);
editor_console.renderer.setShowGutter(false);

// Console Mode
// [0 = {main: 1.00, console: 0.00},
//  1 = {main: 0.50, console: 0.50}]
var consoleMode = {main:0.5, console:0.5};
// Resize Editors
var resize_editors = function () {
    var h = window.innerHeight;
    var w = window.innerWidth;
    var menu_height    = 40;
    var main_width, main_height, console_width, console_height;
    var console_top, console_bottom;
    if (w >= h) {
        // side by side
        main_width     = w * consoleMode.main;
        main_height    = h - menu_height;
        console_width  = w * consoleMode.console;
        console_height = h - menu_height;
        console_top    = menu_height;
        console_left   = main_width;
    } else {
        // top bottom
        main_width     = w;
        main_height    = (h - menu_height) * consoleMode.main;
        console_width  = w;
        console_height = h - menu_height - main_height;
        console_top    = menu_height + main_height;
        console_left   = 0;
    }
    $("#editor_main").css({top: menu_height, left:0, width: main_width, height: main_height})
    $("#editor_console").css({top: console_top, left: console_left,
                              width: console_width, height: main_height})
    editor_main.resize();
    editor_console.resize();
};
var toggleConsole = function () {
    if (consoleMode.main == 1.0) {
        consoleMode = {main:0.5, console:0.5};
    } else {
        consoleMode = {main:1.0, console:0.0};
    }
    resize_editors();
}
window.onresize = function(event) { resize_editors(); };
resize_editors();

// Setup Autocompletion
var leanCompleter = {
    getCompletions: function(editor, session, pos, prefix, callback) {
        var line = session.getLine(pos.row)
        prefix = util.retrievePrecedingIdentifier(line, pos.column, /[a-zA-Z_0-9\$-\.]/);
        mycompletions = []
        if (prefix.length > 2) {
            var mycompletions = completions.filter(function(elem) {
                return elem.name.indexOf(prefix) > -1;
            });
            var popup = editor_main.completer.popup;
            // TODO(soonhok): adjust the width automatically
            popup.container.style.width=window.innerWidth * 0.8;
        }
        callback(null, mycompletions);
    }
}
langTools.addCompleter(leanCompleter);

// Input Method
editor_main.commands.on("afterExec", function (e) {
    if (e.command.name === "insertstring") {
        if (e.args === " " || e.args === "\\") {
            var pos = editor_main.getCursorPosition();
            var line = editor_main.session.getLine(pos.row);
            var place_to_search = e.args === " " ? pos.column -1 : pos.column - 2;
            var index = index = line.lastIndexOf("\\", place_to_search) + 1
            var match = line.substring(index, pos.column - 1);
            if (index && corrections.hasOwnProperty(match)) {
                var replaceText = corrections[match];
                if (e.args === "\\") {
                    replaceText = replaceText + e.args;
                }
                editor_main.session.replace(
                    new Range(pos.row, index - 1, pos.row, pos.column),
                    replaceText
                );
            }
        }
    }
});


// Process Code Snippet
var codeText = gup("code");
if (codeText != "") {
    if(codeText.substr(-1) == '/') {
        codeText = codeText.substr(0, codeText.length - 1);
    }
    var text = decodeURIComponent(escape(atob(codeText)));
    editor_main.setValue(text, 1)
    console.log("|" + text + "|")
}

var welcome_msg = "Lean.JS: running Lean Theorem Prover on your browser.\n"
flush_and_print_console(welcome_msg);
append_console_nl(" -- Loading ace editor ...          DONE ["
                  + elapsed_time_string(startTime) + "]");


// =================
// Dropbox
// =================


// Browser-side applications do not use the API secret.
var client = new Dropbox.Client({ key: "kl2l16uaul9rwpe" });

var doSomethingCool = function() {
    console.log("do something cool");
}

var handleError = function(error) {
    console.log("Error", error);
}

// Try to use cached credentials.
client.authenticate({interactive: false}, function(error, client) {
    if (error) {
        return handleError(error);
    }
    if (client.isAuthenticated()) {
        // Cached credentials are available, make Dropbox API calls.
        doSomethingCool();
    } else {
        // show and set up the "Sign into Dropbox" button
        var button = document.querySelector("#signin-button");
        button.addEventListener("click", function() {
            // The user will have to click an 'Authorize' button.
            client.authenticate(function(error, client) {
                if (error) {
                    return handleError(error);
                }
                doSomethingCool();
            });
        });
    }
});

var dropbox_accountInfo
if (client.isAuthenticated()) {
    client.getAccountInfo(function(error, accountInfo) {
        if (error) {
        } else {
            $("#signin-button").text("");
            $("#username").text("Welcome " + accountInfo.name + "!");
            dropbox_accountInfo = accountInfo;
            client.readFile("input.lean", function(error, data) {
                if (error) {
                    append_console_nl(" -- Could not read from 'Dropbox/Apps/Lean.JS/input.lean'.");
                    console.log(error);
                } else if (codeText == "") {
                    editor_main.setValue(data, 1);
                    editor_main.focus();
                    append_console_nl(" -- 'Dropbox/Apps/Lean.JS/input.lean' loaded.");
                }
            });
        }
    });
} else {
    $("#signin-button").prepend("<img class=\"menu_icon\" src=\"/images/dropbox.svg\"/>");
}

// =================
// MAIN
// =================
var initialize = function() {
    startTime = new Date().getTime();
    append_console(" -- Initializing Lean ...           ")
    setTimeout(function() {
        Module.lean_init();
        append_console_nl("DONE [" + elapsed_time_string(startTime) + "]");
    }, 10)
};

var import_module = function(mname) {
    startTime = new Date().getTime();
    append_console(" -- Importing module '" + mname + "' ... ")
    setTimeout(function() {
        Module.lean_import_module(mname);
        append_console_nl("DONE [" + elapsed_time_string(startTime) + "]");
    }, 10)
};

var flycheck_buffer = [];

var parse_flycheck_msgs = function(buffer) {
    var i = 0;
    var mode = "outside";
    var errors = [];
    var column, endColumn, row, endRow, text, type;
    while (i < buffer.length) {
        line = buffer[i++];
        console.log(line);
        if (line.startsWith("FLYCHECK_BEGIN")) {
            console.log("BEGIN");
            mode = "flycheck";
            type = line.split(" ")[1].toLowerCase();
            line = buffer[i++];
            console.log(line);
            items = line.split(":")
            row = parseInt(items[1]) - 1;
            endRow = row + 1;
            endColumn = column = parseInt(items[2]);
            text = items.slice(3).join(":");
        } else if (line.startsWith("FLYCHECK_END")) {
            console.log("END");
            errors.push({row: row,
                         endRow: endRow,
                         column: column,
                         endColumn: endColumn,
                         text: text,
                         type: type});
            mode = "outside";
        } else if (mode == "outside") {
            console.log(line);
        } else if (mode == "flycheck") {
            text += "\n" + line
        } else {
            console.log("Something's wrong", line);
        }
    }
    return errors;
}

var process_file = function() {
    startTime = new Date().getTime();
    flush_and_print_console(" -- Processing file ...\n")
    var default_filename = "/input.lean";
    setTimeout(function() {
        FS.writeFile(default_filename, editor_main.getValue(), {encoding: 'utf8'});
        if (client.isAuthenticated()) {
            client.writeFile("input.lean", editor_main.getValue(), function(error, stat) {
                if (error) {
                    append_console_nl(" -- Failed to write to 'Dropbox/Apps/Lean.JS/input.lean'.");
                } else {
                    append_console_nl(" -- Saved to 'Dropbox/Apps/Lean.JS/input.lean'.");
                }
            })
        }
        setTimeout(function() {
            flycheck_buffer = [];
            editor_main.session.clearAnnotations();
            Module.lean_process_file(default_filename);
            var errors = parse_flycheck_msgs(flycheck_buffer);
            console.log(errors);
            editor_main.session.setAnnotations(errors);
            append_console_nl(" -- DONE [" + elapsed_time_string(startTime) + "]");
        }, 10)
    }, 10)
};

var print_usage = function() {
    append_console_nl(" -- Ready.")
    append_console_nl("");
    append_console_nl(" -- Press \"ctrl-x\" to run Lean.")
    append_console_nl(" -- Press \"ctrl-space\" to auto-complete.")
}

var process_file_command = {
    name: 'run_lean',
    bindKey: {
        win: 'Ctrl-x',
        mac: 'Command-x',
        sender: 'editor|cli'
    },
    exec: function(env, args, request) {
        process_file();
    }
};
editor_main.commands.addCommand(process_file_command);
editor_console.commands.addCommand(process_file_command);

// Setup LEAN.JS Module
var Module = { };
Module.filePackagePrefixURL = "//leanprover.com/";
if (gup("mem") != "") {
    Module.TOTAL_MEMORY=gup("mem") * 1024 * 1024;
} else {
    console.log("no memory option");
    Module.TOTAL_MEMORY=16 * 1024 * 1024;
}
append_console_nl(" -- Total memory: " + Module.TOTAL_MEMORY + " bytes.");

// timestamp before loading lean.js
startTime = new Date().getTime();
append_console(" -- Loading Lean ...                ");
Module['print'] = function(text) {
    flycheck_buffer.push(text);
    append_console_nl(text);
    editor_main.focus();
};
Module['noExitRuntime'] = true;
Module['postRun'] = function() {
    setTimeout(function() {
        initialize();
        setTimeout(function() {
            import_module("standard");
            setTimeout(print_usage, 10);
        }, 10);
    }, 10);
};
Module['preRun'] = [];
Module.preRun.push(function() {
    append_console_nl("DONE [" + elapsed_time_string(startTime) + "]");
})

// New Button
$(function () {
    var newButton = document.querySelector("#new-button");
    newButton.addEventListener("click", function() {
        editor_main.setValue("", 1);
    });
});
// Load Button
$(function () {
    var loadButton = document.querySelector("#load-button");
    loadButton.addEventListener("click", function() {
        if (client.isAuthenticated()) {
            var options = {
                success: function(files) {
                    $.get(files[0].link, function(data) {
                        editor_main.setValue(data, 1);
                    });
                },
                cancel: function() {
                },
                linkType: "direct", // or "preview"
                multiselect: false,
                extensions: ['.lean', '.lua', '.docx'],
            };
            Dropbox.choose(options);
        }

    });
});
// Run Button
$(function () {
    var runButton = document.querySelector("#run-button");
    runButton.addEventListener("click", function() {
        process_file();
    });
});
// Save Button
$(function () {
    var saveButton = document.querySelector("#save-button");
    saveButton.addEventListener("click", function() {
        if (client.isAuthenticated()) {
            // Dropbox.save("URL", "FILE");
        }
    });
});
// Console Button
$(function () {
    var consoleButton = document.querySelector("#console-button");
    consoleButton.addEventListener("click", function() {
        toggleConsole();
    });
});
// Share Button
$(function () {
    var shareButton = document.querySelector("#share-button");
    shareButton.addEventListener("click", function() {
        var base = window.location.href.split('?')[0];
        var text = editor_main.getValue();
        if (text != "") {
            var encodedText = btoa(unescape(encodeURIComponent(text)));
            var sharedURL = base + "?code=" + encodedText;
            window.prompt("Copy to clipboard: Ctrl+C, Enter", sharedURL);
        }
    });
});
