var fs, path, markdown;
fs = require('fs');
path = require("path");
markdown = require( "markdown" ).markdown;

module.exports = {
    publicClasses: function(context, options) {
        'use strict';
        var ret = "";

        for(var i=0; i < context.length; i++) {
            if(!context[i].itemtype && context[i].access === 'public') {
                ret = ret + options.fn(context[i]);
            } else if (context[i].itemtype) {
                ret = ret + options.fn(context[i]);
            }
        }

        return ret;
    },
    search : function(classes, modules) {
        'use strict';
        var ret = '';

        for(var i=0; i < classes.length; i++) {
            if(i > 0) {
                ret += ', ';
            }
            ret += "\"" + 'classes/' + classes[i].displayName + "\"";
        }

        if(ret.length > 0 && modules.length > 0) {
            ret += ', ';
        }

        for(var j=0; j < modules.length; j++) {
            if(j > 0) {
                ret += ', ';
            }
            ret += "\"" + 'modules/' + modules[j].displayName + "\"";
        }

        return ret;
    },
    homeContent : function () {
        var config = path.join(process.cwd(), 'yuidoc');
        if (fs.existsSync(config + '.json') === true) {
            config = require(config);
        }

        var content = config.theme.home
        if (typeof content === 'string' && content !== '') {
            content = path.join(process.cwd(), content);
        } else {
            content = path.join(process.cwd(), 'README.md');
        }
       
        if (fs.existsSync(content) === true) {  
            content = fs.readFileSync(content, {encoding: "utf8"});
            content = markdown.toHTML(content);
            content = "<div class=\"well\">" + content + "</div>"
        } else {
            content = '';
        }
        return content;
    }
};
