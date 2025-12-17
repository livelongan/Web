/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-param-reassign */
import * as go from 'gojs'
let myDiagram
function init() {
    myDiagram = new go.Diagram('myDiagramDiv', {
        allowCopy: false,
        layout: new go.LayeredDigraphLayout({
            setsPortSpots: false, // Links already know their fromSpot and toSpot
            columnSpacing: 5,
            isInitial: false,
            isOngoing: false,
        }),
        validCycle: go.CycleMode.NotDirected,
        ['undoManager.isEnabled']: true,
    })

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener('Modified', (e) => {
        const button = document.getElementById('SaveButton')
        if (button) button.disabled = !myDiagram.isModified
        const idx = document.title.indexOf('*')
        if (myDiagram.isModified) {
            if (idx < 0) document.title += '*'
        } else {
            if (idx >= 0) document.title = document.title.slice(0, idx)
        }
    })

    const graygrad = new go.Brush('Linear', {
        [0]: 'white',
        [0.1]: 'whitesmoke',
        [0.9]: 'whitesmoke',
        [1]: 'lightgray',
    })

    myDiagram.nodeTemplate = new go.Node('Spot', {
        // the default node template
        selectionAdorned: false,
        textEditable: true,
        locationObjectName: 'BODY',
    })
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
        // the main body consists of a Rectangle surrounding the text
        .add(
            new go.Panel('Auto', { name: 'BODY' }).add(
                new go.Shape('Rectangle', {
                    fill: graygrad,
                    stroke: 'gray',
                    minSize: new go.Size(120, 21),
                }).bindObject('fill', 'isSelected', (s) => (s ? 'dodgerblue' : graygrad)),
                new go.TextBlock({
                    stroke: 'black',
                    font: '12px sans-serif',
                    editable: true,
                    margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
                    alignment: go.Spot.Left,
                }).bindTwoWay('text'),
            ),
            // output port
            new go.Panel('Auto', {
                alignment: go.Spot.Right,
                portId: 'from',
                fromLinkable: true,
                cursor: 'pointer',
                click: addNodeAndLink,
            }).add(
                new go.Shape('Circle', {
                    width: 22,
                    height: 22,
                    fill: 'white',
                    stroke: 'dodgerblue',
                    strokeWidth: 3,
                }),
                new go.Shape('PlusLine', {
                    width: 11,
                    height: 11,
                    fill: null,
                    stroke: 'dodgerblue',
                    strokeWidth: 3,
                }),
            ),
            // input port
            new go.Panel('Auto', {
                alignment: go.Spot.Left,
                portId: 'to',
                toLinkable: true,
            }).add(
                new go.Shape('Circle', { width: 8, height: 8, fill: 'white', stroke: 'gray' }),
                new go.Shape('Circle', { width: 4, height: 4, fill: 'dodgerblue', stroke: null }),
            ),
        )
    // ContextMenuTool.positionContextMenu
    // const contextMenu = go.GraphObject.build('ContextMenu')
    myDiagram.nodeTemplate.contextMenu = go.GraphObject.build('ContextMenu').add(
        go.GraphObject.build('ContextMenuButton', {
            click: (e, obj) => e.diagram.commandHandler.editTextBlock(),
        })
            .bindObject(
                'visible',
                '',
                (o) => o.diagram && o.diagram.commandHandler.canEditTextBlock(),
            )
            .add(new go.TextBlock('Rename')),
        // add one for Editing...
        go.GraphObject.build('ContextMenuButton', {
            click: (e, obj) => e.diagram.commandHandler.deleteSelection(),
        })
            .bindObject(
                'visible',
                '',
                (o) => o.diagram && o.diagram.commandHandler.canDeleteSelection(),
            )
            .add(new go.TextBlock('Delete')),
    )

    myDiagram.nodeTemplateMap.add(
        'Loading',
        new go.Node('Spot', {
            selectionAdorned: false,
            textEditable: true,
            locationObjectName: 'BODY',
        })
            .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
            .add(
                // the main body consists of a Rectangle surrounding the text
                new go.Panel('Auto', { name: 'BODY' }).add(
                    new go.Shape('Rectangle', {
                        fill: graygrad,
                        stroke: 'gray',
                        minSize: new go.Size(120, 21),
                    }).bindObject('fill', 'isSelected', (s) => (s ? 'dodgerblue' : graygrad)),
                    new go.TextBlock({
                        stroke: 'black',
                        font: '12px sans-serif',
                        editable: true,
                        margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
                        alignment: go.Spot.Left,
                    }).bind('text'),
                ),
                // output port
                new go.Panel('Auto', {
                    alignment: go.Spot.Right,
                    portId: 'from',
                    fromLinkable: true,
                    click: addNodeAndLink,
                }).add(
                    new go.Shape('Circle', {
                        width: 22,
                        height: 22,
                        fill: 'white',
                        stroke: 'dodgerblue',
                        strokeWidth: 3,
                    }),
                    new go.Shape('PlusLine', {
                        width: 11,
                        height: 11,
                        fill: null,
                        stroke: 'dodgerblue',
                        strokeWidth: 3,
                    }),
                ),
            ),
    )

    myDiagram.nodeTemplateMap.add(
        'End',
        new go.Node('Spot', {
            selectionAdorned: false,
            textEditable: true,
            locationObjectName: 'BODY',
        })
            .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
            .add(
                // the main body consists of a Rectangle surrounding the text
                new go.Panel('Auto', { name: 'BODY' }).add(
                    new go.Shape('Rectangle', {
                        fill: graygrad,
                        stroke: 'gray',
                        minSize: new go.Size(120, 21),
                    }).bindObject('fill', 'isSelected', (s) => (s ? 'dodgerblue' : graygrad)),
                    new go.TextBlock({
                        stroke: 'black',
                        font: '12px sans-serif',
                        editable: true,
                        margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
                        alignment: go.Spot.Left,
                    }).bind('text'),
                ),
                // input port
                new go.Panel('Auto', {
                    alignment: go.Spot.Left,
                    portId: 'to',
                    toLinkable: true,
                }).add(
                    new go.Shape('Circle', { width: 8, height: 8, fill: 'white', stroke: 'gray' }),
                    new go.Shape('Circle', {
                        width: 4,
                        height: 4,
                        fill: 'dodgerblue',
                        stroke: null,
                    }),
                ),
            ),
    )

    // dropping a node on this special node will cause the selection to be deleted;
    // linking or relinking to this special node will cause the link to be deleted
    myDiagram.nodeTemplateMap.add(
        'Recycle',
        new go.Node('Auto', {
            portId: 'to',
            toLinkable: true,
            deletable: false,
            layerName: 'Background',
            locationSpot: go.Spot.Center,
            dragComputation: (node, pt, gridpt) => pt,
            mouseDrop: (e, obj) => e.diagram.commandHandler.deleteSelection(),
        })
            .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
            .add(
                new go.Shape({
                    fill: 'lightgray',
                    stroke: 'gray',
                }),
                new go.TextBlock('Drop Here\nTo Delete', {
                    margin: 5,
                    textAlign: 'center',
                }),
            ),
    )

    // this is a click event handler that adds a node and a link to the diagram,
    // connecting with the node on which the click occurred
    function addNodeAndLink(e, obj) {
        const fromNode = obj.part
        const diagram = fromNode.diagram
        diagram.startTransaction('Add State')
        // get the node data for which the user clicked the button
        const fromData = fromNode.data
        // create a new "State" data object, positioned off to the right of the fromNode
        const p = fromNode.location.copy()
        p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width
        const toData = {
            text: 'new',
            loc: go.Point.stringify(p),
        }
        // add the new node data to the model
        const model = diagram.model
        model.addNodeData(toData)
        // create a link data from the old node data to the new node data
        const linkdata = {
            from: model.getKeyForNodeData(fromData),
            to: model.getKeyForNodeData(toData),
        }
        // and add the link data to the model
        model.addLinkData(linkdata)
        // select the new Node
        const newnode = diagram.findNodeForData(toData)
        diagram.select(newnode)
        // snap the new node to a valid location
        newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p)
        // then account for any overlap
        shiftNodesToEmptySpaces()
        diagram.commitTransaction('Add State')
    }

    // Highlight ports when they are targets for linking or relinking.
    let OldTarget = null // remember the last highlit port
    function highlight(port) {
        if (OldTarget !== port) {
            lowlight() // remove highlight from any old port
            OldTarget = port
            // eslint-disable-next-line no-param-reassign
            port.scale = 1.3 // highlight by enlarging
        }
    }
    function lowlight() {
        // remove any highlight
        if (OldTarget) {
            OldTarget.scale = 1.0
            OldTarget = null
        }
    }

    // Connecting a link with the Recycle node removes the link
    myDiagram.addDiagramListener('LinkDrawn', (e) => {
        const link = e.subject
        if (link.toNode.category === 'Recycle') myDiagram.remove(link)
        lowlight()
    })
    myDiagram.addDiagramListener('LinkRelinked', (e) => {
        const link = e.subject
        if (link.toNode.category === 'Recycle') myDiagram.remove(link)
        lowlight()
    })

    myDiagram.linkTemplate = new go.Link({
        selectionAdorned: false,
        fromPortId: 'from',
        toPortId: 'to',
        relinkableTo: true,
    }).add(
        new go.Shape({
            stroke: 'gray',
            strokeWidth: 2,
            mouseEnter: (e, obj) => {
                obj.strokeWidth = 5
                obj.stroke = 'dodgerblue'
            },
            mouseLeave: (e, obj) => {
                obj.strokeWidth = 2
                obj.stroke = 'gray'
            },
        }),
    )

    function commonLinkingToolInit(tool) {
        // the temporary link drawn during a link drawing operation (LinkingTool) is thick and blue
        tool.temporaryLink = new go.Link({ layerName: 'Tool' }).add(
            new go.Shape({
                stroke: 'dodgerblue',
                strokeWidth: 5,
            }),
        )

        // change the standard proposed ports feedback from blue rectangles to transparent circles
        tool.temporaryFromPort.figure = 'Circle'
        tool.temporaryFromPort.stroke = null
        tool.temporaryFromPort.strokeWidth = 0
        tool.temporaryToPort.figure = 'Circle'
        tool.temporaryToPort.stroke = null
        tool.temporaryToPort.strokeWidth = 0

        // provide customized visual feedback as ports are targeted or not
        tool.portTargeted = (realnode, realport, tempnode, tempport, toend) => {
            if (realport === null) {
                // no valid port nearby
                lowlight()
            } else if (toend) {
                highlight(realport)
            }
        }
    }

    const ltool = myDiagram.toolManager.linkingTool
    commonLinkingToolInit(ltool)
    // do not allow links to be drawn starting at the "to" port
    ltool.direction = go.LinkingDirection.ForwardsOnly

    const rtool = myDiagram.toolManager.relinkingTool
    commonLinkingToolInit(rtool)
    // change the standard relink handle to be a shape that takes the shape of the link
    rtool.toHandleArchetype = new go.Shape({
        isPanelMain: true,
        fill: null,
        stroke: 'dodgerblue',
        strokeWidth: 5,
    })

    // use a special DraggingTool to cause the dragging of a Link to start relinking it
    myDiagram.toolManager.draggingTool = new DragLinkingTool()

    // detect when dropped onto an occupied cell
    myDiagram.addDiagramListener('SelectionMoved', shiftNodesToEmptySpaces)

    function shiftNodesToEmptySpaces() {
        myDiagram.selection.each((node) => {
            if (!(node instanceof go.Node)) return
            // look for Parts overlapping the node
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const exist = myDiagram
                    .findObjectsIn(
                        node.actualBounds,
                        // only consider Parts
                        (obj) => obj.part,
                        // ignore Links and the dropped node itself
                        (part) => part instanceof go.Node && part !== node,
                        // check for any overlap, not complete containment
                        true,
                    )
                    .first()
                if (exist === null) break
                // try shifting down beyond the existing node to see if there's empty space
                node.moveTo(node.actualBounds.x, exist.actualBounds.bottom + 10)
            }
        })
    }

    // prevent nodes from being dragged to the left of where the layout placed them
    myDiagram.addDiagramListener('LayoutCompleted', (e) => {
        myDiagram.nodes.each((node) => {
            if (node.category === 'Recycle') return
            node.minLocation = new go.Point(node.location.x, -Infinity)
        })
    })

    load() // load initial diagram from the mySavedModel textarea
}

