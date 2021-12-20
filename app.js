const chalk = require('chalk');
const yargs = require('yargs');
const {addNote, removeNote, listNotes, readNote} = require('./notes')

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
    }
})
yargs.command({
    command: "list",
    describe: "list notes",
    handler: () => {
        listNotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        readNote(argv.title)
    }
})

yargs.parse()