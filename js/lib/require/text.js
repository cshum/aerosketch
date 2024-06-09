define(["module"],function(e){"use strict";var r,n,t=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,o=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,a="undefined"!=typeof location&&location.href,s=a&&location.protocol&&location.protocol.replace(/\:/,""),u=a&&location.hostname,c=a&&(location.port||void 0),f=[],l=e.config&&e.config()||{};return r={version:"2.0.1",strip:function(e){if(e){e=e.replace(i,"");var r=e.match(o);r&&(e=r[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:l.createXhr||function(){var e,r,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(r=0;r<3;r+=1){n=t[r];try{e=new ActiveXObject(n)}catch(e){}if(e){t=[n];break}}return e},parseName:function(e){var r=!1,n=e.indexOf("."),t=e.substring(0,n),i=e.substring(n+1,e.length);return n=i.indexOf("!"),-1!==n&&(r=i.substring(n+1,i.length),r="strip"===r,i=i.substring(0,n)),{moduleName:t,ext:i,strip:r}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,t,i){var o,a,s,u=r.xdRegExp.exec(e);return!u||(o=u[2],a=u[3],a=a.split(":"),s=a[1],a=a[0],!(o&&o!==n||a&&a.toLowerCase()!==t.toLowerCase()||(s||a)&&s!==i))},finishLoad:function(e,n,t,i){t=n?r.strip(t):t,l.isBuild&&(f[e]=t),i(t)},load:function(e,n,t,i){if(i.isBuild&&!i.inlineText)return void t();l.isBuild=i.isBuild;var o=r.parseName(e),f=o.moduleName+"."+o.ext,d=n.toUrl(f),p=l.useXhr||r.useXhr;!a||p(d,s,u,c)?r.get(d,function(n){r.finishLoad(e,o.strip,n,t)},function(e){t.error&&t.error(e)}):n([f],function(e){r.finishLoad(o.moduleName+"."+o.ext,o.strip,e,t)})},write:function(e,n,t,i){if(f.hasOwnProperty(n)){var o=r.jsEscape(f[n]);t.asModule(e+"!"+n,"define(function () { return '"+o+"';});\n")}},writeFile:function(e,n,t,i,o){var a=r.parseName(n),s=a.moduleName+"."+a.ext,u=t.toUrl(a.moduleName+"."+a.ext)+".js";r.load(s,t,function(n){var t=function(e){return i(u,e)};t.asModule=function(e,r){return i.asModule(e,u,r)},r.write(e,s,t,o)},o)}},"undefined"!=typeof process&&process.versions&&process.versions.node?(n=require.nodeRequire("fs"),r.get=function(e,r){var t=n.readFileSync(e,"utf8");0===t.indexOf("\ufeff")&&(t=t.substring(1)),r(t)}):r.createXhr()?r.get=function(e,n,t){var i=r.createXhr();i.open("GET",e,!0),l.onXhr&&l.onXhr(i,e),i.onreadystatechange=function(r){var o,a;4===i.readyState&&(o=i.status,o>399&&o<600?(a=new Error(e+" HTTP status: "+o),a.xhr=i,t(a)):n(i.responseText))},i.send(null)}:"undefined"!=typeof Packages&&(r.get=function(e,r){var n,t,i=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(i),"utf-8")),s="";try{for(n=new java.lang.StringBuffer,t=a.readLine(),t&&t.length()&&65279===t.charAt(0)&&(t=t.substring(1)),n.append(t);null!==(t=a.readLine());)n.append(o),n.append(t);s=String(n.toString())}finally{a.close()}r(s)}),r});