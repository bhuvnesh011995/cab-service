const serverConfig = require("./config/server.config") 

    require("./app").listen(serverConfig.PORT,()=>{
      console.log(`server started at port ${serverConfig.PORT}`)
    })

