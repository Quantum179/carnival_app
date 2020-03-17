import { v4 as uuid4} from 'uuid'
import { User, TypeGroup, City, Circuit } from './models'

export const seed1 = () => {

  let user = new User({
    "uuid": uuid4(),
    "name": "Quantum",
    "roles": ["Admin"],
    "email": "testmail@gmail.com",
    "password": "testpass"
  })

  let user2 = new User({
    "uuid": uuid4(),
    "name": "FanAkiyo",
    "email": "testmail@gmail.com",
    "password": "testpass"
  })

  let user3 = new User({
    "uuid": uuid4(),
    "name": "FanCaisseClaires",
    "email": "testmail@gmail.com",
    "password": "testpass"
  })

  let user4 = new User({
    "uuid": uuid4(),
    "name": "FanAYoTout",
    "email": "testmail@gmail.com",
    "password": "testpass"
  })

  let user5 = new User({
    "uuid": uuid4(),
    "name": "Touriste",
    "email": "testmail@gmail.com",
    "password": "testpass"
  })

  let user6 = new User({
    "uuid": uuid4(),
    "name": "FanLambda",
    "email": "testmail@gmail.com",
    "password": "testpass"
  })

  User._create([user, user2, user3, user4, user5, user6])

  let tg1 = new TypeGroup({
    uuid: uuid4(),
    name: "Groupes à caisses claires"
  })

  let tg2 = new TypeGroup({
    uuid: uuid4(),
    name: "Groupes à peaux"
  })

  let tg3 = new TypeGroup({
    uuid: uuid4(),
    name: "Groupes à mas"
  })

  let tg4 = new TypeGroup({
    uuid: uuid4(),
    name: "Groupe à orchestre"
  })

  TypeGroup._create([tg1, tg2, tg3, tg4])

  let city1 = new City({
    uuid: uuid4(),
    name: "Pointe-à-Pitre"
  })

  let city2 = new City({
    uuid: uuid4(),
    name: "Gosier"
  })

  let city3 = new City({
    uuid: uuid4(),
    name: "Basse Terre"
  })

  let city4 = new City({
    uuid: uuid4(),
    name: "Les Abymes"
  })

  let city5 = new City({
    uuid: uuid4(),
    name: "Baie-Mahault"
  })

  let city6 = new City({
    uuid: uuid4(),
    name: "Sainte-Rose"
  })

  let city7 = new City({
    uuid: uuid4(),
    name: "Moule"
  })

  let city8 = new City({
    uuid: uuid4(),
    name: "Saint-François"
  })

  City._create([city1, city2, city3, city4, city5, city6, city7, city8])

  console.log('seed 1 finished')
}

