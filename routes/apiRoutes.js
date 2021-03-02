const notesData = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const notes = [];

function addId() {
  const noteId = notes.map(newId => {
    newId.id = uuidv4();
    return newId;
  });
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
    notes.push(newNote);
    addId();

    fs.writeFile(
      "./db/db.json",
      JSON.stringify(notes),
      "utf-8",
      function (err) {
        if (err) {
          throw err;
        }
        console.log(notes);
      }
    );
    res.json(notes);
  });

  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const newData = JSON.parse(data);
        const chosen = req.params.id;
        console.log(data);
        const remainingNotes = newData.filter((data) => data.id != chosen);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(remainingNotes),
          "utf-8",
          function (err) {
            if (err) {
              throw err
            };
          }
        );
        res.json(remainingNotes);
      }
    });
  });
};
