import constants from '../constants'
import superagent from 'superagent'
import sha1 from 'sha1'
import firebase from 'firebase'
import {
    Base64
} from 'js-base64'

/* API call for uploading picture to cloudinary*/
const cloudName = 'dushlwfma'
const url = "https://api.cloudinary.com/v1_1/" + cloudName + '/image/upload'
const timestamp = Date.now() / 1000
const uploadPreset = 'afzhx4nk'
const API_SECRET = 'FSFPWBxpBKQS5pb_MVjEg6ZvbaQ'
const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + API_SECRET
const signature = sha1(paramsStr)
const params = {
    'api_key': '251617577614387',
    'timestamp': timestamp,
    'upload_preset': uploadPreset,
    'signature': signature
}

/* initialize firebase */

const fbApp = firebase.initializeApp({
    apiKey: "AIzaSyDMqOMvtcfTg-97AF6zLvn-RRXIVGC7Ags",
    authDomain: "real-time-recipe-app.firebaseapp.com",
    databaseURL: "https://real-time-recipe-app.firebaseio.com",
    projectId: "real-time-recipe-app",
    storageBucket: "real-time-recipe-app.appspot.com",
    messagingSenderId: "430390434860"
})
const path = Base64.encode(window.location.href) + '/recipes'

let actions = {
    fetchNewRecipe: (newRecipe) => {
        return (dispatch) => {
            console.log('inside actions, fetchSave, received : ' + JSON.stringify(newRecipe))
            let uploadRequest = superagent.post(url)
            uploadRequest.attach('file', newRecipe.image).field(params).end((err, resp) => {
                if (err) {
                    console.log(err, null)
                    return
                }
                newRecipe.image = resp.body.secure_url
                newRecipe.id = firebase.database().ref().push().key
                fbApp
                    .database()
                    .ref(path)
                    .push(newRecipe)
                dispatch(actions.fetchRecipeList({}))
            })

        }
    },
    fetchRecipeList: () => {
        return (dispatch) => {
            fbApp
                .database()
                .ref(path)
                .on('value', (snapshot) => {

                    let returnArr = [];
                    
                        snapshot.forEach(childSnapshot => {
                            let item = childSnapshot.val(); 
                            item.key = childSnapshot.key;
                            returnArr.push(item);
                        });
                    console.log('inside actions, recipe list updated'+ JSON.stringify(returnArr) )
                    if (returnArr == []) {
                        console.log('data == []')
                        return
                    }
                    dispatch({
                        type: constants.FETCH_RECIPE_LIST,
                        payload: returnArr.reverse()
                    })
                })

        }
    }

}

export default actions