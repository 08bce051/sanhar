
(function(a,b){function n(a,b,c){c=(c+1)%1;if(c*6<1){return a+(b-a)*6*c}if(c*2<1){return b}if(c*3<2){return a+(b-a)*(2/3-c)*6}return a}function m(b,c,d){var e=h[c.type]||{},f=c.empty||d;if(f&&b==null){return null}if(c.def&&b==null){return c.def}if(e.floor){b=~~b}else{b=parseFloat(b)}if(a.isNaN(b)){return c.def}if(e.mod){b=b%e.mod;return b<0?e.mod+b:b}return e.min>b?e.min:e.max<b?e.max:b}var c="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color outlineColor".split(" "),d=/^([\-+])=\s*(\d+\.?\d*)/,e=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[2.55*a[1],2.55*a[2],2.55*a[3],a[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],f=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},g={rgba:{cache:"_rgba",props:{red:{idx:0,type:"byte",empty:true},green:{idx:1,type:"byte",empty:true},blue:{idx:2,type:"byte",empty:true},alpha:{idx:3,type:"percent",def:1}}},hsla:{cache:"_hsla",props:{hue:{idx:0,type:"degrees",empty:true},saturation:{idx:1,type:"percent",empty:true},lightness:{idx:2,type:"percent",empty:true}}}},h={"byte":{floor:true,min:0,max:255},percent:{min:0,max:1},degrees:{mod:360,floor:true}},i=g.rgba.props,j=f.support={},k,l=a.each;g.hsla.props.alpha=i.alpha;f.fn=f.prototype={constructor:f,parse:function(c,d,h,j){if(c===b){this._rgba=[null,null,null,null];return this}if(c instanceof a||c.nodeType){c=c instanceof a?c.css(d):a(c).css(d);d=b}var n=this,o=a.type(c),p=this._rgba=[],q;if(d!==b){c=[c,d,h,j];o="array"}if(o==="string"){c=c.toLowerCase();l(e,function(a,b){var d=b.re.exec(c),e=d&&b.parse(d),f,h=b.space||"rgba",i=g[h].cache;if(e){f=n[h](e);n[i]=f[i];p=n._rgba=f._rgba;return false}});if(p.length!==0){if(Math.max.apply(Math,p)===0){a.extend(p,k.transparent)}return this}c=k[c]||k._default;return this.parse(c)}if(o==="array"){l(i,function(a,b){p[b.idx]=m(c[b.idx],b)});return this}if(o==="object"){if(c instanceof f){l(g,function(a,b){if(c[b.cache]){n[b.cache]=c[b.cache].slice()}})}else{l(g,function(a,b){l(b.props,function(a,d){var e=b.cache;if(!n[e]&&b.to){if(c[a]==null||a==="alpha"){return}n[e]=b.to(n._rgba)}n[e][d.idx]=m(c[a],d,true)})})}return this}},is:function(a){var b=f(a),c=true,d=this;l(g,function(a,e){var f=b[e.cache],g;if(f){g=d[e.cache]||e.to&&e.to(d._rgba)||[];l(e.props,function(a,b){if(f[b.idx]!=null){c=f[b.idx]==g[b.idx];return c}})}return c});return c},_space:function(){var a=[],b=this;l(g,function(c,d){if(b[d.cache]){a.push(c)}});return a.pop()},transition:function(a,b){var c=f(a),d=c._space(),e=g[d],i=this[e.cache]||e.to(this._rgba),j=i.slice();c=c[e.cache];l(e.props,function(a,d){var e=d.idx,f=i[e],g=c[e],k=h[d.type]||{};if(g===null){return}if(f===null){j[e]=g}else{if(k.mod){if(g-f>k.mod/2){f+=k.mod}else if(f-g>k.mod/2){f-=k.mod}}j[d.idx]=m((g-f)*b+f,d)}});return this[d](j)},blend:function(b){if(this._rgba[3]===1){return this}var c=this._rgba.slice(),d=c.pop(),e=f(b)._rgba;return f(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return a==null?b>2?1:0:a});if(c[3]===1){c.pop();b="rgb("}return b+c.join(",")+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){if(a==null){a=b>2?1:0}if(b&&b<3){a=Math.round(a*100)+"%"}return a});if(c[3]==1){c.pop();b="hsl("}return b+c.join(",")+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();if(b){c.push(~~(d*255))}return"#"+a.map(c,function(a,b){a=(a||0).toString(16);return a.length==1?"0"+a:a}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}};f.fn.parse.prototype=f.fn;g.hsla.to=function(a){if(a[0]==null||a[1]==null||a[2]==null){return[null,null,null,a[3]]}var b=a[0]/255,c=a[1]/255,d=a[2]/255,e=a[3],f=Math.max(b,c,d),g=Math.min(b,c,d),h=f-g,i=f+g,j=i*.5,k,l;if(g===f){k=0}else if(b===f){k=60*(c-d)/h+360}else if(c===f){k=60*(d-b)/h+120}else{k=60*(b-c)/h+240}if(j===0||j===1){l=j}else if(j<=.5){l=h/i}else{l=h/(2-i)}return[Math.round(k)%360,l,j,e==null?1:e]};g.hsla.from=function(a){if(a[0]==null||a[1]==null||a[2]==null){return[null,null,null,a[3]]}var b=a[0]/360,c=a[1],d=a[2],e=a[3],f=d<=.5?d*(1+c):d+c-d*c,g=2*d-f,h,i,j;return[Math.round(n(g,f,b+1/3)*255),Math.round(n(g,f,b)*255),Math.round(n(g,f,b-1/3)*255),e]};l(g,function(c,e){var g=e.props,h=e.cache,i=e.to,j=e.from;f.fn[c]=function(c){if(i&&!this[h]){this[h]=i(this._rgba)}if(c===b){return this[h].slice()}var d=a.type(c),e=d==="array"||d==="object"?c:arguments,k=this[h].slice(),n;l(g,function(a,b){var c=e[d==="object"?a:b.idx];if(c==null){c=k[b.idx]}k[b.idx]=m(c,b)});if(j){n=f(j(k));n[h]=k;return n}else{return f(k)}};l(g,function(b,e){if(f.fn[b]){return}f.fn[b]=function(f){var g=a.type(f),h=b==="alpha"?this._hsla?"hsla":"rgba":c,i=this[h](),j=i[e.idx],k;if(g==="undefined"){return j}if(g==="function"){f=f.call(this,j);g=a.type(f)}if(f==null&&e.empty){return this}if(g==="string"){k=d.exec(f);if(k){f=j+parseFloat(k[2])*(k[1]==="+"?1:-1)}}i[e.idx]=f;return this[h](i)}})});l(c,function(b,c){a.cssHooks[c]={set:function(b,d){d=f(d);if(!j.rgba&&d._rgba[3]!==1){var e,g=c==="backgroundColor"?b.parentNode:b;do{e=a.curCSS(g,"backgroundColor")}while((e===""||e==="transparent")&&(g=g.parentNode)&&g.style);d=d.blend(e&&e!=="transparent"?e:"_default")}d=d.toRgbaString();b.style[c]=d}};a.fx.step[c]=function(b){if(!b.colorInit){b.start=f(b.elem,c);b.end=f(b.end);b.colorInit=true}a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}});a(function(){var a=document.createElement("div"),b=a.style;b.cssText="background-color:rgba(1,1,1,.5)";j.rgba=b.backgroundColor.indexOf("rgba")>-1});k=a.Color.names={aqua:"#00ffff",azure:"#f0ffff",beige:"#f5f5dc",black:"#000000",blue:"#0000ff",brown:"#a52a2a",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkviolet:"#9400d3",fuchsia:"#ff00ff",gold:"#ffd700",green:"#008000",indigo:"#4b0082",khaki:"#f0e68c",lightblue:"#add8e6",lightcyan:"#e0ffff",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightyellow:"#ffffe0",lime:"#00ff00",magenta:"#ff00ff",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#ffa500",pink:"#ffc0cb",purple:"#800080",violet:"#800080",red:"#ff0000",silver:"#c0c0c0",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery)