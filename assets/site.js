/* Epoxy Flooring Surprise AZ: shared page behavior */
(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  /* Keep keyboard focus inside an open dialog (UI/UX Pro Max: no keyboard traps out of modals) */
  var trap=function(box,e){
    if(e.key!=='Tab')return;
    var f=$$('a[href],button:not([disabled]),input,select,textarea',box).filter(function(x){return x.offsetParent!==null});
    if(!f.length)return;var a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
    else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
  };

  /* Services dropdown */
  var ddBtn=$('#ddBtn'),dd=$('#dd');
  if(ddBtn&&dd){
    var setDD=function(open){dd.classList.toggle('open',open);ddBtn.setAttribute('aria-expanded',open?'true':'false')};
    ddBtn.addEventListener('click',function(e){e.stopPropagation();setDD(!dd.classList.contains('open'))});
    document.addEventListener('click',function(e){if(!dd.contains(e.target))setDD(false)});
    ddBtn.parentElement.addEventListener('focusout',function(e){if(!ddBtn.parentElement.contains(e.relatedTarget))setDD(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&dd.classList.contains('open')){setDD(false);ddBtn.focus()}});
  }

  /* Mobile menu */
  var burger=$('#burger'),mm=$('#mmenu'),mclose=$('#mclose');
  if(burger&&mm){
    var setMM=function(open){
      mm.classList.toggle('open',open);burger.setAttribute('aria-expanded',open?'true':'false');
      mm.setAttribute('aria-hidden',open?'false':'true');document.body.style.overflow=open?'hidden':'';
      if(open){mclose&&mclose.focus()}else{burger.focus()}
    };
    burger.addEventListener('click',function(){setMM(true)});
    mclose&&mclose.addEventListener('click',function(){setMM(false)});
    $$('a',mm).forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open');document.body.style.overflow='';burger.setAttribute('aria-expanded','false');mm.setAttribute('aria-hidden','true')})});
    document.addEventListener('keydown',function(e){if(!mm.classList.contains('open'))return;if(e.key==='Escape')setMM(false);trap(mm,e)});
  }

  /* Lead forms: validate on blur and on submit, show loading then success.
     Front-end only: connect to a form service before launch. */
  var check=function(inp){
    var wrap=inp.closest('.field'),v=inp.value.trim(),bad=inp.required&&!v;
    if(!bad&&v&&inp.type==='email')bad=!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    if(!bad&&v&&inp.type==='tel')bad=v.replace(/\D/g,'').length<10;
    if(wrap){wrap.classList.toggle('err',bad);wrap.classList.toggle('ok',!bad&&!!v)}
    inp.setAttribute('aria-invalid',bad?'true':'false');
    var msg=wrap&&$('.msg',wrap);
    if(msg){if(!msg.id)msg.id=(inp.id||'f')+'-msg';bad?inp.setAttribute('aria-describedby',msg.id):inp.removeAttribute('aria-describedby')}
    return !bad;
  };
  $$('form.lead-form').forEach(function(f){
    $$('input,select,textarea',f).forEach(function(inp){
      inp.addEventListener('blur',function(){if(inp.value.trim()||inp.dataset.touched)check(inp);inp.dataset.touched='1'});
      inp.addEventListener('input',function(){var w=inp.closest('.field');if(w&&w.classList.contains('err'))check(inp)});
      inp.addEventListener('change',function(){if(inp.tagName==='SELECT')check(inp)});
    });
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var first=null;
      $$('[required]',f).forEach(function(inp){if(!check(inp)&&!first)first=inp});
      if(first){first.focus();return}
      var btn=$('button[type=submit]',f),lbl=btn&&$('.lbl',btn);
      if(btn){btn.disabled=true;btn.classList.add('loading');btn.setAttribute('aria-busy','true');if(lbl)lbl.textContent='Sending\u2026'}
      setTimeout(function(){var card=f.closest('.formcard');card&&card.classList.add('sent');var done=card&&$('.form-ok',card);done&&done.focus()},900);
    });
  });

  /* Copy phone / email */
  $$('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.getAttribute('data-copy'),label=b.textContent;
      var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent=label},1400)};
      if(navigator.clipboard){navigator.clipboard.writeText(t).then(done,function(){})}else{done()}
    });
  });

  /* Coating picker */
  var picker=$('#picker');
  if(picker){
    var R={
      garage:{
        sun:{t:'Flake + Polyaspartic',d:'Full-broadcast chip over a bonded base, finished with a UV-stable polyaspartic clear. The everyday West Valley garage floor.',a:'Two-car and three-car garages, cart bays, open-door workspaces',c:'Usually 1 to 2 days',l:'/garage-floor-coatings/'},
        tough:{t:'Polyurea Base System',d:'A flexible polyurea base that rides out slab movement, with a chip broadcast and a hard clear on top.',a:'RV bays, shops with jacks and stands, heavy storage',c:'Usually 1 to 2 days',l:'/polyurea-floor-coatings/'},
        look:{t:'Metallic Epoxy',d:'Poured and hand-worked metallic pigments for a deep, marbled gloss that makes a collector garage feel like a showroom.',a:'Showroom garages, man caves, hobby rooms',c:'Usually 2 to 3 days',l:'/metallic-epoxy-flooring/'},
        fast:{t:'Polyaspartic Chip Floor',d:'Fast-curing layers from base to clear so the garage is back in use sooner.',a:'Homeowners who can only give up the garage briefly',c:'Often 1 day',l:'/polyaspartic-floor-coatings/'}
      },
      home:{
        sun:{t:'Residential Epoxy + UV Clear',d:'A solid or light flake interior system with a clear that resists yellowing near sliders and windows.',a:'Casitas, sunrooms, laundry and mudrooms',c:'Usually 2 days',l:'/residential-epoxy-flooring/'},
        tough:{t:'Residential Epoxy, Solid Color',d:'A high-build solid color with a tough clear for rooms that see dumbbells, bikes and boots.',a:'Home gyms, craft rooms, workshops',c:'Usually 2 days',l:'/residential-epoxy-flooring/'},
        look:{t:'Metallic Epoxy',d:'A seamless metallic floor with movement and depth, tuned to the room\'s light and color scheme.',a:'Living spaces, basements, bars and game rooms',c:'Usually 2 to 3 days',l:'/metallic-epoxy-flooring/'},
        fast:{t:'Polyaspartic Interior Floor',d:'Quick cure and low wait time, with a clean solid or flake look.',a:'Rooms you need back quickly',c:'Often 1 day',l:'/polyaspartic-floor-coatings/'}
      },
      outdoor:{
        sun:{t:'Patio & Concrete Coating',d:'A UV-stable, textured system that stays cooler-toned and keeps its color in full Arizona sun.',a:'Patios, pool decks, walkways, entries',c:'Usually 1 to 2 days',l:'/patio-concrete-coatings/'},
        tough:{t:'Polyurea Exterior System',d:'Flexible polyurea for exterior slabs that expand and contract through wide day-to-night temperature swings.',a:'Driveway aprons, side yards, RV pads',c:'Usually 1 to 2 days',l:'/polyurea-floor-coatings/'},
        look:{t:'Decorative Flake Patio',d:'A chip blend matched to your stucco and pavers, sealed with a slip-resistant clear.',a:'Backyards, outdoor kitchens, courtyards',c:'Usually 1 to 2 days',l:'/decorative-flake-flooring/'},
        fast:{t:'Polyaspartic Patio Coat',d:'Fast cure means the patio is ready for furniture again sooner.',a:'Small patios and entries',c:'Often 1 day',l:'/polyaspartic-floor-coatings/'}
      },
      business:{
        sun:{t:'Commercial Epoxy System',d:'A high-build epoxy floor with a chemical-resistant topcoat, specified for your traffic and cleaning routine.',a:'Shops, showrooms, offices, clinics',c:'Scheduled around your hours',l:'/commercial-epoxy-flooring/'},
        tough:{t:'Warehouse Floor Coating',d:'Abrasion-resistant epoxy with forklift-rated build and painted safety lines.',a:'Warehouses, distribution and fabrication floors',c:'Phased by zone',l:'/warehouse-floor-coatings/'},
        look:{t:'Commercial Decorative Flake',d:'A durable chip floor that reads clean and professional in customer-facing spaces.',a:'Showrooms, salons, gyms, retail',c:'Scheduled around your hours',l:'/decorative-flake-flooring/'},
        fast:{t:'Polyaspartic Commercial Floor',d:'Fast-return coatings for businesses that cannot close for long.',a:'Overnight or weekend installs',c:'Often 1 day',l:'/polyaspartic-floor-coatings/'}
      }
    };
    var out={t:$('#pkT'),d:$('#pkD'),a:$('#pkA'),c:$('#pkC'),l:$('#pkL')};
    var upd=function(){
      var s=($('input[name=pk-space]:checked',picker)||{}).value||'garage';
      var p=($('input[name=pk-pri]:checked',picker)||{}).value||'sun';
      var r=R[s][p];out.t.textContent=r.t;out.d.textContent=r.d;out.a.textContent=r.a;out.c.textContent=r.c;out.l.setAttribute('href',r.l);
    };
    $$('input',picker).forEach(function(i){i.addEventListener('change',upd)});upd();
  }

  /* Flake blend builder */
  var cv=$('#flakeCanvas');
  if(cv&&cv.getContext){
    var ctx=cv.getContext('2d'),blendBtns=$$('.blend'),sizeBtns=$$('.sizes button'),nameEl=$('#blendName');
    var cur={c:JSON.parse(blendBtns[0].getAttribute('data-c')),n:blendBtns[0].getAttribute('data-n'),s:1};
    var seed=7;var rnd=function(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
    var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,raf=null;
    var draw=function(animate){
      var w=cv.clientWidth||600,h=Math.round(w*.75),dpr=Math.min(window.devicePixelRatio||1,2);
      cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      seed=7;ctx.fillStyle=cur.c[0];ctx.fillRect(0,0,w,h);
      var n=Math.round(w*h/(70*cur.s*cur.s)),chips=[];
      for(var i=0;i<n;i++){
        var c={x:rnd()*w,y:rnd()*h,r:(2.2+rnd()*4.2)*cur.s,f:cur.c[Math.floor(rnd()*cur.c.length)],pts:5+Math.floor(rnd()*3),a0:rnd()*6.28,rr:[]};
        for(var k=0;k<c.pts;k++)c.rr.push(c.r*(.55+rnd()*.6));chips.push(c);
      }
      var paint=function(c){ctx.fillStyle=c.f;ctx.beginPath();for(var k=0;k<c.pts;k++){var a=c.a0+k*6.28/c.pts;k?ctx.lineTo(c.x+Math.cos(a)*c.rr[k],c.y+Math.sin(a)*c.rr[k]):ctx.moveTo(c.x+Math.cos(a)*c.rr[k],c.y+Math.sin(a)*c.rr[k])}ctx.closePath();ctx.fill()};
      var gloss=function(){var g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'rgba(255,255,255,.16)');g.addColorStop(.5,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.08)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)};
      nameEl&&(nameEl.textContent=cur.n+' · '+(cur.s<1?'1/16" chip':cur.s>1?'1/2" chip':'1/4" chip'));
      if(raf)cancelAnimationFrame(raf);
      if(!animate||still){chips.forEach(paint);gloss();return}
      /* broadcast: chips land in random order over ~650ms, like a hand-thrown flake */
      for(var j=chips.length-1;j>0;j--){var q=Math.floor(Math.random()*(j+1)),t=chips[j];chips[j]=chips[q];chips[q]=t}
      var done=0,t0=null;
      var frame=function(t){if(!t0)t0=t;var target=Math.min(chips.length,Math.round(chips.length*Math.min(1,(t-t0)/650)));while(done<target)paint(chips[done++]);if(done<chips.length)raf=requestAnimationFrame(frame);else gloss()};
      raf=requestAnimationFrame(frame);
    };
    blendBtns.forEach(function(b){b.addEventListener('click',function(){blendBtns.forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');cur.c=JSON.parse(b.getAttribute('data-c'));cur.n=b.getAttribute('data-n');draw(true)})});
    sizeBtns.forEach(function(b){b.addEventListener('click',function(){sizeBtns.forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');cur.s=parseFloat(b.getAttribute('data-s'));draw(true)})});
    var t;window.addEventListener('resize',function(){clearTimeout(t);t=setTimeout(function(){draw(false)},150)});draw(false);
  }

  /* Gallery lightbox */
  var gal=$$('.gal button'),lb=$('#lb');
  if(gal.length&&lb){
    var lbImg=$('img',lb),lbCap=$('figcaption',lb),idx=0,last=null;
    var show=function(i){idx=(i+gal.length)%gal.length;var b=gal[idx];lbImg.src=b.getAttribute('data-full');lbImg.alt=$('img',b).alt;lbCap.textContent=b.getAttribute('data-cap')};
    var open=function(i){last=document.activeElement;show(i);lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('.lb-x',lb).focus()};
    var close=function(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow='';last&&last.focus()};
    gal.forEach(function(b,i){b.addEventListener('click',function(){open(i)})});
    $('.lb-x',lb).addEventListener('click',close);
    $('.lb-prev',lb).addEventListener('click',function(){show(idx-1)});
    $('.lb-next',lb).addEventListener('click',function(){show(idx+1)});
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;trap(lb,e);if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
  }

  /* On-page contents highlight (service pages) */
  var tocLinks=$$('.toc a[href^="#"]');
  if(tocLinks.length&&'IntersectionObserver' in window){
    var map={};tocLinks.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var io=new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){tocLinks.forEach(function(a){a.classList.remove('on')});var a=map[en.target.id];a&&a.classList.add('on')}})},{rootMargin:'-30% 0px -60% 0px'});
    Object.keys(map).forEach(function(id){var s=document.getElementById(id);s&&io.observe(s)});
  }

  /* Reveal on scroll */
  var rv=$$('.rv');
  if(rv.length){
    if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      var ro=new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');ro.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px'});
      rv.forEach(function(el){ro.observe(el)});
    }else{rv.forEach(function(el){el.classList.add('in')})}
  }

  var yr=$('#yr');yr&&(yr.textContent=new Date().getFullYear());
})();

