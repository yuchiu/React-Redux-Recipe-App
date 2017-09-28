import React from 'react'
import Dropzone from 'react-dropzone'
import {Grid, Modal} from 'react-bootstrap'

import Header from '../presentations/Header'
import RecipeList from '../presentations/RecipeList'
import AddRecipeModal from '../presentations/AddRecipeModal'

import {connect} from 'react-redux'
import actions from '../../actions'

class Layout extends React.Component {
  componentDidMount(){
    this
      .props
      .fetchRecipeList()
  }

  render() {
    return (
      <Grid>
        <Header recipes = {this.props.recipes} fetchSave ={this.props.fetchSave}/>
        <RecipeList/>

      </Grid>
    )
  }
}

const stateToProps = (state) => {
  return {recipes: state.recipes}
}
const dispatchToProps = (dispatch) => {
  return {
    fetchSave: (newRecipe, length) => {
      dispatch(actions.fetchSave(newRecipe, length))
    },
    fetchRecipeList: () => {
      dispatch(actions.fetchRecipeList())
    }
  }

}

export default connect(stateToProps, dispatchToProps)(Layout);
