import 'babel-polyfill'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import hbs from 'express-handlebars'

/* Configs */
import appConfig from './configs/app'

/* Routes */
import moduleRoutes from './modules'

/* DB */
import db from './db'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))


/* Template */
app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')

/* Register Routes */
moduleRoutes.forEach(({ url, apiRoutes = [], webRoutes = [] }) => {
  const { apiUrl } = appConfig

  apiRoutes.forEach(route => app.use(apiUrl + url, route))
  webRoutes.forEach(route => app.use(url, route))
})

app.listen(appConfig.port, function() {
  db.connect()
  console.log(`App listening on port ${appConfig.port}`)
})
