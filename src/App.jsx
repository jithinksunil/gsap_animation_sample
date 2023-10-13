import React, { useLayoutEffect } from 'react';
import '../src/App.css';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/all';
import TickMark from './Tick';

gsap.registerPlugin(TextPlugin, MotionPathPlugin);

export default function App() {
  useLayoutEffect(() => {
    gsap.to('.cursor1,.cursor2', {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    MotionPathPlugin.convertToPath('#flightPath');
    gsap.set('#flightPath', { rotation: 15 });

    let tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });
    tl.set('.modal', { scale: 0.3, opacity: 0 });

    tl.to('.userName', {
      duration: 1,
      text: 'example@gmail.com',
    })
      .to('.password', {
        duration: 1,
        text: 'password',
        onStart: () => {
          document.querySelector('.cursor1').classList.add('hide');
          document.querySelector('.cursor2').classList.remove('hide');
        },
      })
      .to('#mousePointer', {
        duration: 1,
        motionPath: {
          path: '#flightPath',
          align: '#flightPath',
        },
        ease: 'power1.inOut',
        onStart: () => {
          document.getElementById('mousePointer').classList.remove('hide');
        },
      })
      .to('#submitButton', {
        duration: 0.08,
        scale: 0.9,
        repeat: 1,
        yoyo: true,
      })
      .to('.modal', {
        scale: 1,
        opacity: 1,
        ease: 'back',
        duration: 0.5,
        onComplete: () => {
          document.querySelector('.cursor2').classList.add('hide');
          document.querySelector('.cursor1').classList.remove('hide');
        },
      });
  }, []);
  return (
    <div className='mainContainer'>
      <div className='container'>
        <div className='inputField'>
          <h2>
            <span className='userName'></span>
            <span className='cursor1'> |</span>
          </h2>
        </div>
        <div className='inputField'>
          <h2>
            <span className='password'></span>
            <span className='cursor2 hide'> |</span>
          </h2>
        </div>

        <div id='submitButton'>
          <h2>Submit</h2>
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='850'
            height='850'
            viewBox='0 0 855.6 578.4'
          >
            <path id='flightPath' fill='none' d='M1100,-300 V200 H600' />
          </svg>
          <svg
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='50px'
            height='50px'
            viewBox='1064.7701 445.5539 419.8101 717.0565'
          >
            <polygon
              className='hide'
              id='mousePointer'
              fill='#4b4446'
              points='1283.1857,1127.3097 1406.1421,1077.6322 1314.2406,850.1678 1463.913,852.7823 1093.4828,480.8547 1085.4374,1005.6964 1191.2842,899.8454'
            />
          </svg>
        </div>
        <div className='modal'>
          <TickMark />
        </div>
      </div>
    </div>
  );
}
