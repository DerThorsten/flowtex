N("Node A")
    .origin("a")
    .target("b").rightLabel("Label C")
.below(
    P("Node B").origin("b").origin("c")
    .left(
        P("Node C")
            .target("a").leftLabel("Label B")
            .target("c").downLabel("label A")
    )
);
