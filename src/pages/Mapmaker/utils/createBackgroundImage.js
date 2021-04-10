var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// X
for (let i = 0; i <= 6400; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 1);
    ctx.lineTo(i, 3200);
    ctx.stroke();

}
// Y
for (let i = 1; i < 3200; i += 32) {
    ctx.beginPath();
    ctx.moveTo(1, i);
    ctx.lineTo(6400, i);
    ctx.stroke();

}
// var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.


// window.location.href = image; // it will save locally