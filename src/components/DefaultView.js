import React from 'react'
import { connect } from 'react-redux'
import { loadCategoriesRequest } from '../actions'

function DefaultView (props) {
  const {categories} = props
  return (
    <div>
        {console.log('categories', categories)}

{
  categories!=null && ('category' in categories) ?
  <div>
    {categories.forEach(category => {
          <div> 
            {category.name}
          </div>
      }
    )} 
    </div>
  :
  <div/>

}
    </div>
  )
}

function mapStateToProps ({categories}) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategoriesRequest: dispatch(loadCategoriesRequest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultView)