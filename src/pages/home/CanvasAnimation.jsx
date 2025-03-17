import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const frames = { current: 1, maxIndex: 120 };
  const images = [];
  let imagesLoaded = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    function preloadImages() {
      for (let i = 0; i <= frames.maxIndex; i++) {
        const imageUrl = `./bg removed renamer/${i.toString().padStart(6, "0")}-removebg-preview.png`;
        const img = new Image();
        img.src = imageUrl;

        img.onload = function () {
          imagesLoaded++;
          if (imagesLoaded === frames.maxIndex) {
            loadImages(frames.current);
            startAnimation();
          }
        };
        images.push(img);
      }
    }

    function loadImages(index) {
      if (index >= 0 && index <= frames.maxIndex && context && canvas) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.current = index;
      }
    }

    function startAnimation() {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.parent',
          start: "top top",
          scrub: 0.5,
          end: "bottom bottom",
        }
      }).to(frames, {
        current: frames.maxIndex,
        onUpdate: function () {
          loadImages(Math.floor(frames.current));
        }
      });
    }

    window.addEventListener('resize', () => {
      loadImages(Math.floor(frames.current));
    });

    preloadImages();

    return () => {
      window.removeEventListener('resize', () => {
        loadImages(Math.floor(frames.current));
      });
    };
  }, []);

  return (
    <div className="w-full">
      <div className="parent relative w-full h-[800vh]">
        <div className="w-full sticky top-0 left-0 h-screen">
          <canvas className="w-full h-screen" ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default CanvasAnimation; 