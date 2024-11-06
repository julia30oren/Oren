let svgs_f = [
    {
        el_id:'idea1',
        svg_run: false
    },
    {
        el_id:'idea2',
        svg_run: false
    },
    {
        el_id:'idea3',
        svg_run: false
    },
    {
        el_id:'idea4',
        svg_run: false
    },
    {
        el_id: 'apple',
        svg_run: false
    },
    {
        el_id: 'web',
        svg_run: false
    }
]

function chackLocation(svg_el) {
    var x = $("#" + svg_el.el_id).offset();
    if(x){
        var height1 = $("#" + svg_el.el_id).outerHeight();
        var y = document.documentElement.scrollTop;
        var z = x.top + height1 - y;
        if (!svg_el.svg_run && z < $(window).height()) {
            startSVGAnimation($("#" + svg_el.el_id));
            svg_el.svg_run = !svg_el.svg_run;
        } 
    }

}

//inspired by http://product.voxmedia.com/post/68085482982/polygon-feature-design-svg-animations-for-fun-and

//Depends on jQuery

// Easing excerpt from George McGinley Smith
// https://gsgd.co.uk/sandbox/jquery/easing/
jQuery.extend(jQuery.easing, {
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
});

//If you want to add SVG to the DOM, jQuery won't do
//http://www.benknowscode.com/2012/09/using-svg-elements-with-jquery_6812.html

function drawSVGPaths(_parentElement, _timeMin, _timeMax, _timeDelay) {
    var paths = $(_parentElement).find("path");
    var bg = $(_parentElement).find(".bg");

    // rect.addClass( "color" );
    $.each(bg, function () {
        $(this).addClass( "color" );
    });

    //for each PATH..
    $.each(paths, function (i) {
        //get the total length
        var totalLength = this.getTotalLength();

        //set PATHs to invisible
        $(this).css({
            "stroke-dashoffset": totalLength,
            "stroke-dasharray": totalLength + " " + totalLength,
        });

        //animate
        $(this)
            .delay(_timeDelay * i)
            .animate(
                {
                    "stroke-dashoffset": 0,
                },
                {
                    duration: Math.floor(Math.random() * _timeMax) + _timeMin,
                    easing: "easeInOutQuad",
                }
            );
    });
}

function startSVGAnimation(parentElement) {
    drawSVGPaths(parentElement, 1000, 2000, 50);
}

$(document).ready(function () {
    $(window).scroll(function () {
        svgs_f.forEach(element => {
            chackLocation(element);
        });
    });
});