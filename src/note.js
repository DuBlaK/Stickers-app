import React from "react";

export	default class Note extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userText: this.props.text,
			display: true,
			posX: this.props.posX,
			posY: this.props.posY,
			deltaX: null,
			deltaY: null,
		};
		this.getText = this.getText.bind(this);
		this.changeDisplay = this.changeDisplay.bind(this);
		this.trackMouse = this.trackMouse.bind(this);
		this.startMove = this.startMove.bind(this);
		this.endMove = this.endMove.bind(this);
	}

	getText(e){
		this.setState({userText: e.target.value});
	}

	changeDisplay(){
		this.setState({display: !this.state.display}, () => {
			this.props.editNote(this.props.itemIndex, this.state.userText);
		});
	}

	trackMouse(e){
		this.setState({
			posX: e.pageX - this.state.deltaX,
			posY: e.pageY - this.state.deltaY,
		});
	}

	startMove(e){
		this.setState({
			deltaX: e.pageX - this.state.posX,
			deltaY: e.pageY - this.state.posY,
		});
		window.addEventListener("mousemove", this.trackMouse);
	}

	endMove(){
		window.removeEventListener("mousemove", this.trackMouse);
		this.props.updatePos(this.props.itemIndex, this.state.posX, this.state.posY);
	}

	render(){
		return (
				<div 
					className="note"
					onMouseDown={this.startMove}
					onMouseUp={this.endMove}
					style={{top: this.state.posY, left: this.state.posX}}
				>
					<div
						onDoubleClick={this.changeDisplay}
						style={ {display: this.state.display ? "block" : "none"}}
					>
						{this.state.userText}
					</div>
					<textarea
						value={this.state.userText}
						onDoubleClick={this.changeDisplay}
						style={ {display: this.state.display ? "none" : "block"}}
						onChange={this.getText}
					>
					</textarea>
				</div>
			)
	}
}