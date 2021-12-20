const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        notes.push({ 
            title,
            body
        })
    
        saveNotes(notes)
        console.log(chalk.black.bgGreen("New note added!"))
    } else {
        console.log(chalk.black.bgRed("Note title taken!"))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const keepNotes = notes.filter((note) => {
        return note.title !== title
    })
    
    if (notes.length > keepNotes.length) {
        console.log(chalk.black.bgGreen("Note deleted"))
        saveNotes(keepNotes)
    } else {
        console.log(chalk.black.bgRed("No matching notes found"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length > 0) {
        console.log(chalk.black.bgWhite("Your Notes:"))
        notes.forEach(note => {
            console.log(chalk.black.bgBlue("Title: " + note.title, "Body: " + note.body))
        });
    } else {
        console.log(chalk.black.bgWhite("No notes found"))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}