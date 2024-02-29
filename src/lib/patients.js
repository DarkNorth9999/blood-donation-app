import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"
import cloudinary from "./cloudinaryConfig"
import supabase from "./postgresSql"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

const db = sql("patient.db")

export async function getPatients() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { data, error } = await supabase.from("patient").select()

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch Patients")
  }

  if (data) {
    return data
  }
}

export async function slugGetPatient(slug) {
  const { data, error } = await supabase
    .from("patient")
    .select()
    .eq("slug", slug)

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch Patients")
  }

  if (data) {
    return data[0]
  }
}

/******* Saving Patient Info in DB and Image in Cloudinary *******/
export async function savePatient(patient) {
  patient.slug = slugify(patient.patient_name, { lower: true })
  patient.details = xss(patient.patient_details)

  const extension = patient.patient_image.name.split(".").pop()
  const filename = `${patient.slug}.${extension}`

  const bufferedImage = await patient.patient_image.arrayBuffer()
  const buffer = new Uint8Array(bufferedImage)

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: `${filename}`,
        },
        (error, result) => {
          if (error) {
            reject(error)
            return
          }
          resolve(result)
        }
      )
      .end(buffer)
  })

  const ImageObj = await cloudinary.api.resources_by_tag(`${filename}`, {
    context: true,
  })

  patient.patient_image = ImageObj.resources[0].secure_url

  // db.prepare(
  //   `INSERT INTO patient
  // (slug, patient_name, patient_image, patient_location, patient_bloodgroup, patient_details)
  // VALUES(
  //   @slug,
  //   @patient_name,
  //   @patient_image,
  //   @patient_location,
  //   @patient_bloodgroup,
  //   @patient_details
  //   )
  // `
  // ).run(patient)
  const session = await getServerSession(options)
  const user_id = session?.user?.accessToken

  const {
    slug,
    patient_name,
    patient_image,
    patient_location,
    patient_bloodgroup,
    patient_details,
  } = patient

  const { data, error } = await supabase.from("patient").insert([
    {
      user_id,
      slug,
      patient_name,
      patient_image,
      patient_location,
      patient_bloodgroup,
      patient_details,
    },
  ])

  if (error) {
    console.log("it is this", error)
    throw new Error("Failed to add record")
  }

  if (data) {
    console.log("This is submit data:", data)
  }
}
