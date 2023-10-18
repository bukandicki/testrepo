"use client"

import { useLayoutEffect, useState } from "react"
// import LocomotiveScroll from 'locomotive-scroll';
import gsap from "gsap";

let intervalInstance

export default function Home() {
  const numbersArray = Array.from({ length: 10 }, (_, index) => index);
  const fakeArray = [
    {
      name: "Dicki Maulana"
    },
    {
      name: "Juno Man"
    },
    {
      name: "Juli Man"
    }
  ]
  const fakeRoleArray = [
    {
      name: "Front-End",
      type: "Developer"
    },
    {
      name: "Back-End",
      type: "Developer"
    },
    {
      name: "UI/UX",
      type: "Designer"
    },
  ]
  const roleLists = fakeRoleArray.reduce((filtered, role) => {
    if (!filtered.includes(role.type)) filtered.push(role.type);

    return filtered;
  }, [])

  const getIndexRole = (type) => {
    return roleLists.findIndex(role => role === type)
  }

  const getWidthCurrent = (idx) => {
    if (typeof document === 'undefined') return 0
    return document.querySelectorAll(".role-class")[idx]?.offsetWidth
  }

  const [number, setNumber] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [currentIndexRole, setCurrentIndexRole] = useState(0)

  useLayoutEffect(() => {
    let scroll

    // if (typeof window !== 'undefined') {
    //   scroll = new LocomotiveScroll({
    //     lenisOptions: {
    //       lerp: 0.1,
    //       duration: 1.2,
    //       easing: (t) => 1 - Math.pow(1 - t, 5)
    //     }
    //   });
    // }

    intervalInstance = setInterval(() => {
      setNumber(Math.floor(Math.random() * (12399 - 200 + 1) + 200))
      setCurrentIndexRole(prev => {
        if (prev === 2) return 0
        else return prev + 1
      })
    }, 1000);

    const tl = gsap.timeline()
    gsap.set(".wrapper", { autoAlpha: 1 })


    tl.set(".aa span", { y: 150, skewY: 45 })
    tl.to(".aa span", { y: 0, skewY: 0, duration: .5, stagger: 0.015 })

    return () => {
      clearInterval(intervalInstance)
      // scroll.destroy()
    }
  }, [])

  return (
    <main style={{ height: "150vh" }}>
      <input min={0} step={.1} type="number" value={number} onChange={(e) => setNumber(Number(e.target.value).toFixed(1))} />
      <div style={{ display: "flex" }}>
        {String(number).split("").map((number, idx) => (
          <>
            {number === "."
              ? <span key={idx} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20px", width: "20px" }}>.</span>
              : <div key={idx} style={{ overflow: "hidden", height: "20px" }}>
                <div style={{ transition: `all 0.6s cubic-bezier(0.87, 0, 0.13, 1)`,transform: `translateY(${-20 * number}px)`, display: "flex", flexDirection: "column" }}>
                  {numbersArray.map((n) => (
                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20px", width: "20px" }} key={n}>{n}</span>
                  ))}
                </div>
              </div>
            }
          </>
        ))}
      </div>

      <div style={{ overflow: "hidden", height: "40px", marginBottom: "10vh" }}>
        <ul style={{ display: "grid", gap: "10px", listStyleType: "none", padding: 0, margin: 0, transition: "transform 0.6s cubic-bezier(0.87, 0, 0.13, 1), opacity 0.4s cubic-bezier(0.87, 0, 0.13, 1)", opacity: currentIndex !== null ? 1 : 0, transform: `translateY(${currentIndex !== null ? -50 * currentIndex : 50}px)` }}>
          {fakeArray.map(({ name }, index) => (
            <li style={{ transition: "opacity 0.4s cubic-bezier(0.87, 0, 0.13, 1)", opacity: currentIndex === index ? 1 : 0, height: "40px", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "200px", maxWidth: "fit-content" }} key={name}>{name}</li>
          ))}
        </ul>
      </div>

      {fakeArray.map(({ name }, index) => (
        <span data-scroll data-scroll-speed={index * 0.5} onMouseOver={() => setCurrentIndex(index)} role="button" onMouseLeave={() => setCurrentIndex(null)} style={{ display: "inline-block", marginRight: "10vh" }} key={name}>{name}</span>
      ))}

      <section style={{ marginTop: "30vh", display: "flex", overflow: "hidden", }}>
        <div style={{ height: "40px", position: "relative" }}>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, transition: "transform 0.6s cubic-bezier(0.87, 0, 0.13, 1)", transform: `translateY(${-40 * currentIndexRole}px)` }}>
            {fakeRoleArray.map((role, idx) => (
              <li className="role-class" style={{ height: "40px", display: "flex", justifyContent: "center", alignItems: "center", width: "fit-content", transition: "opacity 0.4s cubic-bezier(0.87, 0, 0.13, 1)", opacity: currentIndexRole !== idx ? 0 : 1 }} key={role.name}>
                <span>
                  {role.name}
                </span>

              </li>
            ))}
          </ul>
          <div style={{ position: "absolute", top: 0, left: `${getWidthCurrent(currentIndexRole) + 4}px`, overflow: "hidden", transition: "left .5s cubic-bezier(0.87, 0, 0.13, 1)", height: "40px" }}>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, transition: "transform .9s cubic-bezier(0.87, 0, 0.13, 1)", transform: `translateY(${-40 * getIndexRole(fakeRoleArray[currentIndexRole].type)}px)` }}>
              {roleLists.map((role, idxr) => (
                <li style={{ height: "40px", display: "flex", justifyContent: "center", alignItems: "center", transition: "opacity .4s cubic-bezier(0.87, 0, 0.13, 1)", opacity: getIndexRole(fakeRoleArray[currentIndexRole].type) !== idxr ? 0 : 1  }} key={role}>
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* <section style={{ marginTop: "30vh", display: "flex", overflow: "hidden", height: "40px" }}>
          {fakeRoleArray.map((role, idx) => (
            <div style={{ height: "40px", justifyContent: "center", alignItems: "center", width: "fit-content", transition: "transform 0.6s cubic-bezier(0.87, 0, 0.13, 1), opacity 0.4s cubic-bezier(0.87, 0, 0.13, 1)", transform: `translateY(${-40 * currentIndexRole}px)`, opacity: currentIndexRole !== idx ? 0 : 1 }} key={role.name}>
              <span>
                {role.name}
              </span>
            </div>
          ))}
          {roleLists.map((role, idxr) => (
            <div style={{ height: "40px", justifyContent: "center", alignItems: "center", transition: "transform 1s cubic-bezier(0.87, 0, 0.13, 1), opacity 0.4s cubic-bezier(0.87, 0, 0.13, 1)", opacity: getIndexRole(fakeRoleArray[currentIndexRole].type) !== idxr ? 0 : 1, transform: `translateY(${-40 * getIndexRole(fakeRoleArray[currentIndexRole].type)}px)` }} key={role}>
              {role}
            </div>
          ))}
      </section> */}

      <section className="aa" style={{ marginTop: "40vh" }}>
        <h1 style={{ overflow: "hidden" }}>
          <span style={{ display: "inline-block" }}>
            Dicki
          </span>
          {" "}
          <span style={{ display: "inline-block" }}>
            Maulana
          </span>
        </h1>
        <h1 style={{ maxWidth: "700px" }}>
          {"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters".split(/(\s+)/).map((word, idx) => (
            <>
              {word === " " ? " " : <div style={{ display: "inline-block", overflow: "hidden" }} key={idx}>
                <span style={{ display: "inline-block" }}>{word}</span>
              </div>}
            </>
          ))}
        </h1>
      </section>
    </main>
  )
}
