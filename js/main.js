// Add startsWith
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

// Client side redirect to HTTPS
// Soonhok: This is not as good as server-side methods,
// however it seems that this is all we can do with github pages.
if (window.location.protocol != "https:") {
    if (!window.location.href.startsWith("http://localhost")) {
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
    }
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
    var theme = "ace/theme/subatomic";
    var lean_output_buffer = [];
    var filename = "input.lean";
    var codeText = gup("code");
    var url = gup("url");
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
        load_from_code: function() {
            if (codeText != "") {
                if(codeText.substr(-1) == '/') {
                    codeText = codeText.substr(0, codeText.length - 1);
                }
                var text = decodeURIComponent(escape(atob(codeText)));
                editor_main.setValue(text, 1)
            }
        },
        load_from_url: function() {
            if (url.indexOf("://github.com/") > -1) {
                url = url.replace("://github.com", "://raw.githubusercontent.com");
                url = url.replace("/blob/", "/");
            } else if (url.indexOf("://gist.github.com")) {
                url = url.replace("://gist.github.com", "://gist.githubusercontent.com");
                url = url + "/raw";
            }
            $.ajaxPrefilter(function(options) {
                if(options.crossDomain && jQuery.support.cors) {
                    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                    //options.url = "http://cors.corsproxy.io/url=" + options.url;
                }
            });
            $.get(url, function(data) {
                myModule.editor_main.setValue(data, 1);
            });
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
                    $("#dropbox-signin-button").text("");
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
                    var button = document.querySelector("#dropbox-signin-button");
                    button.addEventListener("click", function() {
                        myModule.dropbox_connect()
                    });
                    $("#dropbox-signin-button").prepend("<img class=\"menu_icon\" src=\"/images/dropbox.svg\"/>");
                } else {
                    myModule.dropbox_show_username();
                    $("#dropbox-signin-button").hide();
                }
            });
        },
        onedrive_init: function() {
            WL.Event.subscribe("auth.login", myModule.onedrive_onLogin);
            WL.init({
                client_id: "000000004C12C858",
                // redirect_uri: "https://leanprover.github.io/live",
                redirect_uri: "https://leanprover.github.io/live/",
                scope: "wl.signin",
                response_type: "token"
            });
        },
        onedrive_onLogin: function(session) {
            if (!session.error) {
                WL.api({
                    path: "me",
                    method: "GET"
                }).then(
                    function (response) {
                        myModule.append_console_nl("-- Signed into OneDrive: Welcome " + response.first_name + " " + response.last_name + "!");
                    },
                    function (responseFailed) {
                        myModule.append_console_nl("Error calling API: " + responseFailed.error.message);
                    }
                );
            }
            else {
                myModule.append_console_nl("Error signing in: " + session.error_description);
            }
        },
        onedrive_setup_button: function() {
            // onedrive_client.authenticate({interactive: false}, function(error, onedrive_client) {
            //     if (!onedrive_client.isAuthenticated()) {
            var button = document.querySelector("#onedrive-signin-button");
            button.addEventListener("click", function() {
                WL.login({
                    scope: ["wl.signin", "wl.skydrive"]
                }, myModule.onedrive_onLogin);
            });
            $("#onedrive-signin-button").prepend("<img class=\"menu_icon\" src=\"/images/onedrive.png\"/>");
            //     } else {
            //         myModule.onedrive_show_username();
            //     }
            // });
        },
        onedrive_load_file: function() {
            WL.fileDialog({
                mode: 'open',
                select: 'single'
            }).then(
                function (response) {
                    console.log(response);
                    if (response.data.folders.length > 0) {
                        myModule.append_console_nl("-- Reading a folder is not supported.");
                    } else if (response.data.files.length != 1) {
                        myModule.append_console_nl("-- Please pick a single file.");
                    } else {
                        var filename = response.data.files[0].name;
                        var id = response.data.files[0].id;
                        $.get(files[0].link, function(data) {
                            myModule.editor_main.setValue(data, 1);
                        });
                        myModule.append_console_nl("-- " + files[0].name +
                                                   " is loaded from Dropbox.");
                        myModule.filename = files[0].name;
                    }
                },
                function (responseFailed) {
                    myModule.append_console_nl("Error getting folder/file info: " + responseFailed.error.message);
                }
            );
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
            myModule.onedrive_init();
            myModule.onedrive_setup_button();
            if (codeText != "") {
                myModule.load_from_code();
            } else if (url != "") {
                myModule.load_from_url();
            }else if(myModule.get_dropbox_client().isAuthenticated()) {
                myModule.dropbox_load_file(filename);
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
                myModule.save_to_filesystem(filename, editor_main.getValue());
                myModule.save_file(filename, editor_main.getValue());
                myModule.process_file(filename);
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
        // TODO(soonhok): check dropbox, onedrive connectivity
        // if (myModule.get_dropbox_client().isAuthenticated()) {
        //     var options = {
        //         success: function(files) {
        //             $.get(files[0].link, function(data) {
        //                 myModule.editor_main.setValue(data, 1);
        //             });
        //             myModule.append_console_nl("-- " + files[0].name +
        //                                        " is loaded from Dropbox.");
        //             myModule.filename = files[0].name;
        //         },
        //         cancel: function() {
        //         },
        //         linkType: "direct", // or "preview"
        //         multiselect: false,
        //         extensions: ['.lean', '.lua', '.docx'],
        //     };
        //     Dropbox.choose(options);
        // }
        myModule.onedrive_load_file();
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
        var encodedText = btoa(unescape(encodeURIComponent(myModule.editor_main.getValue())));
        Dropbox.save("data:text/plain;base64," + encodedText, myModule.filename);
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
