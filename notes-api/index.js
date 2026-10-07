import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});


// let notes = [
//     {id: 1,title: "First note",content:"Hello world"},
// ];

// let nextId = 2; removed since now prisma will handle database rather than using this fake-local database




//read all
app.get("/notes", async(req ,res) => {
    const search = req.query;
    const notes = await prisma.note.findmany({
        where: search ? {title:{contains: search,mode:"insensitive"}}:{},orderBy:{id:"asc"},
    });
    res.json(notes);

});

//fetch
app.get("/notes/:id",async (req,res)=>{
    const id = Number(req.params.id);
    const note = notes.find(n=> n.id===id);
    if (!note) return res.status(404).json({error:"Note not found"});
    res.json(note);
});

//create
app.post("/notes",async (req,res)=>{
    const { title,content}=req.body;
    if(!title) return res.status(400).json({error:"Title is required"});

    if(title.length <3){
        return res.status(400).json({error:"Title must be atleast 3 characters long"})
    }

    const note = { id: nextId++,title,content:content ?? ""};
    notes.push(note);
    res.status(201).json(note);
});

//update

app.put("/notes/:id",async (req,res)=>{
    const id= Number(req.params.id);
    const note = notes.find(n=>n.id===id);
    if(!note) return res.status(404).json({error:"Note not found"});

    const {title,content} = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    res.json(note);
});


//delete

app.delete("/notes/:id",async (req,res)=>{
    const id =Number(req.params.id);
    const exists = notes.some(n=>n.id===id);
    if(!exists) return res.status(404).json({error:"Note not found"});

    notes = notes.filter(n=>n.id!==id);
    res.status(204).send();
});


//fallback condition

app.use("/notes",async (req,res)=>{
    res.status(404).json({error:"Route not found"});
});

//search

app.get("/notes",async (req,res)=>{
    const {search} = req.query;
    if(!search) return res.json(notes);

    const results= notes.filter(n=>n.title.toLowerCase().includes(search.toLowerCase()));
    res.join(results);
});


app.listen(5000, () => console.log("Server running on http://localhost:5000"))