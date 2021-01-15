/* eslint-disable import/no-anonymous-default-export */
const initState = {
    images: [
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    ],
    labels: [
      "Test_Label_1"
    ]
}

export default function(state = initState, action) {
    switch (action.type) {
      case 'REPLACE':
        return {
          ...state,
          images: action.payload
        }
      case 'ADD_LABELS':
        return {
          ...state,
          labels: action.payload
        }
      default:
        return state
    }
  }