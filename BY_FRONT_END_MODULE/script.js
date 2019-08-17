var cl = console.log;
var pi = parseInt;

$('.block').mouseenter(function () {

   $(this).find('img').animate({
       'margin-right':'0',
   },200)
    $(this).find('p').show(500);
});

var body = $('body');

var svg = document.getElementById('svg');

function createElement(tag,attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg',tag);
    for(var attr in attrs) {
        el.setAttribute(attr,attrs[attr]);
    }
    return el;
}


var svgs = [];

function createNode(left,top) {
    var mainSvg = createElement('svg',{x:left,y:top,class:'mainsvg',id:svgs.length});
    var wrap = createElement('rect',{width:100,height:100,stroke:'#00aeef',fill:'white','class':'wraprect'});

    // var line1 =  createElement('line',{x1:0,x2:100,y1:50,y2:50,stroke:'#00aeef'});
    // var line2 =  createElement('line',{x1:50,x2:50,y1:0,y2:100,stroke:'#00aeef'});
    //

    var rect1 = createElement('rect',{width:50,height:50,stroke:'#00aeef',fill:'white',class:'onedit sector s1','data-sector':0});
    var rect2 = createElement('rect',{width:50,height:50,x:50,stroke:'#00aeef',fill:'white',class:'onedit sector s2','data-sector':1});
    var rect3 = createElement('rect',{width:50,height:50,y:50,stroke:'#00aeef',fill:'white',class:'onedit sector s3','data-sector':2});
    var rect4 = createElement('rect',{width:50,height:50,x:50,y:50,stroke:'#00aeef',fill:'white',class:'onedit sector s4','data-sector':3});

    var t1 = createElement('text',{x:20,y:35,stroke:'none','font-size':22,fill:'black',class:'onedit sectorText nohover'});
    t1.innerHTML = 1;
    var t2 = createElement('text',{x:70,y:35,stroke:'none','font-size':22,fill:'black',class:'onedit sectorText nohover'});
    t2.innerHTML = 2;
    var t3 = createElement('text',{x:20,y:85,stroke:'none','font-size':22,fill:'black',class:'onedit sectorText nohover'});
    t3.innerHTML = 3;
    var t4 = createElement('text',{x:70,y:85,stroke:'none','font-size':22,fill:'black',class:'onedit sectorText nohover'});
    t4.innerHTML = 4;

    var addSvg = createElement('svg',{x:100,width:80,height:100,class:'onedit',stroke:'#00aeef',id:svgs.length});
    var secwrap = createElement('rect',{width:80,height:100,stroke:'#00aeef',fill:'white'});
    var editB = createElement('rect',{width:60,height:30,x:10,y:10,stroke:'none',fill:'#4f89f2',class:'edit'});
    var deleteB = createElement('rect',{width:60,height:30,x:10,y:60,stroke:'none',fill:'#f26c4f',class:'delete'});

    var editText = createElement('text',{x:15,y:31,'font-size':18,stroke:'none',fill:'white',class:'nohover'});
    editText.innerHTML = 'Edit';
    var deleteText = createElement('text',{x:15,y:81,'font-size':18,stroke:'none',fill:'white',class:'nohover'});
    deleteText.innerHTML = 'Delete';

    addSvg.appendChild(secwrap);
    addSvg.appendChild(editB);
    addSvg.appendChild(deleteB);
    addSvg.appendChild(editText);
    addSvg.appendChild(deleteText);

    mainSvg.appendChild(wrap);
    // mainSvg.appendChild(line1);
    // mainSvg.appendChild(line2);

    mainSvg.appendChild(rect1);
    mainSvg.appendChild(rect2);
    mainSvg.appendChild(rect3);
    mainSvg.appendChild(rect4);
    mainSvg.appendChild(t1);
    mainSvg.appendChild(t2);
    mainSvg.appendChild(t3);
    mainSvg.appendChild(t4);
    mainSvg.appendChild(addSvg);


    svg.appendChild(mainSvg);
    svgs.push({
        el:mainSvg,
        description:'',
        image:'',
        sectors:[
            {line:false,myline:false,relationText:false,nodeId:false,sectorId:false},
            {line:false,myline:false,relationText:false,nodeId:false,sectorId:false},
            {line:false,myline:false,relationText:false,nodeId:false,sectorId:false},
            {line:false,myline:false,relationText:false,nodeId:false,sectorId:false},
        ]
    })

    $(mainSvg).animate({
        opacity:1,
    },500);
    // $(mainSvg).attr('y',top+100)

    return svgs.length-1;
}

