import React from 'react';
import ReactDOM from 'react-dom';
import propsType from 'prop-types'
import './css/font-awesome.css'
import './css/bootstrap4.css'
import './style.css';
import * as serviceWorker from './serviceWorker';
import audio from './beep.mp3'


class TodoAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			time: ''
		}
		this.addElement = this.props.addElement;
		this.add = this.add.bind(this);
	}

	add() {
		if ((/^[0-9]{1,2}:[0-9]{1,2}$/.test(this.state.time) || /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/.test(this.state.time)) && this.state.name !== "" && this.state.name.time !== "") {
			let time = this.state.time;
			if(/^[0-9]{1,2}:[0-9]{1,2}$/.test(this.state.time)) 
				time = '00:' + time 
			this.addElement({name: this.state.name, timeBegin: time, timeLeft: time })
			this.setState({name: "", time: ''})
		}
	}


	render() {
		return (
			<div className="add-section">
				<input className="input-work" 
						type='text'
						placeholder='write your job...'
						value={this.state.name}
						onChange={r => {
							const v = r.target.value;
							this.setState({name: v})
						}} />
				<input className="input-work" 
						type='text'
						step="1"
						placeholder='02:30:10'
						value={this.state.time}
						onChange={e => {
							const v = e.target.value;
							this.setState({
								time: v
							})
						}} />
				<button className="add-button btn btn-primary" onClick={this.add}>Add</button>
			</div>
		)
	}
}
 
class TodoAddList extends React.Component{
	constructor(props) {
		super(props);
		this.startWork=  this.props.startWork;
		this.stopWork=  this.props.stopWork;
		this.removeWork=  this.props.removeWork;
	}

	static defaultProps = () => {
		return ({startWork: []})
	}

	static propsType = () => {
		return {startWork: propsType.arrayOf(
			propsType.shape({
				name: propsType.string.isRequired,
				timeBegin: propsType.string.isRequired,
				timeLeft: propsType.string.isRequired,
			})
		)}
	}

	render() {
		this.myList = this.props.myList		
		return (
			<div>
			<div className="todo-list">
				{this.myList !== null && this.myList.length !== 0 && this.myList.map((el,i) => {
					const color = ((this.props.color === 1) && i === this.props.id) ? 'red': '';
					if (el.timeLeft !== "00:00:00")
					return (
					<div className="job" key={i} >
						<h3 className="job-name">{el.name}</h3>
						<h5 className="job-option">Time expected: {el.timeBegin}</h5>
						<h5 className="job-option">Time left: {el.timeLeft}</h5>
						{this.props.id !== i && <span className="start" id={i} onClick={e => {
							const id = e.target.getAttribute('id');
							this.startWork(id);
						}}> <i className="fas fa-play"></i> Start </span>}
						{this.props.id === i && <span className="start" id={i}
							style={{backgroundColor: color}}
							onClick={e => {
							this.stopWork()
						}}> <i className="fas fa-stop"></i>Stop </span>}
						<span className="remove" id={i} onClick={e => {
							const id = e.target.getAttribute('id');
							this.removeWork(id);
						}}> <i className="fas fa-trash"></i> Remove </span>	
					</div>
				)
				})}
				
			</div>
				<h5 className="archived">Archived</h5>
				<div className="todo-list">
				{this.myList !== null && this.myList.length !== 0 && this.myList.map((el,i) => {
					const color = ((this.props.color === 1) && i === this.props.id) ? 'red': '';
					if (el.timeLeft === "00:00:00")
					return (
					<div className="job" key={i} >
						<h3 className="job-name">{el.name}</h3>
						<h5 className="job-option">Time expected: {el.timeBegin}</h5>
						<h5 className="job-option">Time left: {el.timeLeft}</h5>	
					</div>)})}
			</div>
			</div>
		)
	}
}

const Show = ({name, time}) => (<div className="job-info">
	<h2 className="job-name">job name: {name}</h2>
	<h1 className="job-time">{time}</h1>
</div>)

class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alter: false
		}
		this.myList = JSON.parse( window.localStorage.getItem("todo-list") );
		this.myList = this.myList === null ? [] : this.myList;
		this.addElement = this.addElement.bind(this);
		this.startWork = this.startWork.bind(this);
		this.stopWork = this.stopWork.bind(this);
		this.playSound = this.playSound.bind(this);
		this.removeWork = this.removeWork	.bind(this);
		this.id = -1;
		this.selected = false;
		this.interval = -1;
		this.color = -1;
		this.beep = new Audio();
		this.beep.src = audio;
		this.beep.loop = true;
		window.addEventListener("dblclick", () => {this.beep.loop = false;})
	}

	addElement(el) {
		let l = el.timeBegin.split(':');
		l = l.map(e => this.reformate(parseInt(e)));
		l = l.join(':');
		el.timeBegin = l;
		el.timeLeft = l;
		this.myList = [...this.myList, el];
		this.setState({ alter: !this.state.alter });
		window.localStorage.setItem('todo-list', JSON.stringify(this.myList))
	}

	startWork(id) {
		clearInterval(this.interval);
		this.id = parseInt(id);
		this.selected = true;
		const element = this.myList[id];
		this.finished = false;
		if (element !== undefined) {
			let time = element.timeLeft.split(':');
			let realTime = parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
			if (realTime > 0)
			 this.interval =  setInterval(() => {
				realTime--;
				const HH = Math.floor(realTime/3600);
				const MM = Math.floor((realTime - HH*3600) / 60);
				const SS = realTime - HH * 3600 - MM * 60;
				const time = this.reformate( HH ) +':'+this.reformate(MM)+':'+this.reformate(SS);
				this.color *= -1;
				this.myList[this.id].timeLeft = time;
				window.localStorage.setItem('todo-list', JSON.stringify(this.myList));
				if (realTime === 0) {
					clearInterval(this.interval);
					this.finished = true;
					this.selected = false;
					this.id = -1;
					this.playSound();
				}
				this.setState({
					alert: !this.state.alter
				});
			}, 1000)
		}
	}

	playSound() {
		if (this.finished) {
			this.beep.play();
		}
	}
	reformate(f) {
		if (f >= 0 && f <= 9)
		return '0'+f
		return f
	}

	removeWork(id) {
		if (id !== null && this.myList[id] !== undefined) {
			clearInterval(this.interval);
			this.myList = this.myList.filter((el, i) => i !== parseInt(id));
			this.setState({alert: !this.state.alter})
		}
	}

	stopWork() {
		if (this.id !== -1) {
			this.selected = false;
			clearInterval(this.interval);
			this.id = -1;
			this.setState({alert: !this.state.alter})
		}
	}

	render() {
		return (
			<div>
			<TodoAdd addElement={this.addElement} />
			{this.selected && 	<Show name={this.myList[this.id].name}
									time={this.myList[this.id].timeLeft} />}
			<TodoAddList myList={this.myList}
							startWork={this.startWork}
							stopWork={this.stopWork}
							removeWork={this.removeWork}
							color={this.color}
							id={this.id}/>
			</div>
		)
	}
}
ReactDOM.render(
	<React.StrictMode>
		<Container />
	</React.StrictMode>
	,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
