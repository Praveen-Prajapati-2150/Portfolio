import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Main from '../layouts/Main';
import Pen from '../assets/svg/pen';
import '../static/css/pages/_whiteBoard.scss';

const WhiteBoard = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ffffff');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const eraserSize = 100; // Set the size of the eraser

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setIsErasing(false); // Switch back to pen mode when changing color
  };

  const handleEraserClick = () => {
    setIsErasing(true);
    setColor('#000000'); // Set the eraser color to white
  };

  const getMousePosition = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    return { x, y };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.imageSmoothingEnabled = false;

    const startDrawing = (e) => {
      setIsDrawing(true);

      const { x, y } = getMousePosition(e, canvas);
      context.beginPath();
      context.moveTo(x, y);

      //   context.border = '2px solid white';
      context.strokeStyle = color;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = isErasing ? eraserSize : 6; // Set eraser width to the specified size
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const { x, y } = getMousePosition(e, canvas);

      //   context.beginPath();

      //   if (isErasing) {
      //     // Draw the eraser circle with an outline
      //     context.arc(x, y, eraserSize / 2, 0, Math.PI * 2, true);
      //     context.fillStyle = '#000000'; // Eraser color
      //     context.fill();

      //     // Draw the outline for the eraser circle
      //     context.strokeStyle = '#ffffff'; // Outline color
      //     context.lineWidth = 2; // Outline width
      //     context.stroke();
      //   } else {
      //     // Draw the pen circle
      //     context.lineTo(x, y);
      //     context.arc(x, y, 2.5, 0, Math.PI * 2, true);
      //     context.fillStyle = color; // Pen color
      //     context.fill();
      //     context.strokeStyle = '#ffffff'; // Outline color
      //     context.lineWidth = 1; // Outline width
      //     context.stroke();
      //   }

      // context.beginPath();
      // context.lineTo(x, y);
      // context.arc(x, y, isErasing ? eraserSize / 2 : 2.5, 0, Math.PI * 2, true);
      // context.fillStyle = color;
      // context.fill();
      // context.lineWidth = 1;
      // context.stroke();
      // context.beginPath();
      // context.moveTo(x, y);

      // context.beginPath();
      // context.lineTo(x, y);
      // context.stroke();
      // context.arc(x, y, isErasing ? eraserSize / 2 : 2.5, 0, Math.PI * 2, true);
      // context.fill();
      // context.lineWidth = 6;
      // context.beginPath();
      // context.moveTo(x, y);

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.arc(x, y, isErasing ? eraserSize / 2 : 2.5, 0, Math.PI * 2, true);
      context.fill();
      // context.lineWidth = 6;
      context.beginPath();
      context.moveTo(x, y);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      draw(e.touches[0]);
    });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);

      // Touch events
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, color, isErasing, eraserSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const inputStyle = {
    border: '2px solid white',
    outline: 'none',
    borderRadius: '100%',
    height: '35px',
    width: '35px',
    margin: '0 5px 0 0',
    // backgroundColor: color,
  };

  return (
    <Main fullPage title="Resume" description="Praveen Prajapati's Resume.">
      <article style={{ width: '100%' }} className="post" id="resume">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="input-color-container">
              <input
                id="input-color"
                value={color}
                className="input-color"
                type="color"
                onChange={(e) => handleColorChange(e.target.value)}
              />
            </div>

            <div
              style={{ ...inputStyle, backgroundColor: '#ff0000' }}
              onClick={() => handleColorChange('#ff0000')}
            />
            <div
              style={{ ...inputStyle, backgroundColor: '#00ff11' }}
              onClick={() => handleColorChange('#00ff11')}
            />
            <div
              style={{ ...inputStyle, backgroundColor: '#004ddf' }}
              onClick={() => handleColorChange('#004ddf')}
            />
            <div
              style={{ ...inputStyle, backgroundColor: '#ffffff' }}
              onClick={() => handleColorChange('#ffffff')}
            />
            <Pen color={color} />
            <button type="button" onClick={() => handleEraserClick()}>
              Eraser
            </button>
            <FontAwesomeIcon icon="fa-solid fa-eraser" />
          </div>
          <button type="button" onClick={() => clearCanvas()}>
            Clear
          </button>
        </div>
        <canvas
          ref={canvasRef}
          style={{
            border: '1px solid white',
            width: '100%',
            height: '70%',
            marginTop: '10px',
          }}
          height={600}
          width={850}
        />
      </article>
    </Main>
  );
};

export default WhiteBoard;
