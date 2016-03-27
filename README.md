# Flowtex

Flowtex allows to easily create flowcharts with tikz for LaTeX.

## Installation

```bash
npm install -g flowtex
```

You have to install tex/flowtex.sty in your LaTeX working directory to use it.

```bash
wget https://raw.githubusercontent.com/pierre-luc/flowtex/master/tex/flowtex.sty
```


Flowtex use LaTeX packages: tikz and xcolor. The extension flowtex import tikz
and xcolor.

## Render based on
The extension **flowtex.sty** is based on the following external definitions:
https://www.sharelatex.com/blog/2013/08/29/tikz-series-pt3.html

## API
* Template:
  * Nodes:
    * **N**: Start or stop node
    * **D**: Conditionnal node
    * **IO**: Input or output node
    * **P**: Process node
* LaTeX Formatter:
  * Arrows:
    * <- : $\leftarrow$
    * -> : $\rightarrow$
  * Text
    * Bold
      * \*\*text\*\* : \textbf{text}
* Methods:
  * Size:
    * ```_node_.width(_Number_)```

  * Placements:
    * ```_originNode_.above(_node_)```: _node_ is above of _originNode_
    * ```_originNode_.below(_node_)```: _node_ is below of _originNode_
    * ```_originNode_.left(_node_)```: _node_ is left of _originNode_
    * ```_originNode_.right(_node_)```: _node_ is right of _originNode_

  * Arrows:
    * ```_originNode_.goto(_targetNode_)```
      * Arrow style as next goto declaration:
        ```_gotoCall_(_targetNode_).brokenArrow()```: |- tikz style
        ```_gotoCall_(_targetNode_).offsetArrow(x, y)```: offsets of start point from origin node

  * Placements with Arrows:
    * ```_originNode_.aboveGoto(_node_)```
    * ```_originNode_.belowGoto(_node_)```
    * ```_originNode_.leftGoto(_node_)```
    * ```_originNode_.rightGoto(_node_)```

  * Labels:
    * ```leftLabel(_string_)```
    * ```rightLabel(_string_)```
    * ```topLabel(_string_)```
    * ```downLabel(_string_)```


## How to
[tutorial](https://github.com/pierre-luc/flowtex/blob/master/sample/tuto/tuto.md)

## Example

![Sample render](https://raw.githubusercontent.com/pierre-luc/flowtex/master/sample/sample.png)

### Input Easy Flowtex code
Nodes declarations first and arrows declarations in second time.
```javascript
flowchart.offsetX("3");
flowchart.unit("cm"); // default

a = N("Node A").below(
  b = P("Node B")
    .leftGoto(c = P("Node C")).downLabel('Label A')
    .rightGoto(d = P("Node D")).downLabel('Label C')
);

a.goto(c).leftLabel('Label C');
a.goto(d).rightLabel('Label D');
b.goto(a).rightLabel('Label C');

```

### Input Rich Flowtex code
Nodes declarations and arrows declarations in same time.
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
        \node (node0) [startstop] {Node A};
        \node (node1) [process, below of=node0] {Node B};
        \node (node2) [process, left of=node1, xshift=-3cm] {Node C};
        \node (node3) [process, right of=node1, xshift=3cm] {Node D};
        \draw [arrow] (node0) --node[anchor=east] {Label B} (node2);
        \draw [arrow] (node0) --node[anchor=west] {Label D} (node3);
        \draw [arrow] (node1) --node[anchor=west] {Label C} (node0);
        \draw [arrow] (node1) --node[anchor=north] {label A} (node2);
        \draw [arrow] (node1) --node[anchor=north] {label C} (node3);
    \end{tikzpicture}
\end{center}
```
