!function(){var a=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n.friends=a({1:function(a,n,l,e,s){var r,t,i=null!=n?n:{},o=l.helperMissing,c="function",u=a.escapeExpression;return'<li class="friend" data-content-id="'+u((t=null!=(t=l.id||(null!=n?n.id:n))?t:o,typeof t===c?t.call(i,{name:"id",hash:{},data:s}):t))+'"><img src="'+u(a.lambda(null!=(r=null!=(r=null!=n?n.picture:n)?r.data:r)?r.url:r,n))+'" />'+u((t=null!=(t=l.name||(null!=n?n.name:n))?t:o,typeof t===c?t.call(i,{name:"name",hash:{},data:s}):t))+"</li>\r\n"},compiler:[7,">= 4.0.0"],main:function(a,n,l,e,s){var r;return'<ul class="friends">\r\n'+(null!=(r=l.each.call(null!=n?n:{},null!=n?n.data:n,{name:"each",hash:{},fn:a.program(1,s,0),inverse:a.noop,data:s}))?r:"")+"</ul>"},useData:!0}),n.game=a({1:function(a,n,l,e,s){return'    <span class="slot" data-correct-value="'+a.escapeExpression(a.lambda(n,n))+'"></span>\r\n'},3:function(a,n,l,e,s){var r=a.lambda,t=a.escapeExpression;return'  <span class="word" data-value="'+t(r(n,n))+'">'+t(r(n,n))+"</span>\r\n"},compiler:[7,">= 4.0.0"],main:function(a,n,l,e,s){var r,t=null!=n?n:{};return'<div class="verse">\r\n  <span class="backspace">Borrar</span>\r\n  <span class="intro">'+a.escapeExpression(a.lambda(null!=(r=null!=n?n.verse:n)?r.intro:r,n))+'</span>\r\n  <span class="text">\r\n'+(null!=(r=(l.add_slots||n&&n.add_slots||l.helperMissing).call(t,null!=(r=null!=n?n.verse:n)?r.text:r,{name:"add_slots",hash:{},fn:a.program(1,s,0),inverse:a.noop,data:s}))?r:"")+"  </span>\r\n  \r\n"+(null!=(r=l.each.call(t,null!=n?n.words:n,{name:"each",hash:{},fn:a.program(3,s,0),inverse:a.noop,data:s}))?r:"")+"</div>"},useData:!0}),n.main=a({compiler:[7,">= 4.0.0"],main:function(a,n,l,e,s){var r;return'<div id="main">\r\n  <h1>'+a.escapeExpression((r=null!=(r=l.title||(null!=n?n.title:n))?r:l.helperMissing,"function"==typeof r?r.call(null!=n?n:{},{name:"title",hash:{},data:s}):r))+'</h1>\r\n\r\n  <div class="account">\r\n    <a hred="#" id="logout" class="facebookButton">Logout</a>\r\n    <a hred="#" id="login" class="facebookButton">Login</a>\r\n  </div>\r\n\r\n  <div id="content">\r\n    Pantalla de principal\r\n  </div>\r\n</div>'},useData:!0})}();