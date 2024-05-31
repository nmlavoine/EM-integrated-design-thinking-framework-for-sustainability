const circles = document.querySelectorAll('.circle');

circles.forEach(circle => {
  let isDragging = false;
  let startAngle = 0;
  let currentAngle = 0;

  circle.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', duringDrag);
  window.addEventListener('mouseup', endDrag);

  circle.addEventListener('touchstart', startDrag, {passive: false});
  window.addEventListener('touchmove', duringDrag, {passive: false});
  window.addEventListener('touchend', endDrag);

  function getAngle(event) {
    const rect = circle.getBoundingClientRect();
    const circleCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - circleCenter.x;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - circleCenter.y;
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    startAngle = getAngle(e) - currentAngle;
  }

  function duringDrag(e) {
    if (isDragging) {
      const angle = getAngle(e);
      currentAngle = angle - startAngle;
      circle.style.transform = `rotate(${currentAngle}deg)`;
    }
  }

  function endDrag(e) {
    isDragging = false;
  }
});