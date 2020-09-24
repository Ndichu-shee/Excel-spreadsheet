import React from 'react'

export default class Cell  extends React.Component{
  constructor(props){
    this.state = {
      editing: false,
      value:props.value,
    }
    this.display = this.determineDisplay(
      {x:props.x, y:props.y},

    )
    this.timer = 0
    this.delay = 200
    this.prevent=false
  }
 componentDidMount(){
   window.documentAddEventListener('unselectAll', this.handleUnselectedAll)
 }
 componentWillUpdate(){
   this.display = this.determineDisplay(
     {x:this.props.x, y:this.props.y},this.state.value)
 }
 componentWillUnmount(){
   window.document.removeEventListener('unselectedAll',this.handleUnselectedAll)
 }
 onChange = (e) => {
   this.setState({ value:e.target.value})
   this.display = this.determineDisplay(
     {x:this.props.x,y: this.props.y}, e.target.value
   )
 }
 onKeyPressOnInput = (e) =>{
   if(e.key === 'Enter'){
     this.hasNewValue(e.target.value)
   }
 }
 onKeyPressOnSpan = ()=>{
   if (!this.state.editing){
     this.setState({editing: true})
   }
 }
 onBlur = (e) =>{
   this.hasNewValue(e.target.hasNewValue)
 }
 handleUnselectAll = () =>{
   if (this.state.selected || this.state.editing){
     this.setState({selected: false,editing: false})
   }
 }
 hasNewValue = (value) =>{
   this.props.onChngedValue(
     {
       x: this.props.x,
       y: this.props.y,
     },
     value,
   )
   this.setState({editing: false})
 }
 emitUnselectAllEvent = () =>{
   const UnselectAllEvent = new Event('unselectAll')
   window.document.dispatchEvent(UnselectAllEvent)

 }
 clicked = () =>{
   this.timer = setTimeout(() => {
     if (!this.prevent){
       this.emitUnselectAllEvent()
       this.setState({selected: true})
     }
     this.prevent = false
   }, this.delay)
   
 }
}