var clear = createElement('rect',{width:100,height:30,x:20,y:20,stroke:'#00aeef',fill:'white',class:'clear'});
var clearText = createElement('text',{x:30,y:42,class:'nohover',fill:'#00aeef','font-size':20});
clearText.innerHTML = 'Clear all!';
svg.appendChild(clear);
svg.appendChild(clearText);

function createLine() {
    var line = createElement('line',{stroke:'#00aeef',class:'relationLine'});
    svg.appendChild(line);
    return line;
}


createNode(670,360);

body.on('dblclick','.mainsvg',function () {
    $('.onedit').hide(500);
    $('svg.active').removeClass('active');
    $(this).addClass('active');
    $(this).find('.onedit').show(500);
});

var move = false;
var dX;
var dY;
body.on('mousedown','.mainsvg',function (ev) {
    if(!shift) {
        move = $(this);
        dX = ev.pageX -  pi($(this).attr('x'));
        dY = ev.pageY -  pi($(this).attr('y'));
    }
});


addEventListener('mousemove',function (ev) {
    if(move) {
        move.attr('x',ev.pageX-dX);
        move.attr('y',ev.pageY-dY);
        renderLine(move.attr('id'))
    }
    if(temp) {
        temp.setAttribute('x',ev.pageX-deltaTX);
        temp.setAttribute('y',ev.pageY-deltaTY);
    }

    if(canvasMove) {

        for(var i=0;i<svgs.length;i++) {

            var deltaElX = svgs[i].el.getAttribute('data-dx');
            var deltaElY = svgs[i].el.getAttribute('data-dy');

            svgs[i].el.setAttribute('x',ev.pageX -deltaElX);
            svgs[i].el.setAttribute('y',ev.pageY -deltaElY);
            renderLine(i);
        }

    }
});

body.on('mouseup','.mainsvg',function (ev) {
    move = false;
});


body.on('click','.sector',function () {

    if(!$(this).hasClass('active') && !shift) {
        $(this).addClass('active');

        var thisNodeId = pi($(this).parent().attr('id'));
        var thisSectorID = pi($(this).attr('data-sector'));

        var newX = pi($(this).parent().attr('x'))-200;
        var newY = pi($(this).parent().attr('y'))-200;

        if(thisSectorID == 1) {
            newX = pi($(this).parent().attr('x'))+200;
            newY = pi($(this).parent().attr('y'))-200;
        }

        if(thisSectorID == 2) {
            newX = pi($(this).parent().attr('x'))-200;
            newY = pi($(this).parent().attr('y'))+200;
        }


        if(thisSectorID == 3) {
            newX = pi($(this).parent().attr('x'))+200;
            newY = pi($(this).parent().attr('y'))+200;
        }

         var line = createLine();

        var newId = createNode(newX,newY);

        svgs[thisNodeId].sectors[thisSectorID] = {line:line,myline:true,nodeId:newId,sectorId:3-thisSectorID};
        svgs[newId].sectors[3-thisSectorID] = {line:line,myline:false,nodeId:thisNodeId,sectorId:thisSectorID};

        renderLine(newId);
        renderLine(thisNodeId);


    }


});


var from = {sector:false,node:false,sectorrel:false};
var deltaTX;
var deltaTY;
var temp;

body.on('mousedown','.sector',function (ev) {

    if(!$(this).hasClass('active') && shift) {

        $('.sector,.sectorText').show(500);

        from.sector = $(this).attr('data-sector');
        from.node = $(this).parent().attr('id');
        from.sectorrel = $(this);

        deltaTX = $(svg).offset().left+20;
        deltaTY = $(svg).offset().top+20;

        temp = createElement('rect',{x:ev.pageX-deltaTX,y:ev.pageY-deltaTY,width:40,height:40,'fill':'#f26c4f',class:'nohover'});
        svg.appendChild(temp);

    }
});

var onSector;

body.on('mouseover','.sector',function (ev) {
    onSector=true;
});
body.on('mouseleave','.sector',function (ev) {
    onSector=false;
});



