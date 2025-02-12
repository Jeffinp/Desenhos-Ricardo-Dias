const $ = e => document.querySelector(e)
    , $$ = e => document.querySelectorAll(e)
    , initInfiniteCarousel = () => {
        const e = $(".cards-contents")
            , t = $$(".card-banner")
            , n = $(".carousel-button.prev")
            , s = $(".carousel-button.next");
        if (!e || 0 === t.length || !n || !s)
            return void console.warn("Alguns elementos do carrossel estão faltando. Ignorando a inicialização do carrossel.");
        const o = 820
            , i = 1024;
        let a = 0
            , d = 3;
        const r = t.length;
        let l = 0;
        e.addEventListener("touchstart", (e => {
            l = e.changedTouches[0].screenX
        }
        ), {
            passive: !0
        }),
            e.addEventListener("touchend", (e => {
                const t = e.changedTouches[0].screenX
                    , n = l - t;
                Math.abs(n) > 50 && v(n > 0 ? "next" : "prev")
            }
            ), {
                passive: !0
            }),
            t.forEach((t => e.appendChild(t.cloneNode(!0))));
        const c = (n = !0) => {
            const s = t[0].offsetWidth + 20;
            e.style.transition = n ? "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
                e.style.transform = `translateX(-${a * s}px)`,
                t.forEach(((e, t) => {
                    e.style.animation = t >= a && t < a + d ? "fadeIn 0.8s forwards, slideIn 0.8s forwards" : "none"
                }
                ))
        }
            , h = () => {
                a = r,
                    c(!1)
            }
            , v = e => {
                if (a += "next" === e ? 1 : -1,
                    a >= 2 * r)
                    setTimeout(h, 800);
                else if (a < 0)
                    return a = r - 1,
                        c(!1),
                        void setTimeout((() => {
                            a = 2 * r - 1,
                                c()
                        }
                        ), 20);
                c()
            }
            , u = () => {
                const e = window.innerWidth;
                d = e <= o ? 1 : e <= i ? 2 : 3,
                    c(!1)
            }
            ;
        s.addEventListener("click", (() => v("next"))),
            n.addEventListener("click", (() => v("prev"))),
            document.addEventListener("keydown", (e => {
                "ArrowRight" === e.key && v("next"),
                    "ArrowLeft" === e.key && v("prev")
            }
            )),
            window.addEventListener("resize", u),
            u()
    }
    , header = document.querySelector(".header");
let lastScrollY = window.scrollY;
window.addEventListener("scroll", (() => {
    const e = window.scrollY;
    e > 100 ? e > lastScrollY && !header.classList.contains("header--hidden") ? header.classList.add("header--hidden") : e < lastScrollY && header.classList.contains("header--hidden") && header.classList.remove("header--hidden") : header.classList.remove("header--hidden"),
        lastScrollY = e
}
));
const initMobileNavigation = () => {
    const e = $(".mobile-nav-toggle")
        , t = $(".mobile-nav");
    e && t ? e.addEventListener("click", (() => {
        const n = t.classList.toggle("open");
        t.style.maxHeight = n ? `${t.scrollHeight}px` : "0",
            t.style.opacity = n ? "1" : "0",
            e.setAttribute("aria-expanded", n)
    }
    )) : console.warn("Elementos de navegação móvel estão faltando. Ignorando a inicialização da navegação móvel.")
}
    , initBeforeAfterSlider = () => {
        const e = $("#antes-depois-slider")
            , t = $$(".antes-depois-item")
            , n = $(".carousel-button2.prev")
            , s = $(".carousel-button2.next")
            , o = $(".carousel-container2");
        if (!(e && 0 !== t.length && n && s && o))
            return void console.warn('Elementos do slider "antes e depois" estão faltando. Ignorando a inicialização do slider.');
        let i = 0
            , a = 0;
        const d = document.createElement("div");
        d.className = "slider-indicator",
            t.forEach(((e, t) => {
                const n = document.createElement("div");
                n.className = "indicator-dot",
                    n.addEventListener("click", (() => l(t))),
                    d.appendChild(n)
            }
            )),
            o.appendChild(d);
        const r = () => {
            e.style.transform = `translateX(${100 * -i}%)`,
                $$(".indicator-dot").forEach(((e, t) => {
                    e.classList.toggle("active", t === i)
                }
                )),
                n.style.visibility = 0 === i ? "hidden" : "visible",
                s.style.visibility = i === t.length - 1 ? "hidden" : "visible"
        }
            , l = e => {
                i = e,
                    r()
            }
            , c = e => {
                i = Math.max(0, Math.min(i + e, t.length - 1)),
                    r()
            }
            ;
        s.addEventListener("click", (() => c(1))),
            n.addEventListener("click", (() => c(-1))),
            e.addEventListener("touchstart", (e => {
                a = e.changedTouches[0].screenX
            }
            ), {
                passive: !0
            }),
            e.addEventListener("touchend", (e => {
                const t = e.changedTouches[0].screenX
                    , n = a - t;
                Math.abs(n) > 50 && c(n > 0 ? 1 : -1)
            }
            ), {
                passive: !0
            }),
            r()
    }
    ;
document.addEventListener("DOMContentLoaded", (() => {
    initInfiniteCarousel(),
        initMobileNavigation(),
        initBeforeAfterSlider()
}
));
