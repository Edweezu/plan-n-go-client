export default [
    {
        id: 1,
        name: 'Los Angeles',
        flights: [
            {
                id: 1,
                airline: 'United',
                flight_num:  123,
                depart_date: "2019-06-20",
                depart_time: "07:00",
                arrival_date: "2019-06-22",
                arrival_time: "10:00",
                unix_time: 1559319300,
                seats: '46A'
            }
        ],
        destinations: [
            {
                id: 1,
                name: 'Disneyland',
                date: '2019-06-21',
                Address: '1313 Disneyland Dr, Anaheim, CA 92802',
                notes: 'Arrive early.'
            }
        ],
        list: [
            {
                id: 1,
                name: 'toothpaste'
            }
        ]
    },
    {
        id: 2,
        name: 'San Francisco',
        flights: [
            {
                id: 1,
                airline: 'Southwest',
                flight_num:  234,
                depart_date: "2019-07-20",
                depart_time: "08:00",
                seats: '13A'
            }
        ],
        destinations: [
            {
                id: 1,
                name: 'Golden Gate Bridge',
                date: '2019-07-21',
                Address: 'Golden Gate Bridge, San Francisco, CA',
                notes: 'Bring a jacket.'
            }
        ],
        list: [
            {
                id: 1,
                name: 'jacket'
            }
        ]
    },
]