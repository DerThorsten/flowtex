# Flowtex

Flowtex allows to easily create flowcharts with tikz for LaTeX.

## Installation

```bash
npm install -g flowtex
```

You have to install tex/flowtex.sty in your LaTeX working directory to use it.

Flowtex use LaTeX packages: tikz and xcolor. The extension flowtex import tikz
and xcolor.

## Example

![Sample render](https://raw.githubusercontent.com/pierre-luc/flowtex/master/sample/sample.png)

### Input Flowtex code
```javascript
flowchart.offsetX("3");
flowchart.unit("cm"); // default

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
    .right(
        P("Node D")
            .target("a").rightLabel("Label D")
            .target("c").downLabel("label C")
    )
);
```

### Generate latex code
```bash
flowtex sample.js
```

### Output Tikz code for LaTeX:
```latex
\begin{center}
    \begin{tikzpicture}[node distance=2cm]
        \node (nodea) [startstop] {Node A};
        \node (nodeb) [process, below of=nodea] {Node B};
        \node (nodec) [process, left of=nodeb, xshift=-3cm] {Node C};
        \node (noded) [process, right of=nodeb, xshift=3cm] {Node D};
        \draw [arrow] (nodea) --node[anchor=east] {Label B} (nodec);
        \draw [arrow] (nodea) --node[anchor=west] {Label D} (noded);
        \draw [arrow] (nodeb) --node[anchor=west] {Label C} (nodea);
        \draw [arrow] (nodeb) --node[anchor=north] {label A} (nodec);
        \draw [arrow] (nodeb) --node[anchor=north] {label C} (noded);
    \end{tikzpicture}
\end{center}
```
