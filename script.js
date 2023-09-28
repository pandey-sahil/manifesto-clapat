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
gsap.set("#page1-text",{
    top:`150%`
})




    function textAnimation() {
        var page2h1 = document.querySelector("#page1-text h1").textContent.split("");
        var clutter = ""
        page2h1.forEach(function(elem){
            clutter += `<span>${elem}</span>`
            console.log(clutter)
            document.querySelector("#page1-text h1").innerHTML = clutter
        })
        
        var tl = gsap.timeline({
            scrollTrigger:{
                start:"top 0%",
                end:"top -150%",
                scroller:"#main",
                trigger:"#image-pg1",
                scrub:.5,
                markers:true,
                pin:true
            }
        })
        tl.to("#image-pg1 #image",{
            width:`100%`,
            duration:15
            },"ani")
            .to("#page1-text h1 span",{
                color:"#fff",
                stagger:.2
            },"ani")
            .to("#innertex",{
                opacity:1
            },"ani")
            .to("#page1-text",{
                top:`35%`,
                duration:20
            },"ani")
        
    }
    textAnimation();