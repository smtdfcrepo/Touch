const list_router = {
  "/rest":require("./rest.js")
}

module.exports.initRouters = function(app,router_data={}){
  console.log("Touch : initialize router ...")
  Object.keys(list_router).forEach((router)=>{
    app.use(router,list_router[router].getRouter(router_data[router]))
  })
}