/* Motion design: progress bar, counters, staggered reveals, picker swap.
   Skipped entirely when the visitor prefers reduced motion. */
(function(){
  'use strict';
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  /* scroll progress (transform only, rAF-throttled) */
  var bar=document.getElementById('progress');
  if(bar&&!reduce){
    var ticking=false;
    var upd=function(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;bar.style.transform='scaleX('+(max>0?Math.min(1,h.scrollTop/max):0)+')';ticking=false};
    window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(upd)}},{passive:true});upd();
  }
  if(reduce||!('IntersectionObserver' in window))return;

  /* staggered groups: children appear one after another */
  var groups=$$('.svc-grid,.cond,.why,.spaces,.care,.trust ul,.related,.ben,.factors,.blends');
  var io=new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -10% 0px'});
  groups.forEach(function(g){
    g.classList.remove('rv');
    Array.prototype.forEach.call(g.children,function(ch,i){ch.style.setProperty('--i',Math.min(i,8))});
    g.classList.add('stagger');io.observe(g);
  });
  $$('.steps .step').forEach(function(s,i){s.style.setProperty('--i',i)});

  /* safety net: anything already scrolled past (fast jumps, anchor links) is revealed */
  var sweep=function(){var vh=window.innerHeight;$$('.rv:not(.in),.stagger:not(.in)').forEach(function(el){if(el.getBoundingClientRect().top<vh)el.classList.add('in')})};
  var st;window.addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(sweep,120)},{passive:true});
  window.addEventListener('hashchange',function(){setTimeout(sweep,50)});setTimeout(sweep,300);

  /* count-up stats */
  var co=new IntersectionObserver(function(ents){ents.forEach(function(en){
    if(!en.isIntersecting)return;co.unobserve(en.target);
    var el=en.target,to=parseInt(el.getAttribute('data-count'),10),suf=el.getAttribute('data-suffix')||'',t0=null,d=1100;
    var step=function(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e)+suf;if(p<1)requestAnimationFrame(step)};
    el.textContent='0'+suf;requestAnimationFrame(step);
  })},{threshold:.6});
  $$('[data-count]').forEach(function(el){co.observe(el)});

  /* picker result re-animates on change */
  var out=document.querySelector('.picker-out');
  if(out){$$('#picker input').forEach(function(i){i.addEventListener('change',function(){out.classList.remove('swap');void out.offsetWidth;out.classList.add('swap')})})}
})();
