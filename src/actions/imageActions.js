export const replaceImages = (images) => {
    return {
        type: "REPLACE",
        images: images
    }
}

export const fetchImages = query => dispatch => {
    console.log("fetch called")
    const ENDPOINT = "https://te10ynt1ma.execute-api.us-west-1.amazonaws.com/prod/images/search?q=" + query.toUpperCase()
    const options = {
        method: "GET"
    }
    fetch(ENDPOINT, options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        dispatch({
            type: "REPLACE",
            payload: data
        })
    })
    .catch(err => console.log(err))
}

export const fetchLabels = query => dispatch => {
    console.log(query)
    console.log("Fetching labels...");
    const ENDPOINT = "https://te10ynt1ma.execute-api.us-west-1.amazonaws.com/prod/labels"
    const options = {
        method: "GET"
    }
    fetch(ENDPOINT, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        dispatch({
            type: "ADD_LABELS",
            payload: data.labels
        })
    })
}