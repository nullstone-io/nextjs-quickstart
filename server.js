const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const hostname = 'localhost'
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

module.exports = {
    startServer: async function startServer() {
        return app.prepare().then(() => {
            createServer((req, res) => {
                try {
                    const parsedUrl = parse(req.url, true)
                    handle(req, res, parsedUrl)
                } catch (err) {
                    console.error('Error occurred handling', req.url, err)
                    res.statusCode = 500
                    res.end('internal server error')
                }
            }).listen(port, (err) => {
                if (err) throw err
                console.log(`> Ready on http://${hostname}:${port}`)
            })
        })
    },
}
