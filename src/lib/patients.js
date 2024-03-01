import slugify from "slugify"
import xss from "xss"
import cloudinary from "./cloudinaryConfig"
import supabase from "./postgresSql"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function getPatients(name, bloodgroup, location) {
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
  patient.slug = slugify(patient.patientName, { lower: true })
  patient.details = xss(patient.patientDetails)

  const extension = patient.patientImage.name.split(".").pop()
  const filename = `${patient.slug}.${extension}`

  const bufferedImage = await patient.patientImage.arrayBuffer()
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

  patient.patientImage = ImageObj.resources[0].secure_url

  // db.prepare(
  //   `INSERT INTO patient
  // (slug, patientName, patientImage, patientLocation, patientBloodgroup, patientDetails)
  // VALUES(
  //   @slug,
  //   @patientName,
  //   @patientImage,
  //   @patientLocation,
  //   @patientBloodgroup,
  //   @patientDetails
  //   )
  // `
  // ).run(patient)
  const session = await getServerSession(options)
  const userID = session?.user?.accessToken

  const {
    slug,
    patientName,
    patientImage,
    patientLocation,
    patientBloodgroup,
    patientDetails,
  } = patient

  const { data, error } = await supabase.from("patient").insert([
    {
      userID,
      slug,
      patientName,
      patientImage,
      patientLocation,
      patientBloodgroup,
      patientDetails,
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
