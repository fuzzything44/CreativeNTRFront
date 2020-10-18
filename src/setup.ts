const hasMixedTextHtml = (nodes: ChildNode[]): boolean => {
    let hasTextNode: boolean = false;
    let hasHtmlNode: boolean = false;

    nodes.forEach((node: ChildNode) => {
        if (node instanceof Text) {
            if (node.textContent && node.textContent.replace(/\n/g, "") !== "") {
                hasTextNode = true;
            }
        } else {
            hasHtmlNode = true;
        }
    });
    return hasTextNode && hasHtmlNode;
}

const labelNodes = () => {
    const pageElements: NodeListOf<Element> = document.querySelectorAll("body *");
    pageElements.forEach((element: Element, index: number) => {
        if (element.id === "") {
            element.id = "annotator_elem_" + index;
        }
        /* Some nodes are like this: <div>
         *      <h1>Text here</h1> 
         *      more text adjacent to a node 
         * </div>
         * 
         * Note the mixed text/HTML elements. This makes things harder for us.
         * So we want to wrap all these text elements with a <span> tag with an id
         */
        const children: ChildNode[] = Array.from(element.childNodes);

        if (hasMixedTextHtml(children)) {
            element.innerHTML = "";
            children.forEach((child: ChildNode, index: number) => {
                if (child instanceof Text) {
                    if (child.textContent && child.textContent.replace(/\n/g, "") !== "") {
                        const span = document.createElement("span");
                        span.innerText = child.textContent ? child.textContent.replace(/\n/g, "") : "";
                        span.id = element.id + "_text_" + index;
                        element.appendChild(span);
                    }
                } else {
                    element.appendChild(child);
                }
            });
        }
    });
}


const setup = () => window.onload = () => {
    labelNodes();
    let lastSelected: HTMLElement | undefined = undefined;
    let lastSelectedBackground: string = "";
    document.addEventListener("selectionchange", () => {
        // This is all a bunch of temporary code showing what can be done with selections and ranges.
        // Because of this, the style is pretty awful. We should discuss exactly what we want to do with 
        // selections and what format we want the data in before we proceed too much further.
        const selection: Selection | null = document.getSelection();
        if (selection == null || selection.rangeCount === 0) {
            if (lastSelected) {
                lastSelected.style.backgroundColor = lastSelectedBackground;
            }
            return;
        }
        const range: Range = selection.getRangeAt(0);
        /*
         Do things with selection here
         https://developer.mozilla.org/en-US/docs/Web/API/Selection
         https://developer.mozilla.org/en-US/docs/Web/API/Range
         */
        const node: Node | null = range.startContainer.parentNode;
        if (node) {
            if (lastSelected) {
                lastSelected.style.backgroundColor = lastSelectedBackground;
            }
            lastSelected = (node as HTMLElement);
            lastSelectedBackground = (node as HTMLElement).style.backgroundColor;
            (node as HTMLElement).style.backgroundColor = "red";
        }
    });
};


export { setup };