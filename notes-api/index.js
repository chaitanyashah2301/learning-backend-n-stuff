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
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const notes = await prisma.note.findMany({
        where: search ? {title:{contains: search,mode:"insensitive"}}:{},orderBy:{id:"asc"},
    });
    res.json(notes);

});

//fetch/read one 
app.get("/notes/:id",async (req,res)=>{
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({error:"Invalid id"});

    const note = await prisma.note.findUnique({where:{id}});
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

    const note = await prisma.note.create({
        data:{title,content:content ?? ""},
    });
    res.status(201).json(note);
});

//update

app.put("/notes/:id",async (req,res)=>{
    const id = Number(req.params.id);
    const {title,content}= req.body;

    try {
        const note = await prisma.note.update({
            where:{id},
            data: {title,content},
        });
        res.json(note);
    } catch (err) {
        if (err.code ==="P2025") {
            return res.status(404).json({error:"Note not found"});
        }
        throw err;
    }
});


//delete

app.delete("/notes/:id",async (req,res)=>{
    const id =Number(req.params.id);
    try {
        await prisma.note.delete({where:{id}});
    } catch (err) {
         if (err.code === "P2025") return res.status(404).json({ error: "Note not found" });
    throw err;
    }
});


//fallback condition

app.use("/notes",async (req,res)=>{
    res.status(404).json({error:"Route not found"});
});

//search(scraped)

// app.get("/notes",async (req,res)=>{
//     const {search} = req.query;
//     if(!search) return res.json(notes);

//     const results= notes.filter(n=>n.title.toLowerCase().includes(search.toLowerCase()));
//     res.join(results);
// });


app.listen(5000, () => console.log("Server running on http://localhost:5000"))