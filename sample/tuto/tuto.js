flowchart.unit("cm"); // default
flowchart.offsetX("3");

N('Start').belowGoto(
  P('k <- 0').belowGoto(
    loop = IO('Loop ?').belowGoto(
      D('Yes or No ?').offsetY(-1) // use offsetY with D
        .rightGoto(kp1 = P('k <- k + 1')).topLabel('yes')
        .belowGoto( // use offsetY for this node because is immediatly below of D
          P('Print k').offsetY(-1).belowGoto(
            P('Stop')
          ).leftLabel('exit')
        ).leftLabel('no')
    ).leftLabel('Looping')
  ).leftLabel('Start loop')
).leftLabel('Init');

kp1.goto(loop);
