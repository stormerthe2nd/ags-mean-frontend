// change the refresh token from google auth playground to change drive location
const router = require("express").Router()
const fs = require("fs")
const multer = require("multer")
const path = require("path")
const fsExtra = require("fs-extra")
const PostModel = require("../model/postModel")
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      if (!fs.existsSync(path.join(__dirname, "/../temp_uploads/"))) {
        fs.mkdirSync(path.join(__dirname, "/../temp_uploads/"));
      }
      callback(null, path.join(__dirname, "/../temp_uploads/"))
    },
    filename: (req, file, callback) => {
      req.files.push(file[0])
      callback(null, file.originalname)
    }
  })
})

const uploadImage = async function (req, res) {
  imgUrl = []
  var i = 0;
  for (var el of req.files) {
    if (el == undefined) continue
    try {
      i++
      console.log("uploading file " + i)
      var response = await req.drive.files.create({
        requestBody: {
          name: el.originalname,
          mimeType: el.mimetype,
          // parents: ["1TbzAhzKs_beyGlCGh-NSP4v7CBigeDq8"] // folder id in drive
        },
        media: {
          mimeType: el.mimetype,
          body: fs.createReadStream(el.path)
        }
      })
      fileId = response.data.id   // file access
      await req.drive.permissions.create({
        fileId: fileId,
        requestBody: { role: "reader", type: "anyone" }
      })
      imgUrl.push(`https://drive.google.com/thumbnail?id=${fileId}`)
    } catch (err) {
      console.log(err)
      return null
    }
  }
  fsExtra.emptyDir(path.join(__dirname, "/../temp_uploads/"))
  return imgUrl
}

const deleteImage = async function (req, res, imgPath) {
  for (var element of imgPath) {
    if (element == "") continue
    try {
      await req.drive.files.delete({ fileId: element.split("=")[1] })
    } catch (error) {
      console.log(error)
      continue
    }
  };
}

router.post("/upload", upload.array("fileInp", 12), async function (req, res) {
  req.files = req.files.filter(el => { return el !== undefined })
  let imgUrl = await uploadImage(req, res)
  console.log("req body", req.body)
  if (!imgUrl) return res.json({ msg: "some error occured" })
  imgUrl.concat(req.body.linkInp)
  imgUrl = imgUrl.filter((el) => { return el != "" })
  var post = await new PostModel({
    sno: 1,
    imgPath: imgUrl,
    des: req.body.desInp,
    title: req.body.titleInp,
    price: req.body.priceInp,
    active: true,
    category: req.body.categoryInp
  })
  console.log(post)
  post.save()
  res.json({ post: post })
})

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params
  var post = await PostModel.findOne({ _id: id })
  console.log(post)
  await deleteImage(req, res, post.imgPath)
  await PostModel.deleteOne({ _id: id })
  res.status(200).json({ deleted: true })
})

router.put("/update/:id", upload.array("imgToAdd", 12), async (req, res) => {
  const { id } = req.params
  const { links, imgToDel, desInp, titleInp, priceInp, categoryInp } = req.body
  console.log("req body", req.body)
  console.log(req.files.length)
  if (req.files.length > 0) var imgUrl = await uploadImage(req, res)
  if (imgToDel) await deleteImage(req, res, imgToDel)
  res.json(req.body)
})

module.exports = router