N("start node").below(
    P("Entry point").origin("a").left(
        IO("Input task")
            .left(
                P('LeftNode').origin("a").downLabel("label A")
            ).right(
                P('RightNode').target("a").leftLabel("label B")
            )
    )
);
