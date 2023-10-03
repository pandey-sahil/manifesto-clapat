function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
loco();



function cursorAnimation() {
    var crsr = document.querySelector("#cursor")
    var main = document.querySelector("#main")
    main.addEventListener("mousemove", function (dets) {
        gsap.to(crsr, {
            left: dets.x,
            top: dets.y,
        })
    })

    document.querySelector("#nav").addEventListener("mouseenter", function (dets) {
        gsap.to(crsr, {
            scale: 2,
            border:"1px solid #979797",
            opacity: 0
        })
    })
    document.querySelector("#nav").addEventListener("mouseleave", function (dets) {
        gsap.to(crsr, {
            scale: 1,
            opacity: 1,
            border:"3px solid #979797",
        })
    })
    document.querySelector("#menu").addEventListener("mouseenter", function (dets) {
        gsap.to("h3:nth-child(1)", {
            y:`-100%`,
            // rotate:"5deg"
        })
        gsap.to("h3:nth-child(2)", {
            y:`-100%`
        })
    })
    document.querySelector("#menu").addEventListener("mouseleave", function (dets) {
        gsap.to("h3:nth-child(1)", {
            y:`0%`
        })
        gsap.to("h3:nth-child(2)", {
            y:`100%`
        })
    })

};
cursorAnimation();

function loading() {
    // locoScroll.stop()
    gsap.set("#nav", {
        y: -100
    })
    var h1 = document.querySelector("#loader h1")
    var grow = 0


    //for the timer countdown
    var inte = setInterval(function () {
        if (grow < 90) {
            grow += Math.floor(Math.random() * 20)
            h1.innerHTML = grow + "%"
        } else {
            grow = 100
            h1.innerHTML = grow + "%"
            clearInterval(inte)
            // locoScroll.start();


        }
    }, Math.floor(Math.random() * 70))

    var loadtl = gsap.timeline()
    loadtl.to("#loader div:nth-child(2) h1", {
        display: "none",
        x: -500,
    }, "an")
    loadtl.to("#loader div:nth-child(1)", {
        x: 10
    }, "an")
    loadtl.to("#loader h1", {
        y: `-100%`,
        // opacity:0,
        // duration:5
        delay: .5
    }).to(".btmtxt", {
        opacity: 0,
        delay: .5
    }, "an")
        .to("#loader", {
            opacity: 0
        }).from("#text h1,#text h3", {
            y: `100%`
        }).to("#nav", {
            y: 0
        })

};
loading();



function textAnimation() {
    var page2h1 = document.querySelector("#page1-text h1").textContent.split("");
    var clutter = ""
    page2h1.forEach(function (elem) {
        clutter += `<span>${elem}</span>`
        // console.log(clutter)
        document.querySelector("#page1-text h1").innerHTML = clutter
    })

    var tl = gsap.timeline({
        scrollTrigger: {
            start: "top 0%",
            end: "top -150%",
            scroller: "#main",
            trigger: "#image-pg1",
            scrub: .5,
            markers: true,
            pin: true
        }
    })
    gsap.set("#page1-text", {
        top: `150%`
    })
    tl.to("#image-pg1 #image", {
        width: `100%`,
        duration: 15
    }, "ani")
        .to("#page1-text h1 span", {
            color: "#fff",
            stagger: .2
        }, "ani")
        .to("#innertex", {
            opacity: 1
        }, "ani")
        .to("#page1-text", {
            top: `35%`,
            duration: 20
        }, "ani")

}
textAnimation();