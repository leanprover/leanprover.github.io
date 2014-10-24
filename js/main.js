// Client side redirect to HTTPS
// Soonhok: This is not as good as server-side methods,
// however it seems that this is all we can do with github pages.
if (window.location.protocol != "https:")
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

// Add startsWith
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

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

var myModule = (function() {
    var dropbox_lean_js_app_key = "kl2l16uaul9rwpe";
    var dropbox_lean_js_app_prefix = "Dropbox/Apps/Lean.JS/";
    var dropbox_client = new Dropbox.Client({ key: dropbox_lean_js_app_key });
    var util = ace.require("ace/autocomplete/util")
    var langTools = ace.require("ace/ext/language_tools");
    var editor_main = ace.edit("editor_main");
    var Range = ace.require("ace/range").Range;
    var editor_console = ace.edit("editor_console");
    var main_console_ratio = 0.5;
    var menu_height = 40;
    var theme = "ace/theme/monokai";
    var lean_output_buffer = [];
    var default_filename = "input.lean";
    var codeText = gup("code");
    return {
        editor_main: editor_main,
        editor_console: editor_console,
        push_output_buffer: function(text) {
            lean_output_buffer.push(text);
        },
        init_editor_main: function() {
            editor_main.session.setNewLineMode("unix");
            editor_main.setTheme(theme);
            editor_main.getSession().setMode("ace/mode/lean");
            editor_main.setShowPrintMargin(false);
            editor_main.setOption("scrollPastEnd", 0.7)
            editor_main.setOptions({enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: true
                                   });
            editor_main.resize();
        },
        init_editor_console: function() {
            editor_console.session.setNewLineMode("unix");
            editor_console.setTheme(theme);
            editor_console.setShowPrintMargin(false);
            editor_console.setOption("scrollPastEnd", 0.7)
            editor_console.setReadOnly(true);
            editor_console.getSession().setUseWrapMode(false);
            editor_console.renderer.setShowGutter(false);
            editor_console.resize();
        },
        get_dropbox_client: function() {
          return dropbox_client;
        },
        get_main_console_ratio: function() {
          return main_console_ratio;
        },
        set_main_console_ratio: function(x) {
          main_console_ratio = x;
        },
        resize_editors: function () {
            var h = window.innerHeight;
            var w = window.innerWidth;
            var main_width, main_height, console_width, console_height;
            var console_top, console_bottom;
            if (w >= h) {
                // side by side
                main_width     = w * main_console_ratio;
                main_height    = h - menu_height;
                console_width  = w - main_width;
                console_height = h - menu_height;
                console_top    = menu_height;
                console_left   = main_width;
            } else {
                // top bottom
                main_width     = w;
                main_height    = (h - menu_height) * main_console_ratio;
                console_width  = w;
                console_height = h - menu_height - main_height;
                console_top    = menu_height + main_height;
                console_left   = 0;
            }
            $("#resizable_main").css({top: menu_height, left:0, width: main_width, height: main_height})
            $("#resizable_console").css({top: console_top, left: console_left,
                                         width: console_width, height: main_height})
            editor_main.resize();
            editor_console.resize();
        },
        init_editor_keybindings: function() {
            var process_main_buffer_command = {
                name: 'run_lean',
                bindKey: {
                    win: 'Ctrl-x',
                    mac: 'Command-x',
                    sender: 'editor|cli'
                },
                exec: function(env, args, request) {
                    myModule.process_main_buffer();
                }
            };
            editor_main.commands.addCommand(process_main_buffer_command);
            editor_console.commands.addCommand(process_main_buffer_command);
        },
        init_resizable: function() {
            $("#resizable_main").resizable({resize: function( event, ui ) {
                var h = window.innerHeight;
                var w = window.innerWidth;
                var main_width, main_height, console_width, console_height;
                var console_top, console_bottom;
                if (w >= h) {
                    // side by side
                    main_width     = Math.min(w, event.clientX);
                    main_height    = h - menu_height;
                    console_width  = w - main_width;
                    console_height = h - menu_height;
                    console_top    = menu_height;
                    console_left   = main_width;
                    main_console_ratio = (main_width) / (main_width + console_width);
                } else {
                    // top and bottom
                    main_width     = w;
                    y_pos          = Math.max(40, Math.min(event.clientY, h));
                    main_height    = y_pos - menu_height;
                    console_width  = main_width;
                    console_height = h - menu_height - main_height;
                    console_top    = menu_height + main_height;
                    console_left   = 0;
                    main_console_ratio = (main_height) / (main_height + console_height);
                }

                $("#resizable_main").css({top: menu_height, left:0, width: main_width, height: main_height})
                $("#resizable_console").css({top: console_top, left: console_left,
                                             width: console_width, height: console_height})
                editor_main.resize();
                editor_console.resize();
            }});
        },
        init_autocomplete: function() {
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
        },
        init_input_method: function() {
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
        },
        load_code_from_url: function() {
            if (codeText != "") {
                if(codeText.substr(-1) == '/') {
                    codeText = codeText.substr(0, codeText.length - 1);
                }
                var text = decodeURIComponent(escape(atob(codeText)));
                editor_main.setValue(text, 1)
            }
        },
        parse_lean_output_buffer: function(buffer) {
            var i = 0;
            var mode = "outside";
            var errors = [];
            var column, endColumn, row, endRow, text, type;
            while (i < buffer.length) {
                line = buffer[i++];
                if (line.startsWith("FLYCHECK_BEGIN")) {
                    mode = "flycheck";
                    type = line.split(" ")[1].toLowerCase();
                    line = buffer[i++];
                    items = line.split(":")
                    filename = items[0];
                    row = parseInt(items[1]) - 1;
                    endRow = row + 1;
                    endColumn = column = parseInt(items[2]);
                    text = items.slice(3).join(":");
                } else if (line.startsWith("FLYCHECK_END")) {
                    errors.push({row: row,
                                 endRow: endRow,
                                 column: column,
                                 endColumn: endColumn,
                                 text: text,
                                 type: type});
                    this.append_console_nl("line " + (row + 1) + ", column " + column + ":" + text);
                    mode = "outside";
                } else if (mode === "outside") {
                    this.append_console_nl(line);
                } else if (mode === "flycheck") {
                    text += "\n" + line
                } else {
                    console.log("Something's wrong", line);
                }
            }
            return errors;
        },
        dropbox_show_username: function() {
            dropbox_client.getAccountInfo(function(error, accountInfo) {
                if (error) {
                    console.log("Dropbox GetAccountInfo", error);
                } else {
                    $("#signin-button").text("");
                    $("#username").text("Welcome " + accountInfo.name + "!");
                }
            });
        },
        dropbox_connect: function() {
            dropbox_client.authenticate(function(error, dropbox_client) {
                if (error) {
                    console.log("Dropbox Connect Error", error);
                } else {
                    this.dropbox_show_username();
                }
            });
        },
        dropbox_setup_button: function() {
            dropbox_client.authenticate({interactive: false}, function(error, dropbox_client) {
                if (!dropbox_client.isAuthenticated()) {
                    var button = document.querySelector("#signin-button");
                    button.addEventListener("click", function() {
                        myModule.dropbox_connect()
                    });
                    $("#signin-button").prepend("<svg class=\"menu_icon\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Livello_1\" x=\"0px\" y=\"0px\" viewBox=\"-45 -45 100 100\" enable-background=\"new -45 -45 100 100\" xml:space=\"preserve\"><path d=\"M3.385,43.237c0,1.327-1.015,2.048-2.268,1.591l-23.093-8.278c-1.252-0.448-2.276-1.898-2.276-3.234V-0.886  c0-1.323,1.024-2.043,2.267-1.595L1.108,5.798C2.37,6.25,3.385,7.696,3.385,9.022V43.237z\"/><path d=\"M6.602,43.237c0,1.327,1.015,2.048,2.268,1.591l23.092-8.278c1.248-0.448,2.268-1.898,2.268-3.217V-0.886  c0-1.323-1.02-2.043-2.268-1.595L8.869,5.798C7.625,6.25,6.602,7.696,6.602,9.022V43.237z\"/><path d=\"M1.407,2.027C2.506,2.774,2.37,3.029,1.126,2.585l-23.102-8.288c-1.252-0.453-3.168-1.433-4.258-2.188l-13.021-8.942  c-1.099-0.747-0.962-1.002,0.277-0.549l23.097,8.279c1.248,0.448,3.168,1.428,4.254,2.175L1.407,2.027z\"/><g><path d=\"M-11.653-33.8c-0.883-0.989-2.628-1.441-3.867-0.989l-23.097,8.2c-1.248,0.448-1.547,1.617-0.664,2.61l3.111,3.516   c0.883,0.993,2.628,2.171,3.872,2.619l16.91,6.064c1.252,0.453,3.296,0.453,4.548,0.013l11.957-4.258   c1.252-0.439,1.56-1.622,0.677-2.61L-11.653-33.8z\"/></g><path d=\"M8.588,2.027c-1.099,0.747-0.963,1.002,0.29,0.549L31.97-5.711c1.257-0.453,3.173-1.433,4.263-2.18l13.025-8.951  c1.09-0.747,0.967-1.002-0.281-0.549L25.88-9.104c-1.248,0.448-3.173,1.428-4.254,2.175L8.588,2.027z\"/><g><path d=\"M21.661-33.8c0.879-0.989,2.619-1.441,3.867-0.989l23.079,8.2c1.266,0.439,1.564,1.617,0.677,2.61l-3.12,3.516   c-0.879,0.993-2.619,2.171-3.867,2.619L25.388-11.78c-1.248,0.453-3.287,0.453-4.535,0.013L8.878-16.025   c-1.253-0.439-1.561-1.622-0.677-2.61L21.661-33.8z\"/></g></svg>");
                } else {
                    myModule.dropbox_show_username();
                }
            });
        },
        dropbox_load_file: function(filename) {
            var fullpath = dropbox_lean_js_app_prefix + filename;
            if (dropbox_client.isAuthenticated()) {
                dropbox_client.readFile(filename, function(error, data) {
                    if (error) {
                        myModule.append_console_nl("-- Could not read from '" +
                                          fullpath + "'.");
                        console.log("Dropbox Load File Error: ", error);
                    } else {
                        editor_main.setValue(data, 1);
                        editor_main.focus();
                        myModule.append_console_nl("-- '" + fullpath + "' loaded.");
                    }
                });
            }
        },
        save_file: function(filename, text) {
            var fullpath = dropbox_lean_js_app_prefix + filename;
            if (dropbox_client.isAuthenticated()) {
                dropbox_client.writeFile(filename, text, function(error, stat) {
                    if (error) {
                        myModule.append_console_nl("-- Failed to write to '" +
                                          fullpath + "'.");
                    } else {
                        myModule.append_console_nl("-- Saved at '" + fullpath + "'.");
                    }
                });
            } else {
                $.cookie("leanjs", myModule.editor_main.getValue());
                myModule.append_console_nl("-- Saved at cookie.");
            }
        },
        init_ace: function() {
            myModule.init_editor_main();
            myModule.init_editor_console();
            myModule.init_editor_keybindings();
            myModule.init_resizable();
            myModule.init_input_method();
            myModule.init_autocomplete();
            myModule.resize_editors();
            window.onresize = function(event) { myModule.resize_editors(); };
        },
        init: function() {
            this.append_console_nl("Lean.JS: running Lean Theorem Prover on your browser");
            this.append_console("-- Initializing Ace Editor...     ");
            var start_time = new Date().getTime();
            myModule.init_ace();
            myModule.append_console("Done");
            myModule.append_console_nl("(" + elapsed_time_string(start_time) + ")");
            myModule.dropbox_setup_button();
            if (codeText != "") {
                myModule.load_code_from_url();
            } else if(myModule.get_dropbox_client().isAuthenticated()) {
                myModule.dropbox_load_file(default_filename);
            } else {
                var cookie_contents = $.cookie("leanjs");
                if (cookie_contents && cookie_contents != "") {
                    myModule.editor_main.setValue(cookie_contents, 1);
                    myModule.append_console_nl("-- Text loaded from cookie.");
                }
            }
        },
        clear_console: function() {
            editor_console.setValue("", 1);
        },
        append_console: function(text) {
            editor_console.setValue(editor_console.getValue() + text, 1);
        },
        append_console_nl: function(text) {
            this.append_console(text)
            this.append_console("\n")
        },
        init_lean: function() {
            var start_time = new Date().getTime();
            myModule.append_console("-- Initializing Lean...           ");
            setTimeout(function() {
                Module.lean_init();
                myModule.append_console("Done");
                myModule.append_console_nl("(" + elapsed_time_string(start_time) + ")");
            }, 5);
        },
        import_module: function(mname) {
            var start_time = new Date().getTime();
            myModule.append_console("-- Importing Module '" + mname + "'... ");
            setTimeout(function() {
                Module.lean_import_module(mname);
                myModule.append_console("Done");
                myModule.append_console_nl("(" + elapsed_time_string(start_time) + ")");
                myModule.append_console("-- Ready.\n");
            }, 5);
        },
        save_to_filesystem: function(filename, text) {
            FS.writeFile(filename, text, {encoding: 'utf8'});
        },
        process_main_buffer: function() {
            this.clear_console();
            myModule.append_console_nl("-- Processing...");
            var start_time = new Date().getTime();
            setTimeout(function() {
                myModule.save_to_filesystem(default_filename, editor_main.getValue());
                myModule.save_file(default_filename, editor_main.getValue());
                myModule.process_file(default_filename);
                myModule.append_console("-- Done");
                myModule.append_console_nl("(" + elapsed_time_string(start_time) + ")");
            }, 1);
        },
        process_file: function(filename) {
            lean_output_buffer = [];
            editor_main.session.clearAnnotations();
            Module.lean_process_file(filename);
            var errors = this.parse_lean_output_buffer(lean_output_buffer);
            editor_main.session.setAnnotations(errors);
        }
    };})();

