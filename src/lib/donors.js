// import fs from "node:fs"
import slugify from "slugify"
import xss from "xss"
import cloudinary from "./cloudinaryConfig"
import supabase from "./postgresSql"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function getDonors(name, blooggroup, location) {
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
  donor.slug = slugify(donor.donorName, { lower: true })
  donor.details = xss(donor.donorDetails)

  const extension = donor.donorImage.name.split(".").pop()
  const filename = `${donor.slug}.${extension}`

  // const stream = fs.createWriteStream(`public/images/${filename}`)
  const bufferedImage = await donor.donorImage.arrayBuffer()
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

  donor.donorImage = ImageObj.resources[0].secure_url
  // console.log("This is donor image object: ", ImageObj)
  // console.log("This is donor's image: ", donor.donorImage)

  //await cloudinary.api.resources_by_tag('blood-donation-app')

  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) throw new Error("Saving Image Failed!")
  // })

  // donor.donorImage = `/images/${filename}`

  // donor.donorImage = `${filename}`

  const {
    slug,
    donorName,
    donorImage,
    donorLocation,
    donorBloodgroup,
    donorDetails,
  } = donor

  const session = await getServerSession(options)
  const userID = session?.user?.accessToken

  const { data, error } = await supabase.from("donor").insert([
    {
      userID,
      slug,
      donorName,
      donorImage,
      donorLocation,
      donorBloodgroup,
      donorDetails,
    },
  ])

  if (error) {
    console.log("this is the error", error)
    throw new Error("Failed to add record")
  }

  if (data) {
    console.log("This is submit data:", data)
  }
}
