/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import vine from '@vinejs/vine'
router.on('/').renderInertia('home')

router.post('/upload', async ({ request, response }) => {
  console.log(request.all())
  const data = await request.validateUsing(
    vine.compile(
      vine.object({
        images: vine.array(vine.object({ file: vine.file({ size: '2mb' }), title: vine.string() })),
      })
    )
  )
  return response.json(data)
})
