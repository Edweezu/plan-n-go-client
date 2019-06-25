import TokenService from './token-service'
import config from '../config'

const TripApiService = {
    getTrips() {
        return fetch(`${config.API_ENDPOINT}/trips`, {
            headers:{
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
            }
        )
    },
}

export default TripApiService