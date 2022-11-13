import "./styles.css";

import {Component} from 'react'
import "./styles.css";

const data=[
{
  id:1,
  cat:"React",
  title:"React",
  desc:"React is famous framework created by Facebook"
},
{
  id:2,
  cat:"Javascript",
  title:"Javascript",
  desc:"Java scipt is famous programming language"
},
{
  id:3,
  cat:"Angular",
  title:"Angular",
  desc:"Angular is famous framework created by Google"
}
]
const ProductItem=(props)=>{
const {productDetails}=props
const{cat,desc}=productDetails
return(
  <div>
    <h1>{cat}</h1>
    <p>{desc}</p>
  </div>
)
}
class App extends Component{
  state={product:data,productCopy:[],isfilter:false,
    searchInput:"",searchResults:[],showFilter:true}

  handleBtns=(event)=>{ 
    let products;
    const {product}=this.state
    if(event.target.value==='All'){
      products=product
    }
    else{
      products=product.filter(item=>
        item.cat===event.target.value)
    }
    this.setState({productCopy:products})
  }
getModal=()=>{
  this.setState({isfilter:true})
}
getClosedModal=()=>{
  this.setState({isfilter:false})
}
changeInput=(event)=>{
this.setState({searchInput:event.target.value})
}
filterApply=(event)=>{
  console.log(event.target.value)
  const {product,searchInput}=this.state
    const searchFilters = product.filter(eachUser =>
      eachUser.cat.includes(searchInput)
    )
    this.setState({searchResults:searchFilters,showFilter:false})
}

filterCancel=()=>{
  this.setState({showFilter:true})
  this.setState({searchResults:[]})
  this.setState({searchInput:""})
}
  render(){
    const {showFilter, productCopy,isfilter,searchInput,searchResults}=this.state
    
    return(
      <div>
        <h1>Buttons Filter</h1>
        <button value="All" onClick={this.handleBtns}>All</button>
        <button value="React" onClick={this.handleBtns}>React</button>
        <button value="Javascript" onClick={this.handleBtns}>Javascript</button>
        <button value="Angular" onClick={this.handleBtns}>Angular</button>
        <button onClick={this.getModal}>Filter</button>
        {isfilter && (
          <div className="modal-con">
            <button onClick={this.getClosedModal}>X</button><br/><br/>
            <input type="search" 
            value={searchInput} onChange={this.changeInput}/>
            <button onClick={this.filterApply} value="Apply Filters">Apply</button>
            <button onClick={this.filterCancel}>Cancel</button>
          </div>
        )}
        {showFilter&&
        <ul>
          {productCopy.map(eachProduct=>(
            <ProductItem key={eachProduct.id} 
            productDetails={eachProduct}/>
          ))}
        </ul>
        }
        <ul>
          {searchResults.map(eachProduct=>(
            <ProductItem key={eachProduct.id} 
            productDetails={eachProduct}/>
          ))}
        </ul>
        </div>
    )
  }
}

export default App
