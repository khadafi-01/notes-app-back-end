const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
} = require('./handler'); //  Mendeklarasikan variabel-variabel untuk menangani berbagai jenis permintaan


// Mendefinisikan rute-rute API dengan metode yang sesuai, serta menetapkan fungsi handler untuk masing-masing rute
const routes = [{
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,

    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }

];
// Mengekspor array rute agar dapat diimpor dan digunakan oleh modul lain dalam aplikasi
module.exports = routes;