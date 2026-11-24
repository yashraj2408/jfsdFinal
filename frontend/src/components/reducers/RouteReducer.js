export default function RouteReducer(state = "Signin", action) {
    switch(action.type) {
        case "page":
            return action.data;
        default:
            return state;
    }
}
