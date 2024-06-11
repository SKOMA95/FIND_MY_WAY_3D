document.getElementById('pathForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const currentLocation = document.getElementById('currentLocation').value;
    const destination = document.getElementById('destination').value;
    drawPath(currentLocation, destination);
});

const rooms = {
    "i01": { x: 50, y: 450 },
    "i02": { x: 150, y: 450 },
    "i02b": { x: 250, y: 450 },
    "i03": { x: 350, y: 450 },
    "i03b": { x: 450, y: 450 }
};

function drawPath(start, end) {
    const svg = document.getElementById('floorPlan');
    svg.innerHTML = ''; // Clear previous path
    if (rooms[start] && rooms[end]) {
        const startX = rooms[start].x;
        const startY = rooms[start].y;
        const endX = rooms[end].x;
        const endY = rooms[end].y;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "line");
        path.setAttribute("x1", startX);
        path.setAttribute("y1", startY);
        path.setAttribute("x2", endX);
        path.setAttribute("y2", endY);
        path.setAttribute("stroke", "red");
        path.setAttribute("stroke-width", "2");
        svg.appendChild(path);

        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const arrowSize = 10;
        const angle = Math.atan2(endY - startY, endX - startX);
        const arrowX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
        const arrowY1 = endY - arrowSize * Math.sin(angle - Math.PI / 6);
        const arrowX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
        const arrowY2 = endY - arrowSize * Math.sin(angle + Math.PI / 6);
        const points = `${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`;
        arrow.setAttribute("points", points);
        arrow.setAttribute("fill", "red");
        svg.appendChild(arrow);
    } else {
        alert('Invalid room names');
    }
}
