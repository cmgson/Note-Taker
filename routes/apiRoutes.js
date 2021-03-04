//import the database
let notesData = require("../db/db.json");
//import fs
const fs = require("fs");
//import uuid creator
const { v4: uuidv4 } = require("uuid");
//function to add id to incoming note
function addId(note) {
  note.id = uuidv4();
  return note;
}
//get route retrieving the database notes and responding with them parsed
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  });
//post route takes in the new note from the request body
// gives the incoming note an id and pushes it to the database
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    notesData.push(addId(newNote));
    fs.writeFile(
      "./db/db.json",
      //stringify the notes data array for writing to the database
      JSON.stringify(notesData),
      "utf-8",
      function (err) {
        if (err) {
          throw err;
        }
        console.log(notesData);
      }
    );
    //respond with the notesData updated with addition of new note
    res.json(notesData);
  });
//delete route which takes in the id of note chosen for deletion
//reads the data base assigns it to newData, const chosen is variable assigned with
//the id of the note selected for deletion
//set notes equal to the array filtered to remove the data with chosen id and setting it to the notesData database import
  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const newData = JSON.parse(data);
        const chosen = req.params.id;
        console.log(data);
        notes = newData.filter((data) => data.id != chosen);
        notesData = notes;
        //writes the array to the database with the deletion
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(notes),
          "utf-8",
          function (err) {
            if (err) {
              throw err;
            }
          }
        );
        //returns updated notes to the user with the deletion subtracted
        res.json(notes);
      }
    });
  });
};
