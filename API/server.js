import { prisma } from "./prisma_init.js"
import  express, { json }  from 'express';
import cors from 'cors'
const app = express();
import bodyParser from 'body-parser';
const port = 3080;


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())






var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));


// Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,accept,origin');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.get('/students', async (req,res) =>
{
    const ret=await prisma.studentsdb.findMany();
    res.json(ret);
})



// app.get("/api/students", async (req,res) => {
//     const { Id: IdStr } = req.params;
//     const Id = Number(IdStr) || 0;
//     const ret = await prisma.student.findMany({
//         where:{
//             id:Id
//         }
//     });
//     if (!ret) return res.status(404).message("Not found");
//     res.send( ret);
// })

app.get('/students/:id', async (req, res)=>
{
    let Idstr = req.params.id
    console.log(typeof(Idstr))
    let Id=Number(Idstr)
    //console.log(Idstr, "   ", Id)
    const ret=await prisma.studentsdb.findMany({
        where:{
            id: Id
        }
    });
    console.log(ret); 
    res.send(ret);
})

app.get('/students/:fname/:lname', async (req, res)=>
{
    const {fname: fName, lname: lName} = req.params
    console.log(fName, lName)
    const ret = await prisma.studentsdb.findMany({
        where:{
            fname: fName,
            lname: lName
        }
    })
    console.log(ret.body)
    res.send(ret)
})

app.delete('/students/:id', async (req,res)=>
{
    const Idstr=req.params.id
    let Id=Number(Idstr)

    const ret = await prisma.studentsdb.delete({
        where:{
            id: Id
        }
    })
    res.send("Student Deleted!")
})

app.put('/students/:id',async (req, res)=>
{   
    let Idstr = req.params.id
    let Id=Number(Idstr)

    const { fname: fName, lname: lName,  username: Username, password: Password, email: Email} = req.body

    const oret = await prisma.studentsdb.findUnique({
        where:{
            id: Id
        },
        select:{
            fname: true,
            lname: true,
            username: true,
            email: true,
            password: true
        }
    })
    const { fname: ofName, lname: olName,  username: oUsername, password: oPassword, email: oEmail} = oret
    //console.log(ofName)
    
    const ret= await prisma.studentsdb.update({
        where: {
            id: Id
        },
        data: {
            username: Username || oUsername,
            password: Password || oPassword,
            email: Email || oEmail,
            fname: fName || ofName,
            lname: lName || olName
        }
    })
    res.send(ret)    
})


// app.post('/api/add-student', async (req, res) => {
//     let body = "";
//     req.on("data", (chunk) => {
//         body += chunk.toString();
//     });
//     req.on("end", async () => {
//         const {name, username, email, password} = qs.parse(body)
//         //console.log(req.body);
//         if(!name || !username || !email || !password){
//             return res.status(400).json({message: 'Bad request'})
//         }
//         await prisma.studentsdb.create({
//             data: {
//                 name,
//                 username,
//                 password,
//                 email
//             },
//          })
//          res.json('student Added')
//     })
// })

app.post('/add-student', async (req, res) => {



    const {fname, lname, username, email, password} = req.body

    console.log(req.body)

    if(!fname || !lname || !username || !email || !password){
        return res.status(400).json({message: 'Bad request'})
    }
    await prisma.studentsdb.create({
        data: {
            fname,
            lname,
            username,
            password,
            email
        },
    })
    res.json('student Added')
})


app.listen(port, () =>
{
    console.log("listening to port:", port);
}) 