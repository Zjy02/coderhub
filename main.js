const { SERVER_PORT } = require('./src/config/server')
const app = require('./src/app/index')
require('./src/utils/handle-error')

app.listen(SERVER_PORT, () => {
    console.log(`coderhub服务器启动 http://localhost:${SERVER_PORT}`);
})