// New Button
$(function () {
    var newButton = document.querySelector("#new-button");
    newButton.addEventListener("click", function() {
        myModule.editor_main.setValue("", 1);
    });
});
// Load Button
$(function () {
    var loadButton = document.querySelector("#load-button");
    loadButton.addEventListener("click", function() {
        if (myModule.get_dropbox_client().isAuthenticated()) {
            var options = {
                success: function(files) {
                    console.log(files[0]);
                    $.get(files[0].link, function(data) {
                        myModule.editor_main.setValue(data, 1);
                    });
                    myModule.append_console_nl("-- " + files[0].name +
                                               " is loaded from Dropbox.");
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
        myModule.process_main_buffer();
    });
});
// Save Button
$(function () {
    var saveButton = document.querySelector("#save-button");
    saveButton.addEventListener("click", function() {
        myModule.save_file("input.lean", myModule.editor_main.getValue());
        // Dropbox.save("URL", "FILE.txt");
    });
});
// Console Button
$(function () {
    var consoleButton = document.querySelector("#console-button");
    consoleButton.addEventListener("click", function() {
        if (myModule.get_main_console_ratio() < 0.80) {
            myModule.set_main_console_ratio(1.0);
        } else {
            myModule.set_main_console_ratio(0.5);
        }
        myModule.resize_editors();
    });
});
// Share Button
$(function () {
    var shareButton = document.querySelector("#share-button");
    shareButton.addEventListener("click", function() {
        var base = window.location.href.split('?')[0];
        var text = myModule.editor_main.getValue();
        if (text != "") {
            var encodedText = btoa(unescape(encodeURIComponent(text)));
            var sharedURL = base + "?code=" + encodedText;
            window.prompt("Copy to clipboard: Ctrl+C, Enter", sharedURL);
        }
    });
});

myModule.init();

// Setup LEAN.JS Module
var Module = { };
if (gup("mem") != "") {
    Module.TOTAL_MEMORY=gup("mem") * 1024 * 1024;
} else {
    Module.TOTAL_MEMORY=16 * 1024 * 1024;
}

// timestamp before loading lean.js
Module['print'] = function(text) {
    myModule.push_output_buffer(text);
    editor_main.focus();
};
Module['noExitRuntime'] = true;
Module['postRun'] = function() {
    myModule.init_lean();
    setTimeout(function() {
        myModule.import_module("standard");
    }, 10);
};
Module['preRun'] = [];
var lean_loading_start_time = new Date().getTime();
myModule.append_console("-- Loading lean.js...             ");
Module.preRun.push(function() {
    myModule.append_console("Done");
    myModule.append_console_nl("(" + elapsed_time_string(lean_loading_start_time) + ")");
})
