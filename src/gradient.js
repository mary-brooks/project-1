const colors = new Array(
    [252, 159, 244], // pink
    [255, 174, 227], // pink
    [144, 202, 227], // blue
    [118, 239, 240], // blue
    [238, 230, 135], // yellow
    [249, 155, 138]); // yellow
  
  let step = 0;
  let colorIndices = [0, 1, 2, 3];
  let gradientSpeed = 0.010;
  
  function updateGradient() {
    if ($ === undefined) return;
  
    let c0_0 = colors[colorIndices[0]];
    let c0_1 = colors[colorIndices[1]];
    let c1_0 = colors[colorIndices[2]];
    let c1_1 = colors[colorIndices[3]];
  
    let istep = 1 - step;
  
    let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    let color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';
  
    let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    let color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
  
    $('#gradient')
      .css({
        background:
          '-webkit-gradient(linear, left top, right top, from(' +
          color1 +
          '), to(' +
          color2 +
          '))',
      })
      .css({
        background:
          '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)',
      });
  
    step += gradientSpeed;
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      colorIndices[1] =
        (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
      colorIndices[3] =
        (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
    }
  }