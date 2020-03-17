import { v4 as uuid4} from 'uuid'
import { Vote, Group, Parade, User } from './models'
import { getID } from './index'

let users, parades, groups

export const seed3 = () => {
  setTimeout(() => {
    Promise.all([
      User._getMany({}, {}),
      Parade._getMany({}, {}),
      Group._getMany({}, {})
    ])
      .then(results => {
        users = results[0]
        parades = results[1]
        groups = results[2]

        let vote = new Vote({
          uuid: uuid4(),
          user: getID(users, 'name', 'Quantum'),
          parade: getID(parades, 'name', 'Carnaval de Pointe-à-Pitre'),
          group: getID(groups, 'name', 'Akiyo'),
          colorHarmony: 13,
          costumes: 17,
          ambiance: 10,
          movements: 10,
          originality: 15
        })
      
        let vote2 = new Vote({
          uuid: uuid4(),
          user: getID(users, 'name', 'Quantum'),
          parade: getID(parades, 'name', 'Carnaval de Pointe-à-Pitre'),
          group: getID(groups, 'name', 'Double Face'),
          colorHarmony: 7,
          costumes: 10,
          ambiance: 6,
          movements: 13,
          originality: 11
        })
      
        let vote3 = new Vote({
          uuid: uuid4(),
          user: getID(users, 'name', 'Quantum'),
          parade: getID(parades, 'name', 'Carnaval de Pointe-à-Pitre'),
          group: getID(groups, 'name', 'Atafaya'),
          colorHarmony: 10,
          costumes: 17,
          ambiance: 12,
          movements: 10,
          originality: 15
        })
      
        let vote4 = new Vote({
          uuid: uuid4(),
          user: getID(users, 'name', 'FanAkiyo'),
          parade: getID(parades, 'name', 'Carnaval de Pointe-à-Pitre'),
          group: getID(groups, 'name', 'Akiyo'),
          colorHarmony: 13,
          costumes: 17,
          ambiance: 10,
          movements: 10,
          originality: 15
        })
      
        let vote5 = new Vote({
          uuid: uuid4(),
          user: getID(users, 'name', 'FanAkiyo'),
          parade: getID(parades, 'name', 'Carnaval de Pointe-à-Pitre'),
          group: getID(groups, 'name', 'Atafaya'),
          colorHarmony: 13,
          costumes: 17,
          ambiance: 10,
          movements: 10,
          originality: 15
        })
      
        let vote6 = new Vote({
          uuid: uuid4(),
          user: getID(users, 'name', 'FanAkiyo'),
          parade: getID(parades, 'name', 'Carnaval de Pointe-à-Pitre'),
          group: getID(groups, 'name', 'Double Face'),
          colorHarmony: 13,
          costumes: 17,
          ambiance: 10,
          movements: 10,
          originality: 15
        })
      
        // let vote7 = new Vote({
        //   uuid: uuid4(),
        //   user: "5e6bf09d325fd62058dc0235",
        //   parade: "5e6bf1c001c8a406b49655a5",
        //   group: "5e6bf1c001c8a406b496559b",
        //   colorHarmony: 13,
        //   costumes: 17,
        //   ambiance: 10,
        //   movements: 10,
        //   originality: 15
        // })
      
        // let vote8 = new Vote({
        //   uuid: uuid4(),
        //   user: "5e6bf09d325fd62058dc0235",
        //   parade: "5e6bf1c001c8a406b49655a4",
        //   group: "5e6bf1c001c8a406b49655a0",
        //   colorHarmony: 13,
        //   costumes: 17,
        //   ambiance: 10,
        //   movements: 10,
        //   originality: 15
        // })
      
        // let vote9 = new Vote({
        //   uuid: uuid4(),
        //   user: "5e6bf09d325fd62058dc0235",
        //   parade: "5e6bf1c001c8a406b49655a6",
        //   group: "5e6bf1c001c8a406b49655a1",
        //   colorHarmony: 13,
        //   costumes: 17,
        //   ambiance: 10,
        //   movements: 10,
        //   originality: 15
        // })
      
        Vote.create([vote, vote2, vote3, vote4, vote5, vote6])

        console.log('seed 3 finished')
      })
  }, 20000)
}