body.on('mouseup','.sector',function () {
    if(temp) {
        temp.remove();
        temp = false;
        if(!$(this).hasClass('active')) {

            var thisNodeId = pi($(this).parent().attr('id'));
            var thisSectorID = pi($(this).attr('data-sector'));

            $(this).addClass('active');

            var line = createLine();
            svgs[from.node].sectors[from.sector] = {line:line,myline:true,nodeId:thisNodeId,sectorId:thisSectorID};
            svgs[thisNodeId].sectors[thisSectorID] = {line:line,myline:false,nodeId:from.node,sectorId:from.sector};

            from.sectorrel.addClass('active');

            renderLine(from.node);
            renderLine(thisNodeId);

            $('.onedit').hide(500);
            $(this).parent().find('.onedit').show(500);

            $('svg.active').removeClass('active');
            $(this).parent().addClass('active');
        }
    }
});


function renderLine(nodeId) {
    var node = svgs[nodeId];
    var thisX = pi(node.el.getAttribute('x'));
    var thisY = pi(node.el.getAttribute('y'));


    for(var sector in node.sectors) {
        if(node.sectors[sector].line) {
            var line = node.sectors[sector].line;
            if(node.sectors[sector].myline)
            var k = 1;
            else k = 2;

            if(sector == 0) {
                line.setAttribute('x'+k,thisX);
                line.setAttribute('y'+k,thisY);
            }

            if(sector == 1) {
                line.setAttribute('x'+k,thisX+100);
                line.setAttribute('y'+k,thisY);
            }

            if(sector == 2) {
                line.setAttribute('x'+k,thisX);
                line.setAttribute('y'+k,thisY+100);
            }
            if(sector == 3) {
                line.setAttribute('x'+k,thisX+100);
                line.setAttribute('y'+k,thisY+100);
            }



        }
    }
}

var editor = $('.editor');
var editNode;
body.on('click','.edit',function (ev) {
    if(!editNode) {
        editor.show(500);
        editNode = svgs[$(this).parent().parent().attr('id')];

        $('.rel').hide().val('');
        $('textarea').val(editNode.description);
        for(var sector in editNode.sectors) {
            if(editNode.sectors[sector].line) {
                $('.rel'+sector).show(500).val(editNode.sectors[sector].relationText);
            }
        }
    }
});
$('.rel').keyup(function () {

    editNode.sectors[$(this).attr('data-relid')].relationText = $(this).val();

});

$('textarea').keyup(function () {
    editNode.description = $(this).val();
});

$('.photo input').change(function (ev) {
    var file = ev.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (ev2) {
        $('.photo img').attr('src',ev2.target.result);
        editNode.image = ev2.target.result;
    }

});

$('.close').click(function () {
    editor.hide(500);
    editNode = false;
});


var shift = false;


addEventListener('keydown',function (ev) {
   // cl(ev.keyCode);
   if(ev.keyCode===16) {
       shift = true;
   }

   if(ev.keyCode===46) {
       var id = $('.mainsvg.active').attr('id');
       cl(id);
       deleteElement(id);
   }
});

addEventListener('keyup',function (ev) {
    // cl(ev.keyCode);
    if(ev.keyCode===16) {
        shift = false;

        canvasMove = false;

        if(temp) {
            temp.remove();
            temp = false;
        }

    }
});


function deleteElement(id) {
    var node = svgs[id];
    if(node!=null) {
        for (var sector in node.sectors) {
            if (node.sectors[sector].line) {
                node.sectors[sector].line.remove();

                svgs[node.sectors[sector].nodeId].sectors[node.sectors[sector].sectorId] = {line: false};
                $('.mainsvg#' + node.sectors[sector].nodeId).find('s' + node.sectors[sector].sectorId).removeClass('active');
            }
        }
        // $(svgs[id].el).hide(500,function () {
            svgs[id].el.remove();
            svgs[id] = null;
        // });

        var del = false;
        var delC=0;
        for(delC;delC<svgs.length;delC++) {
            if(svgs[delC]!=null) del=true;
        }
        if(!del) {
            svgs = [];
            createNode(670,360);
        }
    }
}

body.on('click','.delete',function () {
    var id = $(this).parent().parent().attr('id');
    deleteElement(id);
});

$('.clear').click(function () {
    if(confirm('Are you sure? You can lose all data!')) {
        for(var i=0;i<svgs.length;i++) {
            deleteElement(i);
        }

    }
});


