flowchart.offsetX("3");
flowchart.unit("cm"); // default

a = N("Node A")
.below(
    b = P("Node B")
    .left(c = P("Node C")).width(3)
    .right(d = P("Node D"))
);

a.goto(c).brokenArrow().offsetArrow(4, 0).leftLabel('Label C');
a.goto(d).rightLabel('Label D');
b.goto(a).rightLabel('Label C');
b.goto(c).downLabel('Label A');
b.goto(d).downLabel('Label C');
