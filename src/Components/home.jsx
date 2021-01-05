import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/main.css';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};


const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};



class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            items:[{imgXAxis:0, imgYAxis: 0, num:1, id:'0'},
                {imgXAxis:0, imgYAxis: -120,num:3, id:'1'},
                {imgXAxis:-120, imgYAxis:0, num:2, id:'2'},
                {imgXAxis:-120, imgYAxis: -120, num:4,id:'3'}],
            selected:[],
            imgUrl:"https://i.ibb.co/8mHYh26/bag.jpg&quot",
            correctSound : new Audio(),
            winSound: new Audio()
        };
        this.preloadAudio()
    }

  
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];
    preloadAudio(){
        this.state.correctSound.src = 'https://firebasestorage.googleapis.com/v0/b/bkmysh-aa52d.appspot.com/o/correct-answer.wav?alt=media&token=eba0b557-4961-42c3-9e7b-0ab9b93378a0';
        this.state.winSound.src = 'https://firebasestorage.googleapis.com/v0/b/bkmysh-aa52d.appspot.com/o/applause-1.wav?alt=media&token=771ad50f-bf71-470b-90a9-6685ad30a8c8';
         this.state.correctSound.load();
         this.state.winSound.load();
      }
    onDragEnd = result => {
        const { source, destination } = result;
        console.log(result)

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
          this.state.correctSound.play();
            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
            if(this.state.selected.length > 2){
                this.state.winSound.play();
            }
        }
    };

   
    render() {
        const {
            items,
            selected
        } = this.state;
        return (
                <div className="container text-center">
                    <h4 className="text-center border m-1"
                        style={{textTransform:'uppercase',fontFamily:'Londrina Solid'
                            ,backgroundColor:'#d3d3d3',fontSize:'1.23rem',
                            fontWeight:'600' }}>Jigsaw
                        <span style={{float:'right'}}>
                  <button className="btn btn-secondary btn-sm mb-1" style={{borderRadius:'60%'}}>
                    ?
                    </button></span></h4>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="ques-block1">
                            <div >
                                <Droppable droppableId="droppable" >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef} className="row m-0 p-0 justify-content-center" style={{margin: "0 auto"}}>
                                            {items.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>

                                                            <div className="m-0 p-0 justify-content-center row-block1" style={{height: "120px", width: "120px"}}>
                                                            <div className="col-12 m-0 p-0">
                                                            <div style={{border:'thin solid', backgroundPosition:`${item.imgXAxis+'px'}  ${item.imgYAxis+'px'}`, height:'120px',width:'120px',backgroundImage:`url(${this.state.imgUrl})`}}></div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="ques-block1" style={{margin:'0px auto'}}>
                            <div className="justify-content-center p-0 col-12 m-0" style={{backgroundColor:'lightgray',margin:'0 auto'}}>
                                <div>
                                <Droppable droppableId="droppable2">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef} className="row m-0 p-0 justify-content-center" style={{margin: "0 auto"}}>
                                            {selected.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <div className="m-0 p-0 justify-content-center row-block1 border" style={{backgroundColor:'#fff',height: "120px", width: "120px"}}>
                                                                <div className="col-12 m-0 p-0">
                                                                    <div style={{border:'thin solid', backgroundPosition:`${item.imgXAxis+'px'}  ${item.imgYAxis+'px'}`, height:'120px',width:'120px',backgroundImage:`url(${this.state.imgUrl})`}}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                </div>
                            </div>
                        </div>
                    </DragDropContext>
                 </div>
        );
    }
}

export default Home;
