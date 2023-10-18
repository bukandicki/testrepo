"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"

export default function Rotator() {
    const animatedPath = useRef(null)
    const svgref = useRef(null)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: svgref.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: true,
                pin: true
            }
        })

        gsap.set(svgref.current, {
            yPercent: 10
        })
        gsap.set(animatedPath.current, {
            strokeDasharray: 471.2,
            strokeDashoffset: 471.2,
        })
        tl
            .to(animatedPath.current, {
                strokeDashoffset: 0
            })
    }, [])

    const textData = "Back-End Developer — Front-End Developer — UI/UX Designer — DevOps Engineer — Photographer — Videographer — Cinematographer — Story Teller — Job Seeker — Presenter — Artist —"
    const textDatas = ["Back-End Developer", "Front-End Developer", "UI/UX Designer", "DevOps Engineer"]
    return (
        <section style={{ height: "200vh" }}>
            {/* <svg
                viewBox="0 0 100 100"
                width={700}
                height={700}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="circlePath"
                    d="
                        M 5, 50
                        a 45,45 0 1,1 90,0
                        45,45 0 1,1 -90,0
                    "
                    fill="none"
                />
                <text style={{ fontSize: `${(2 * Math.PI * 450) / (textData.length * Math.PI * 1.68)}px` }}>
                    <textPath href="#circlePath">
                        {textData}
                    </textPath>
                </text>
            </svg> */}
            {/* <svg
                viewBox="0 0 100 100"
                width={700}
                height={700}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="circlePath"
                    d="
                        M 5, 50
                        a 45,45 0 1,1 90,0
                        45,45 0 1,1 -90,0
                    "
                    fill="none"
                />
                {textDatas.map((text, idx) => (
                    <text x={(240 / textDatas.length) * idx} key={idx} style={{ fontSize: `${(2 * Math.PI * 450) / (textDatas.length * 2 * Math.PI * 40)}px` }}>
                        <textPath href="#circlePath">
                            {text}
                        </textPath>
                    </text>
                ))}
            </svg>
            <br/>
            {((2 * Math.PI * 450))}<br/>
            {(((2 * Math.PI * 450) / textDatas.length))}<br/>
            {(((2 * Math.PI * 450) / textDatas.length) / 2) * (0 * 2)} */}
            {/* {(2 * Math.PI * 450) / 25}
            {Array(15).fill("Dicki Maulana Yusuf").map((text, idx) => (
                <h1 style={{ transform: `skewY(${(2 * Math.PI * 450) / 25}deg) rotate(${idx}deg)`, }} key={idx}>{text}</h1>
            ))} */}

            <svg ref={svgref} style={{ width: "400px", height: "400px" }} xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx={200}
                    cy={200}
                    r={75}
                    fill="none"
                    stroke="black"
                    strokeWidth={10}
                    ref={animatedPath}
                />
            </svg>
        </section>
    )
}