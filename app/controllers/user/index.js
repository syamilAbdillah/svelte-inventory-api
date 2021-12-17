const router = require('express').Router()
const bcrypt = require('bcrypt')
const multer = require('multer')
const userModel = require('../../models').user
const getUsersFactory = require('./getUsers')
const createUserFactory = require('./createUser')
const getUserByIdFactory = require('./getUserById')
const updateUserFactory = require('./updateUser')
const deleteUserFactory = require('./deleteUser')
const uploadProfileFactory = require('./uploadProfile')


const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'uploads/'),
	filename: (req, file, cb) => {
		const arrName = file.originalname.split('.')
		const ext = arrName[arrName.length - 1]
		cb(null, req.user.id + '.' + ext)
	}
})

const fileFilter = function(req, file, cb){
	const _1MB =  1024 * 1024
	const validMimetypes = ['image/jpeg', 'image/png']
	if(file.filesize > _1MB || !validMimetypes.includes(file.mimetype)){
		cb(null, false)
	}else {
		cb(null, true)
	}
}

const upload = multer({storage, fileFilter})

router.get('/', getUsersFactory(userModel))
router.get('/:id', getUserByIdFactory(userModel))
router.post('/', createUserFactory(userModel, bcrypt))
router.post('/upload', upload.single('profile'), uploadProfileFactory(userModel))
router.put('/:id', updateUserFactory(userModel))
router.delete('/:id', deleteUserFactory(userModel))

module.exports = router