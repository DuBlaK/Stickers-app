import React from "react";
import Note from "./note";


class Board extends React.Component {
	constructor(){
		super();
		this.state = {
			arrNotes: [],
		};
		this.addNote = this.addNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.updatePos = this.updatePos.bind(this);
	}

	addNote(){
		let obj = {
			text: "Hi there",
			posX: 10,
			posY: 10,
		}
		let arrCopy = [...this.state.arrNotes];
		arrCopy.push(obj);
		this.setState({arrNotes: arrCopy});
	}

	editNote(index, newText){
		let arrCopy = [...this.state.arrNotes];
		arrCopy[index].text = newText;
		this.setState({arrNotes: arrCopy});
	}

	updatePos(index, posX, posY){
		let arrCopy = [...this.state.arrNotes];
		arrCopy[index].posX = posX;
		arrCopy[index].posY = posY;
		this.setState({arrNotes: arrCopy});
	}

	render() {
		let allNotes = this.state.arrNotes.map( (note, index) => (
				<Note
					editNote={this.editNote}
					itemIndex={index}
					text={note.text} 
					key={index}
					posX={note.posX}
					posY={note.posY}
					updatePos={this.updatePos}
				/>));
		return(
			<div className="board">
				{allNotes}
				<button
					onClick={this.addNote} 
					className="newnote">
				+
				</button>
			</div>
			)
	}
}


export default Board;