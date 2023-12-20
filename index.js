const express = require("express")
const app = express()

app.use(express.static("public"))

app.use('/js', express.static(__dirname + '/public/js'));
app.use("/css", express.static(__dirname + "/public/css"))

app.listen(8081, function() {
    console.log("Szerver elindult")
})