import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

/* Configs */

import appConfig from './configs/app'

/* Routes */
import moduleRoutes from './modules'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

/* Register Routes */
moduleRoutes.forEach(ctrl => {
  const url = [appConfig.apiUrl, ctrl.url].join('')

  ctrl.routes.forEach(route => {
    app.use(url, route)
  })
})

app.listen(appConfig.port, function() {
  console.log(`App listening on port ${appConfig.port}`)
})
