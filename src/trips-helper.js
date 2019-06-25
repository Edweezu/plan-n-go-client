
// export const findTrip = (trips = [], tripId) => {
//     return trips.find(trip => trip.id == tripId)
// }

export const findTrip = (trips=[], tripid) => (
    (!tripid)
      ? trips
      : trips.filter(trip => trip.id == tripid)
  )

export const getUserFromUserName = (users=[], username) => (
    (!username) ? users : users.filter(user => user.username === username)
)

    

   

    

