const express = require("express")
const Compute = require("@google-cloud/compute")

const compute = new Compute({
    projectId: 'project-1-82082',
    keyFilename: './keyFile.json'
})

const config = {
    os: 'ubuntu',
    http: true,
    https: true,
    machineType: 'n1-standard-1',
    tags: [
        'api'
    ]
}

let vmNames = []

const zone = compute.zone("us-east1-b")

const app = express()

/*
var createLink = "CreateVM";
var result = str.link("http://35.196.147.105:8080/create/:name");
*/


app.get("/healthcheck", (req, res) => {
    res.send("Hey, I'm alive!")
})


app.get('/', (req, res) => {
    res.send("You can create, list, and delete virtual machine instances with this API<br><br>Go to:<br><br>http://[IP_address]:8080/create/:name to create a new VM <br><br>http://[IP_address]:8080/list to list newly created VMs <br><br> http://[IP_address]:8080/delete/:name to delete VM")

})

app.get('/create/:name', (req, res) => {
    const name = req.params.name;
    zone.createVM(name, config)
        .then((data) => {
            console.log(data);
            return zone.vm(name).getMetadata()
        })
        .then((info) => {
            vmNames.push(name);
            console.log(vmNames);
            console.log(`New Virtual Machine Created: ${name}`);
            // res.send(`You just created ${vmNames}`)
        })
        .catch((err) => {
            console.error(err)
                // res.send(err)
        })

    res.send(`You just created a new virtual machine: ${name}`)
})


app.get("/list", (req, res) => {
    console.log(`The newly created instances are: ${vmNames}`)
    res.send(`Newly created virtual machines are:  ${vmNames}`)
})


app.delete('/delete/:name', async(req, res) => {
    const name = req.params.name;
    const theVm = zone.vm(name);
    await theVm.delete();
    const ind = vmNames.indexOf(name);
    vmNames.splice(ind, 1);
    console.log(`${name} has been deleted`);
    res.send(`${name} has been deleted`)
})


var api = app.listen(8080, () => {
        console.log('the API server is running on', api.address().port)
})
