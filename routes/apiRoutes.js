let notesData = require("../db/db.json");
// const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// var notes = [];
//ask about this function and about map method
function addId(note) {
    // notes.map(note => {
    note.id = uuidv4();
    return note;
  // });
};

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

  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    // addId(newNote);
    notesData.push(addId(newNote));
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(notesData),
      "utf-8",
      function (err) {
        if (err) {
          throw err;
        }
        console.log(notesData);
      }
    );
    res.json(notesData);
  });
//walk through delete
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
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(notes),
          "utf-8",
          function (err) {
            if (err) {
              throw err
            };
          }
        );
        res.json(notes);
      }
    });
  });
};
