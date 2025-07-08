import { Request, Response } from 'express'
import PressRelease from '../pressreleaseModel'
import { sendResponse } from '../../../../helpers/responsehandler'

// Extend Multer file type for S3
interface S3File extends Express.Multer.File {
  location?: string
}

//Create a Blog
//g In your route file (not shown here), make sure to use multer's() .single('image') middleware for this controller:
// Example: router.post('/pressrelease', upload.single('image'), createPressRelease);

export const createPressRelease = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, tags, content, category, isFeaturedArticle } = req.body

    console.log('req', req.body)

    if (!title || !content) {
      return sendResponse(res, 400, false, 'Title and Content Required')
    }

    // Use S3 image URL if uploaded, else fallback to body
    let file: S3File | undefined = undefined
    let image: string | undefined = undefined

    if (req.file) {
      file = req.file as S3File
      image = file.location
    } else if (image) {
      image = image
    }

    console.log('featured image', file, image)

    const newPost = new PressRelease({
      title,
      tags,
      content,
      category,
      isFeaturedArticle,
      image,
    })

    const savedPost = await newPost.save()
    return sendResponse(res, 200, true, 'Post saved successfully', savedPost)
  } catch (error) {
    console.error('Error creating blog post:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

//Get All the Blogs

export const getAllPressReleases = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const posts = await PressRelease.find().sort({ createdAt: -1 })
    return sendResponse(res, 200, true, 'All blog posts fetched', posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

//Get Particular Blog

export const getPressReleaseById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params
    const post = await PressRelease.findById(id)
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Blog post not found' })
    }
    return sendResponse(res, 200, true, 'Blog post fetched', post)
  } catch (error) {
    console.error('Error fetching blog post by ID:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

//Update Blog

export const updatePressRelease = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Use S3 image URL if uploaded, else fallback to body
    const file = req.file as S3File | undefined
    if (file?.location) {
      updateData.featuredImage = file.location
    }

    // Handle document uploads (multiple files)
    const files = req.files as
      | { [fieldname: string]: S3File[] }
      | S3File[]
      | undefined
    let documentUrls: string[] = []
    if (Array.isArray(files)) {
      documentUrls = files.map((f) => f.location || f.filename)
    } else if (files && files['documents']) {
      documentUrls = files['documents'].map((f) => f.location || f.filename)
    }
    if (documentUrls.length > 0) {
      updateData.documents = documentUrls
    }

    const updatedPost = await PressRelease.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: 'Blog post not found' })
    }

    return sendResponse(
      res,
      200,
      true,
      'Blog post updated successfully',
      updatedPost
    )
  } catch (error) {
    console.error('Error updating blog post:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

//Delete Blog

export const deletePressRelease = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params

    const deletedPost = await PressRelease.findByIdAndDelete(id)

    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: 'Blog post not found' })
    }

    return sendResponse(
      res,
      200,
      true,
      'Blog post deleted successfully',
      deletedPost
    )
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
