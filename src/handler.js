const { nanoid } = require('nanoid'); // Import fungsi nanoid dari modul nanoid
const notes = require('./notes'); // Import modul notes

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload; // Mendapatkan data payload dari request

    const id = nanoid(16); // Membuat id baru menggunakan fungsi nanoid dengan panjang 16 karakter
    const createdAt = new Date().toISOString(); // Mendapatkan waktu saat ini dan mengonversinya ke dalam format ISO string
    const updatedAt = createdAt; // Menggunakan waktu pembuatan sebagai waktu pembaruan

    const newNote = { // Membuat objek catatan baru
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt,
    };
    notes.push(newNote); // Menambahkan catatan baru ke dalam array catatan

    const isSuccess = notes.filter((note) => note.id === id).length > 0; // Mengecek apakah catatan berhasil ditambahkan dengan mencari id yang sesuai

    if (isSuccess) { // Jika catatan berhasil ditambahkan
        const response = h.response({
            error: false,
            message: 'Catatan berhasil ditambahkan'
        });

        response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
        response.code(201); // Mengatur kode status HTTP 201 Created
        return response; // Mengembalikan respons
    }

    const response = h.response({
        error: false,
        message: 'Catatan gagal ditambahkan'
    });
    response.header('Access-Control-Allow-Origin', '*');
    response.code(500); // Mengatur kode status HTTP 500 Internal Server Error
    return response; // Mengembalikan respons
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.find((n) => n.id === id);

    if (note) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menghapus catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};