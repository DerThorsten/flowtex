# Flowtex

Flowtex allows to easily create flowcharts with tikz for LaTeX.

## Installation

```bash
npm install -g flowtex
```

You have to install tex/flowtex.tex in your LaTeX working directory to use it.

Flowtex use LaTeX packages: tikz and xcolor. The extension flowtex import tikz
and xcolor.

## Example

![Sample render](https://github.com/pierre-luc/flowtex/sample/sample.png)

### Input Flowtex code
```javascript
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
```

### Generate latex code
```bash
flowtex sample.js
```

### Output Tikz code for LaTeX:
```latex
\begin{tikzpicture}[node distance=2cm]
    % Node declarations
    \node (nodea) [startstop] {Node A};
    \node (nodeb) [process, below of=nodea, xshift=3] {Node B};
    \node (nodec) [process, left of=nodeb, xshift=-3cm] {Node C};

    % Arrow declarations
    \draw [arrow] (nodea) --node[anchor=east] {Label B} (nodec);
    \draw [arrow] (nodeb) --node[anchor=west] {Label C} (nodea);
    \draw [arrow] (nodeb) --node[anchor=north] {label A} (nodec);
\end{tikzpicture}
```
