// import fs from "node:fs"
import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"
import cloudinary from "./cloudinaryConfig"
import supabase from "./postgresSql"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

const db = sql("donor.db")

export async function getDonors() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { data, error } = await supabase.from("donor").select()

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch Donors")
  }

  if (data) {
    return data
  }
}

export async function slugGetDonor(slug) {
  const { data, error } = await supabase.from("donor").select().eq("slug", slug)

  if (error) {
    console.log(error)
    throw new Error("Failed to Fetch Donors")
  }

  if (data) {
    return data[0]
  }
}

/******* Saving Donors Info in DB and Image in Cloudinary *******/
export async function saveDonor(donor) {
  donor.slug = slugify(donor.donor_name, { lower: true })
  donor.details = xss(donor.donor_details)

  const extension = donor.donor_image.name.split(".").pop()
  const filename = `${donor.slug}.${extension}`

  // const stream = fs.createWriteStream(`public/images/${filename}`)
  const bufferedImage = await donor.donor_image.arrayBuffer()
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

  donor.donor_image = ImageObj.resources[0].secure_url
  // console.log("This is donor image object: ", ImageObj)
  // console.log("This is donor's image: ", donor.donor_image)

  //await cloudinary.api.resources_by_tag('blood-donation-app')

  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) throw new Error("Saving Image Failed!")
  // })

  // donor.donor_image = `/images/${filename}`

  // donor.donor_image = `${filename}`

  // db.prepare(
  //   `INSERT INTO donor
  // (slug, donor_name, donor_image, donor_location, donor_bloodgroup, donor_details)
  // VALUES(
  //   @slug,
  //   @donor_name,
  //   @donor_image,
  //   @donor_location,
  //   @donor_bloodgroup,
  //   @donor_details
  //   )
  // `
  // ).run(donor)

  const {
    slug,
    donor_name,
    donor_image,
    donor_location,
    donor_bloodgroup,
    donor_details,
  } = donor

  const session = await getServerSession(options)
  const user_id = session?.user?.accessToken

  const { data, error } = await supabase.from("donor").insert([
    {
      slug,
      user_id,
      donor_name,
      donor_image,
      donor_location,
      donor_bloodgroup,
      donor_details,
    },
  ])

  if (error) {
    throw new Error("Failed to add record")
  }

  if (data) {
    console.log("This is submit data:", data)
  }
}
