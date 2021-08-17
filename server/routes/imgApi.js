// change the refresh token from google auth playground to change drive location
const router = require("express").Router()
const fs = require("fs")
const multer = require("multer")
const path = require("path")
const fsExtra = require("fs-extra")
const PostModel = require("../model/postModel")
const { __await } = require("tslib")
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

router.post("/upload", upload.array("fileInp", 12), async function (req, res) {
  req.files = req.files.filter(el => { return el !== undefined })
  console.log(req.body)
  imgUrl = []
  var i = 0;
  for (var el of req.files) {
    try {
      i++
      console.log("uploading file " + i)
      var response = await req.drive.files.create({
        requestBody: {
          name: el.originalname,
          mimeType: el.mimetype,
          parents: ["1TbzAhzKs_beyGlCGh-NSP4v7CBigeDq8"] // folder id in drive
        },
        media: {
          mimeType: el.mimetype,
          body: fs.createReadStream(el.path)
        }
      })
      fileId = response.data.id
      await req.drive.permissions.create({
        fileId: fileId,
        requestBody: { role: "reader", type: "anyone" }
      })
      imgUrl.push(`https://drive.google.com/thumbnail?id=${fileId}`)
    } catch (err) {
      console.log(err)
    }
  }
  await new PostModel({
    sno: 1,
    imgPath: imgUrl,
    des: req.body.desInp,
    active: true,
    category: ""
  }).save()
  fsExtra.emptyDir(path.join(__dirname, "/../temp_uploads/"))
  res.json({ imgUrl: imgUrl })
})


module.exports = router