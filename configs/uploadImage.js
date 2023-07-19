const cloudinary = require('cloudinary');

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            image,
            { public_id: process.env.CLOUDINARY_KEY  },
            function (error, result) {
                if (result && result.secure_url)
                    return resolve(result.secure_url);
                return reject(error);
            }
        );
    });
};



module.exports= uploadImage;