function save() {
    document.getElementById('mySavedModel').value = myDiagram.model.toJson()
    myDiagram.isModified = false
}
function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value)
    // if any nodes don't have a real location, explicitly do a layout
    if (myDiagram.nodes.any((n) => !n.location.isReal())) layout()
}

function layout() {
    myDiagram.layoutDiagram(true)
}

// Define a custom tool that changes a drag operation on a Link to a relinking operation,
// but that operates like a normal DraggingTool otherwise.
class DragLinkingTool extends go.DraggingTool {
    constructor(init) {
        super()
        this.isGridSnapEnabled = true
        this.isGridSnapRealtime = false
        this.gridSnapCellSize = new go.Size(182, 1)
        this.gridSnapOrigin = new go.Point(5.5, 0)
        if (init) Object.assign(this, init)
    }

    // Handle dragging a link specially -- by starting the RelinkingTool on that Link
    doActivate() {
        const diagram = this.diagram
        if (diagram === null) return
        this.standardMouseSelect()
        const main = this.currentPart // this is set by the standardMouseSelect
        if (main instanceof go.Link) {
            // maybe start relinking instead of dragging
            const relinkingtool = diagram.toolManager.relinkingTool
            // tell the RelinkingTool to work on this Link, not what is under the mouse
            relinkingtool.originalLink = main
            // start the RelinkingTool
            diagram.currentTool = relinkingtool
            // can activate it right now, because it already has the originalLink to reconnect
            relinkingtool.doActivate()
            relinkingtool.doMouseMove()
        } else {
            super.doActivate()
        }
    }
}
// end DragLinkingTool
