#How to

* First, create the flowchart on the paper

  ![draft](https://raw.githubusercontent.com/pierre-luc/flowtex/master/sample/tuto/draft.png)

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
    * _node_.width(_Number_)

  * Placements:
    * _originNode_.above(_node_): _node_ is above of _originNode_
    * _originNode_.below(_node_): _node_ is below of _originNode_
    * _originNode_.left(_node_): _node_ is left of _originNode_
    * _originNode_.right(_node_): _node_ is right of _originNode_

  * Arrows:
    * _originNode_.goto(_targetNode_)
      * Arrow style as next goto declaration:
        _gotoCall_(_targetNode_).brokenArrow(): |- tikz style
        _gotoCall_(_targetNode_).offsetArrow(x, y): offsets of start point from origin node

  * Placements with Arrows:
    * _originNode_.aboveGoto(_node_)
    * _originNode_.belowGoto(_node_)
    * _originNode_.leftGoto(_node_)
    * _originNode_.rightGoto(_node_)

  * Labels:
    * leftLabel(_string_)
    * rightLabel(_string_)
    * topLabel(_string_)
    * downLabel(_string_)


* Write your code:

  1. Define the horizontal space between each nodes
    ```javascript
    flowchart.offsetX("3");
    ```

  2. Create first node using **N** template

    ```javascript
    flowchart.offsetX("3");

    N('Start')
    ```

  3. Prepare the next node with arrow declaration:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto().leftLabel('Init');
    ```

  4. Create the node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0')
    ).leftLabel('Init');
    ```

  5. Prepare again the next node with arrow declaration:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto().leftLabel('Start loop')
    ).leftLabel('Init');
    ```

  6. Create the node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto(
        IO('Loop ?')
      ).leftLabel('Start loop')
    ).leftLabel('Init');
    ```  

  7. Create the next node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto(
        IO('Loop ?').belowGoto(
          D('Yes or No ?').offsetY(-1) // use offsetY with D
        ).leftLabel('Looping')
      ).leftLabel('Start loop')
    ).leftLabel('Init');
    ```

  8. Prepare the right node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto(
        IO('Loop ?').belowGoto(
          D('Yes or No ?').offsetY(-1) // use offsetY with D
            .rightGoto().topLabel('yes')
        ).leftLabel('Looping')
      ).leftLabel('Start loop')
    ).leftLabel('Init');
    ```

  9. Create the right node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto(
        IO('Loop ?').belowGoto(
          D('Yes or No ?').offsetY(-1) // use offsetY with D
            .rightGoto(P('k <- k + 1')).topLabel('yes')
        ).leftLabel('Looping')
      ).leftLabel('Start loop')
    ).leftLabel('Init');
    ```

  10. Prepare the below node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto(
        IO('Loop ?').belowGoto(
          D('Yes or No ?').offsetY(-1) // use offsetY with D
            .rightGoto(P('k <- k + 1')).topLabel('yes')
            .belowGoto().leftLabel('no')
        ).leftLabel('Looping')
      ).leftLabel('Start loop')
    ).leftLabel('Init');
    ```

  11. Create the below node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto(
        IO('Loop ?').belowGoto(
          D('Yes or No ?').offsetY(-1) // use offsetY with D
            .rightGoto(P('k <- k + 1')).topLabel('yes')
            .belowGoto( // use offsetY for this node because is immediatly below of D
              P('Print k').offsetY(-1).belowGoto().leftLabel('exit')
            ).leftLabel('no')
        ).leftLabel('Looping')
      ).leftLabel('Start loop')
    ).leftLabel('Init');
    ```

  12. Create the last node:

    ```javascript
    flowchart.offsetX("3");

    N('Start').belowGoto(
      P('k <- 0').belowGoto(
        IO('Loop ?').belowGoto(
          D('Yes or No ?').offsetY(-1) // use offsetY with D
            .rightGoto(P('k <- k + 1')).topLabel('yes')
            .belowGoto( // use offsetY for this node because is immediatly below of D
              P('Print k').offsetY(-1).belowGoto(
                P('Stop')
              ).leftLabel('exit')
            ).leftLabel('no')
        ).leftLabel('Looping')
      ).leftLabel('Start loop')
    ).leftLabel('Init');
    ```

  13. Create the arrow between 'k <- k + 1' and 'Loop ?' nodes:

    ```javascript
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
    ```

  14. Compile with flowtex:
    ![flowchart](https://raw.githubusercontent.com/pierre-luc/flowtex/master/sample/tuto/tuto.png)

  15. Generated LaTeX code:
  ```latex
  \begin{center}
    \begin{tikzpicture}[node distance=2cm]
      \node (node0) [startstop] {Start};
      \node (node1) [process, below of=node0] {k $\leftarrow$ 0};
      \node (node2) [io, below of=node1] {Loop ?};
      \node (node3) [decision, below of=node2, yshift=-1cm] {Yes or No ?};
      \node (node4) [process, right of=node3, xshift=3cm] {k $\leftarrow$ k + 1};
      \node (node5) [process, below of=node3, yshift=-1cm] {Print k};
      \node (node6) [process, below of=node5] {Stop};
      \draw [arrow] (node3) --node[anchor=south] {yes} (node4);
      \draw [arrow] (node3) --node[anchor=east] {no} (node5);
      \draw [arrow] (node5) --node[anchor=east] {exit} (node6);
      \draw [arrow] (node2) --node[anchor=east] {Looping} (node3);
      \draw [arrow] (node1) --node[anchor=east] {Start loop} (node2);
      \draw [arrow] (node0) --node[anchor=east] {Init} (node1);
      \draw [arrow] (node4) -- (node2);
    \end{tikzpicture}
  \end{center}
  ```