var canvasMove = false;
body.on('mousedown','#svg',function (ev) {
    if(shift && !onSector) {
        canvasMove = true;
        for(var i=0;i<svgs.length;i++) {
            var deltaElX = ev.pageX - pi(svgs[i].el.getAttribute('x'));
            var deltaElY = ev.pageY - pi(svgs[i].el.getAttribute('y'));

            svgs[i].el.setAttribute('data-dx',deltaElX);
            svgs[i].el.setAttribute('data-dy',deltaElY);

        }
    }
});


$('#try').click(function () {
   $('main,footer').hide(400,function () {
       $('#svg').css('display','block').show(400,function () {
           $('.link').addClass('presentation').text('Presentation mode');
       });
   });
});



body.on('click','.presentation',function () {
    editor.hide();
    $('#svg,header').hide(400,function () {
        $('.relation').hide();
        $('.slider').show(500,function () {

            // document.document.webkitRequestFullScreen();
            // document.webkitRequestFullScreen();
            // document.requestFullScreen();
            // document.document.webkitRequestFullScreen();
            // document.document.webkitRequestFullScreen();
            cl($('.map').width());

            var first=0;

            while(svgs[first]==null) {
                first++;
            }
            loadSlide(first);

            document.getElementById('body').requestFullscreen();

        });
    });
});

var slider= $('.slider');

function loadSlide(id) {
    var node = svgs[id];
    slider.find('img').attr('src',node.image);
    slider.find('.description').text(node.description);

    $('.relation').hide();

    for(var sector in node.sectors) {
        if(node.sectors[sector].line) {

            var rel_text = pi(sector)+1;
            var text = node.sectors[sector].relationText?node.sectors[sector].relationText:'Default relation '+ rel_text;
            $('.r'+sector).show(300).text(text).attr('data-rellink',node.sectors[sector].nodeId).animate({
                opacity:1
            },300);
        }
    }

    var k = 5.47;
    var map = document.getElementById('map');

    map.innerHTML = '';

    for(var i=0;i<svgs.length;i++) {
        if(svgs[i]) {
            var nodeM = svgs[i].el;
            var x = pi(nodeM.getAttribute('x'))/k;
            var y = pi(nodeM.getAttribute('y'))/k;

            if(id===i) var red = 'red'; else red = '';

            var small = createElement('rect',{x:x,y:y,width:100/k,height:100/k,class:'small '+red});
            map.append(small);
        }
    }


    var lines = $('.relationLine');

    for(i=0;i<lines.length;i++) {

        var x1 = pi(lines[i].getAttribute('x1'))/k;
        var x2 = pi(lines[i].getAttribute('x2'))/k;

        var y1 = pi(lines[i].getAttribute('y1'))/k;
        var y2 = pi(lines[i].getAttribute('y2'))/k;

        var line = createElement('line',{x1:x1,x2:x2,y1:y1,y2:y2,stroke:'#00aeef',class:'relationLine'});
        map.appendChild(line);

    }



}

var slide = $('.slide');

$('.relation').click(function () {

    var animate = 1200;
    var delay = 800;


    $('.relation').animate({
        opacity:0
    },500);

var self = this;
    if($(this).hasClass('r0')) {
        slide.animate({
           left:'100%',
            top:'100%',
            opacity:0
        },animate,function () {
            slide.css({
                left:'0%',
                top:'0%',
            })
        });
    }

    if($(this).hasClass('r1')) {
        slide.animate({
            left:'0%',
            top:'100%',
            opacity:0
        },animate,function () {
            slide.css({
                left:'100%',
                top:'0%',
            })
        });
    }

    if($(this).hasClass('r2')) {
        slide.animate({
            left:'100%',
            top:'0%',
            opacity:0
        },animate,function () {
            slide.css({
                left:'0%',
                top:'100%',
            })
        });
    }
    if($(this).hasClass('r3')) {
        slide.animate({
            left:'0%',
            top:'0%',
            opacity:0
        },animate,function () {
            slide.css({
                left:'100%',
                top:'100%',
            })
        });
    }


    setTimeout(function () {
        slide.animate({
            left:'50%',
            top:'50%',
            opacity:1
        },animate,function () {

        var nextId = pi($(self).attr('data-rellink'));

        loadSlide(nextId);

        });
    },delay);

});

$('.linkback').click(function () {

    slider.hide(500,function () {
        document.webkitCancelFullScreen();
        $('#svg,header').show(500);
    })

});