N("Node A")
    .origin("a")
    .target("b").rightLabel("Label C")
.below(
    P("Node B").origin("b").origin("c")
    .offsetX("3cm")
    .left(
        P("Node C")
            .offsetX("-3cm")
            .target("a").leftLabel("Label B")
            .target("c").downLabel("label A")
    )
);
