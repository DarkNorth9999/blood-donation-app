const sql = require("better-sqlite3")

/************** Patient Section ************/

const db = sql("patient.db")

const dummyPatients = [
  {
    slug: "dev-gupta",
    patient_name: "Dev Gupta",
    patient_image: "/images/dev-gupta.png",
    patient_location: "Agra",
    patient_bloodgroup: `O+`,
    patient_details: `
        Needs blood due to fever
      `,
  },
  {
    slug: "archit-gupta",
    patient_name: "Archit Gupta",
    patient_image: "/images/archit-gupta.png",
    patient_location: "Haridwar",
    patient_bloodgroup: `AB+`,
    patient_details: `
        Needs blood due to fever
      `,
  },
]

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS patient (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       patient_name TEXT NOT NULL,
       patient_image TEXT NOT NULL,
       patient_location TEXT NOT NULL,
       patient_bloodgroup TEXT NOT NULL,
       patient_details TEXT NOT NULL
    )
`
).run()

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO patient VALUES (
         null,
         @slug,
         @patient_name,
         @patient_image,
         @patient_location,
         @patient_bloodgroup,
         @patient_details
      )
   `)

  for (const patient of dummyPatients) {
    stmt.run(patient)
  }
}

async function deleteTable() {
  const stmt = db.prepare(`
      DROP TABLE patient
   `)

  stmt.run()
}

initData()
// deleteTable()

/************** Donor Section ************/

const DonorDB = sql("donor.db")

const dummyDonor = [
  {
    slug: "dheeraj-gupta",
    donor_name: "Dheeraj Gupta",
    donor_image: "/images/dheeraj-gupta.png",
    donor_location: "Faridabad",
    donor_bloodgroup: `B+`,
    donor_details: `
        Always ready to help children who need blood
      `,
  },
  {
    slug: "surya",
    donor_name: "Surya",
    donor_image: "/images/surya.png",
    donor_location: "Andra",
    donor_bloodgroup: `B+`,
    donor_details: `
        Donates blood to those who like south indian food only
      `,
  },
]

DonorDB.prepare(
  `
   CREATE TABLE IF NOT EXISTS donor (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       donor_name TEXT NOT NULL,
       donor_image TEXT NOT NULL,
       donor_location TEXT NOT NULL,
       donor_bloodgroup TEXT NOT NULL,
       donor_details TEXT NOT NULL
    )
`
).run()

async function initDataDonor() {
  const Donorstmt = DonorDB.prepare(`
      INSERT INTO donor VALUES (
         null,
         @slug,
         @donor_name,
         @donor_image,
         @donor_location,
         @donor_bloodgroup,
         @donor_details
      )
   `)

  for (const donor of dummyDonor) {
    Donorstmt.run(donor)
  }
}

async function deleteTableDonor() {
  const Donorstmt = DonorDB.prepare(`
      DROP TABLE donor
   `)

  Donorstmt.run()
}

initDataDonor()
// deleteTableDonor()
