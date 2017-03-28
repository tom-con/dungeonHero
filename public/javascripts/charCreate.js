$().ready(() => {

  let drawBox = $('#drawBox');
  let colorPick = $('#picker');
  let apply = $('#colorBtn');
  let save = $('#saveBtn');
  let draw = $('#drawBtn');
  let clear = $('#clearBtn');

  let drawn = {
    Front: 0,
    Back: 0,
    Left: 0,
    Right: 0
  };

  let brush = {
    color: "#000000"
  };
  let spriteObj = {};

  let makeBoard = () => {
    spriteObj = {};
    drawBox.children().remove();
    for (var i = 0; i < 64; i++) {
      let pixelRow = $(`<div class="pixelRow"></div>`)
      for (var j = 0; j < 64; j++) {
        let pixel = $(`<div id="r${i}c${j}" class="pixel"></div>`).appendTo(pixelRow);
      }
      drawBox.append(pixelRow);
    }
  }

  let applyColor = (newColor) => {
    brush.color = `${newColor}`;
  }
  let paint = (thisDiv) => {
    $(thisDiv).css('background', brush.color);
  }
  let drawing = (e) => {
    if ($(event.target).hasClass('pixel')) paint(event.target);
  };
  let saveSprite = () => {
    let spriteArray = [];
    for (let i = 0; i < 64; i++) {
      spriteArray[i] = [];
      for (let j = 0; j < 64; j++) {
        spriteArray[i][j] = $(`#r${i}c${j}`).css('background').substring(0, ($(`#r${i}c${j}`).css('background').indexOf(")") + 1));
      }
    }
    return spriteArray;
  };
  let drawSprite = (name) => {
    let canvas = $(`#canvas${$('#canvasSelect').val()}`)[0];
    let ctx = canvas.getContext('2d');
    if(drawn[$('#canvasSelect').val()] === 1){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    for (let i = 0; i < name.length; i++) {
      for (let j = 0; j < name[i].length; j++) {
        ctx.beginPath();
        ctx.rect(1 + (j * 3), 1 + (i * 3), 3, 3);
        ctx.fillStyle = `${name[i][j]}`;
        ctx.fill();
        ctx.closePath();
      }
    }
    drawn[$('#canvasSelect').val()] = 1;
  }



  draw.click((e) => {
    let name = $('#canvasSelect').val();
    spriteObj[name] = saveSprite();
    drawSprite(spriteObj[name]);
  });
  clear.click((e) => {
    makeBoard();
  });
  apply.click((e) => {
    applyColor(colorPick.val());
  });
  drawBox.mousedown((e) => {
    if ($(event.target).hasClass('pixel')) paint(event.target);
    drawBox.mouseover(drawing);
  });
  drawBox.mouseup((e) => {
    drawBox.off("mouseover", drawing)
  });

  makeBoard();
$('select').material_select();
});
