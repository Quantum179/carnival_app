import { v4 as uuid4} from 'uuid'
import { Parade, Group, City, TypeGroup, Circuit } from './models'
import { getID } from './index'

let typegroups, cities

export const seed2 = () => {
  setTimeout(() => {
    Promise.all([
      TypeGroup._getMany({}),
      City._getMany({})
    ])
      .then(results => {
        typegroups = results[0]
        cities = results[1]
  
        let group1 = new Group({
          "uuid": uuid4(),
          "name": "Akiyo",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupes à peaux'),
          "city": getID(cities, 'name', 'Pointe-à-Pitre')
        })
      
        let group2 = new Group({
          "uuid": uuid4(),
          "name": "Mas Ka Klé",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupes à peaux'),
          "city": getID(cities, 'name', 'Pointe-à-Pitre')
        })
      
        let group3 = new Group({
          "uuid": uuid4(),
          "name": "Matamba",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupe à orchestre'),
          "city": getID(cities, 'name', 'Pointe-à-Pitre')
        })
      
        let group4 = new Group({
          "uuid": uuid4(),
          "name": "Genmbo All Stars",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupe à orchestre'),
          "city": getID(cities, 'name', 'Pointe-à-Pitre')
        })
      
        let group5 = new Group({
          "uuid": uuid4(),
          "name": "VIM",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupes à caisses claires'),
          "city": getID(cities, 'name', 'Pointe-à-Pitre')
        })
      
        let group6 = new Group({
          "uuid": uuid4(),
          "name": "Double Face",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupes à caisses claires'),
          "city": getID(cities, 'name', 'Pointe-à-Pitre')
        })
      
        let group7 = new Group({
          "uuid": uuid4(),
          "name": "Mas Moul Masif",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupes à mas'),
          "city": getID(cities, 'name', 'Moule')
        })
      
        let group8 = new Group({
          "uuid": uuid4(),
          "name": "Atafaya",
          "position": {lat: 16.242359, lng: -61.534862},
          "typeGroup": getID(typegroups, 'name', 'Groupes à mas'),
          "city": getID(cities, 'name', 'Pointe-à-Pitre')
        })

        Group._create([group1, group2, group3, group4, group5, group6, group7, group8])
  
        let parade1 = new Parade({
          "uuid": uuid4(),
          "name": "Gozyéval",
          "city": getID(cities, 'name', 'Gosier'),
          "position": { lat: 16.206252, lng: -61.492722 },
          "startDate": new Date('2020-02-01T10:20:30Z'),
          "endDate": new Date('2020-02-01T22:20:30Z'),
          "themes": ["Rouge", "Matériaux de récupération"],
          "groups": [],
          "circuits": [
            new Circuit({
              "uuid": uuid4(),
              "positions": [{lat: 16.216225, lng: -61.503600}, {lat: 16.215929, lng:  -61.503386}, {lat: 16.215478, lng: -61.502732}]
            })
          ],
          "comments": []
        })
      
        let parade2 = new Parade({
          "uuid": uuid4(),
          "name": "Carnaval des Abymes",
          "city": getID(cities, 'name', 'Les Abymes'),
          "position": { lat: 16.271017, lng: -61.505152 },
          "startDate": new Date('2020-02-01T10:20:30Z'),
          "endDate": new Date('2020-02-01T22:20:30Z'),
          "themes": ["Rouge", "Matériaux de récupération"],
          "groups": [],
          "circuits": [
            new Circuit({
              "uuid": uuid4(),
              "positions": [{lat: 16.216225, lng: -61.503600}, {lat: 16.215929, lng:  -61.503386}, {lat: 16.215478, lng: -61.502732}]
            })
          ],
          "comments": []
        })
      
        let parade3 = new Parade({
          "uuid": uuid4(),
          "name": "Carnaval de Pointe-à-Pitre",
          "city": getID(cities, 'name', 'Pointe-à-Pitre'),
          "position": { lat: 16.242359, lng: -61.534862 },
          "startDate": new Date('2020-02-01T10:20:30Z'),
          "endDate": new Date('2020-02-01T22:20:30Z'),
          "themes": ["Rouge", "Matériaux de récupération"],
          "groups": [],
          "circuits": [
            new Circuit({
              "uuid": uuid4(),
              "positions": [{lat: 16.216225, lng: -61.503600}, {lat: 16.215929, lng:  -61.503386}, {lat: 16.215478, lng: -61.502732}]
            })
          ],
          "comments": []
        })
      
        let parade4 = new Parade({
          "uuid": uuid4(),
          "name": "Carnaval de Saint-François",
          "city": getID(cities, 'name', 'Saint-François'),
          "position": { lat: 16.251296, lng: -61.278803 },
          "startDate": new Date('2020-02-01T10:20:30Z'),
          "endDate": new Date('2020-02-01T22:20:30Z'),
          "themes": ["Rouge", "Matériaux de récupération"],
          "groups": [],
          "circuits": [
            new Circuit({
              "uuid": uuid4(),
              "positions": [{lat: 16.216225, lng: -61.503600}, {lat: 16.215929, lng:  -61.503386}, {lat: 16.215478, lng: -61.502732}]
            })
          ],
          "comments": []
        })
      
        let parade5 = new Parade({
          "uuid": uuid4(),
          "name": "Carnaval de Sainte-Rose",
          "city": getID(cities, 'name', 'Sainte-Rose'),
          "position": { lat: 16.330069, lng: -61.702960 },
          "startDate": new Date('2020-02-01T10:20:30Z'),
          "endDate": new Date('2020-02-01T22:20:30Z'),
          "themes": ["Rouge", "Matériaux de récupération"],
          "groups": [],
          "circuits": [
            new Circuit({
              "uuid": uuid4(),
              "positions": [{lat: 16.216225, lng: -61.503600}, {lat: 16.215929, lng:  -61.503386}, {lat: 16.215478, lng: -61.502732}]
            })
          ],
          "comments": []
        })
      
        let parade6 = new Parade({
          "uuid": uuid4(),
          "name": "Carnaval de Baie-Mahault",
          "city": getID(cities, 'name', 'Baie-Mahault'),
          "position": { lat: 16.267833, lng: -61.587241 },
          "startDate": new Date('2020-02-01T10:20:30Z'),
          "endDate": new Date('2020-02-01T22:20:30Z'),
          "themes": ["Rouge", "Matériaux de récupération"],
          "groups": [],
          "circuits": [
            new Circuit({
              "uuid": uuid4(),
              "positions": [{lat: 16.216225, lng: -61.503600}, {lat: 16.215929, lng:  -61.503386}, {lat: 16.215478, lng: -61.502732}]
            })
          ],
          "comments": []
        })
      
        let parade7 = new Parade({
          "uuid": uuid4(),
          "name": "Carnaval de Basse-Terre",
          "city": getID(cities, 'name', 'Basse Terre'),
          "position": { lat: 15.997124, lng: -61.732159 },
          "startDate": new Date('2020-02-01T10:20:30Z'),
          "endDate": new Date('2020-02-01T22:20:30Z'),
          "themes": ["Rouge", "Matériaux de récupération"],
          "groups": [],
          "circuits": [
            new Circuit({
              "uuid": uuid4(),
              "positions": [{lat: 16.216225, lng: -61.503600}, {lat: 16.215929, lng:  -61.503386}, {lat: 16.215478, lng: -61.502732}]
            })
          ],
          "comments": []
        })
      
        Parade._create([parade1, parade2, parade3, parade4, parade5, parade6, parade7])

        console.log('seed 2 finished')
      })
  }, 10000)
}